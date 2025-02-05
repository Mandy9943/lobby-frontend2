import {
  createSearchLeadsJob,
  getSearchJobStatus,
} from "@/services/leads-api/search-leads";
import { CATEGORY_MAPPING, ScrapeResult } from "@/types/search-leads.types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { useToast } from "./use-toast";
import { useAuth } from "./useAuth";

const useSearch = () => {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const localStorageKey = user ? `searchJob_${user.email}` : null;
  const [numResults, setNumResults] = useState<number>(5);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "Companies"
  );
  console.log(CATEGORY_MAPPING);

  console.log(selectedCategory);

  const [searchQuery, setSearchQuery] = useState("");
  const [jobId, setJobId] = useState<string | null>(null);
  const [searchStatus, setSearchStatus] = useState<
    "idle" | "pending" | "done" | "failed"
  >("idle");

  const [results, setResults] = useState<ScrapeResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const originalResults = useRef<ScrapeResult[]>([]);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  // Add this new state to track if there's more data available
  const [hasMoreData, setHasMoreData] = useState(true);

  // Add a new piece of state for loadMoreJobId
  const [loadMoreJobId, setLoadMoreJobId] = useState<string | null>(null);

  const { toast } = useToast();

  // Load saved job state on mount
  useEffect(() => {
    if (!localStorageKey) return;

    const savedState = localStorage.getItem(localStorageKey);

    if (savedState) {
      try {
        const {
          jobId: savedJobId,
          query,
          results: savedResults,
          page: savedPage,
        } = JSON.parse(savedState);
        setJobId(savedJobId);
        setSearchQuery(query);

        if (savedResults) {
          setResults(savedResults);
          originalResults.current = savedResults;
          setSearchStatus("done");
        } else {
          setSearchStatus("pending");
        }

        if (savedPage) {
          setPage(savedPage);
        }
      } catch (err) {
        console.error("Error parsing saved job state:", err);
      }
    }
  }, [localStorageKey]);

  // On mount, restore loadMoreJobId from localStorage if it exists
  useEffect(() => {
    if (!localStorageKey) return;

    const savedLoadMoreJobId = localStorage.getItem(
      `${localStorageKey}_loadMoreJobId`
    );
    if (savedLoadMoreJobId) {
      setLoadMoreJobId(savedLoadMoreJobId);
      setLoadingMore(true); // We assume it's still in progress
    }
  }, [localStorageKey]);

  // SWR-based re-validation/polling for job status
  const { data: statusData, error: statusError } = useSWR(
    jobId && searchStatus !== "done" && searchStatus !== "failed"
      ? `/api/search-jobs/${jobId}/status`
      : null,
    () => getSearchJobStatus(jobId!),
    {
      refreshInterval: 3000, // Poll every 3 seconds
    }
  );

  // Create a new SWR for loadMoreJobId, separate from your main job's SWR
  const { data: loadMoreStatus, error: loadMoreError } = useSWR(
    loadMoreJobId ? `/api/search-jobs/${loadMoreJobId}/status` : null,
    () => getSearchJobStatus(loadMoreJobId!),
    {
      refreshInterval: 3000,
    }
  );

  // Add this new effect to handle URL parameters
  useEffect(() => {
    const queryParam = searchParams.get("query");
    const resultsParam = searchParams.get("results");

    if (queryParam && resultsParam) {
      setSearchQuery(queryParam);
      setJobId(resultsParam);
      setSearchStatus("pending");

      // Clear URL parameters without refreshing the page
      window.history.replaceState({}, "", "/");
    }
  }, [searchParams]);

  // Modify the existing statusData effect to handle both new searches and loaded previous results
  useEffect(() => {
    if (!statusData) return;
    if (statusData.status === "done") {
      setSearchStatus("done");
      const results = statusData.result?.data || [];
      setResults(results);
      originalResults.current = results;

      // Show toast if no results found
      if (results.length === 0) {
        toast({
          title: "No leads found",
          description:
            "We couldn't find any leads matching your search criteria. Try adjusting your search terms.",
          variant: "destructive",
        });
      }

      // Only save to localStorage if this is a new search (not viewing previous results)
      if (localStorageKey && !searchParams.get("results")) {
        localStorage.setItem(
          localStorageKey,
          JSON.stringify({
            jobId,
            query: searchQuery,
            results: statusData.result?.data,
            page: 1,
          })
        );
      }

      if (statusData.result?.successfulCrawls === 0) {
        setHasMoreData(false);
      }
    } else if (statusData.status === "failed") {
      setSearchStatus("failed");
      setError(statusData.result?.message || "Search failed");
      if (localStorageKey && !searchParams.get("results")) {
        localStorage.removeItem(localStorageKey);
      }
    }
  }, [statusData, localStorageKey, jobId, searchQuery, searchParams, toast]);

  // Handle case where the fetch itself failed (statusError)
  useEffect(() => {
    if (statusError) {
      setSearchStatus("failed");
      setError("Failed to check search status");
    }
  }, [statusError]);

  // When loadMoreStatus changes to "done", we append new data to results, increment page, and clear loadMoreJobId from storage
  useEffect(() => {
    if (!loadMoreStatus) return;
    if (loadMoreStatus.status === "done") {
      // If no successful crawls, mark hasMoreData = false
      if (loadMoreStatus.result?.successfulCrawls === 0) {
        setHasMoreData(false);
        setError("No more results available");
      }

      // Filter out duplicates:
      const incomingResults = loadMoreStatus.result?.data ?? [];
      const uniqueNewResults = incomingResults.filter(
        (newResult: ScrapeResult) =>
          !results.some(
            (existingResult) => existingResult.domain === newResult.domain
          )
      );

      if (uniqueNewResults.length > 0) {
        const updatedResults = [...results, ...uniqueNewResults];
        setResults(updatedResults);
        const newPage = page + 1;
        setPage(newPage);

        // Save updated results to localStorage
        if (localStorageKey) {
          localStorage.setItem(
            localStorageKey,
            JSON.stringify({
              jobId,
              query: searchQuery,
              results: updatedResults,
              page: newPage,
            })
          );
        }
      } else {
        toast({
          title: "No more results",
          description: "We couldn't find any additional leads.",
          variant: "destructive",
        });
        setError("No more unique results found");
        setHasMoreData(false);
      }

      // Clear the loadMoreJobId and stop loading
      setLoadMoreJobId(null);
      localStorage.removeItem(`${localStorageKey}_loadMoreJobId`);
      setLoadingMore(false);
    } else if (loadMoreStatus.status === "failed") {
      setError(loadMoreStatus.result?.message || "Load more job failed");
      setLoadMoreJobId(null);
      localStorage.removeItem(`${localStorageKey}_loadMoreJobId`);
      setLoadingMore(false);
    }
  }, [
    loadMoreStatus,
    loadMoreError,
    localStorageKey,
    results,
    page,
    hasMoreData,
    jobId,
    searchQuery,
    toast,
  ]);

  // Optionally, handle loadMoreError if you want in a parallel effect
  useEffect(() => {
    if (loadMoreError) {
      setError("Failed to check 'Load More' job status");
      setLoadingMore(false);
      setLoadMoreJobId(null);
      localStorage.removeItem(`${localStorageKey}_loadMoreJobId`);
    }
  }, [loadMoreError, localStorageKey]);

  useEffect(() => {
    if (user) {
      setNumResults(10);
    }
  }, [user]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchStatus("pending");
    setError(null);
    setPage(1);
    const searchCategoryEnum =
      CATEGORY_MAPPING[selectedCategory as keyof typeof CATEGORY_MAPPING];
    try {
      const { jobId: newJobId } = await createSearchLeadsJob(
        searchQuery,
        1,
        searchCategoryEnum,
        numResults
      );
      setJobId(newJobId);

      // Save job info to localStorage
      if (localStorageKey) {
        localStorage.setItem(
          localStorageKey,
          JSON.stringify({
            jobId: newJobId,
            query: searchQuery,
          })
        );
      }
    } catch (err) {
      console.error("Error starting search:", err);
      setSearchStatus("failed");
      setError("Failed to start search");
    }
  };

  const handleNewSearch = () => {
    setSearchStatus("idle");
    setSearchQuery("");
    setJobId(null);
    setResults([]);
    setError(null);
    if (localStorageKey) {
      localStorage.removeItem(localStorageKey);
    }
  };

  // Allows removing a single row by its domain
  const handleDeleteRow = (domain: string) => {
    setResults((prevResults) => prevResults.filter((r) => r.domain !== domain));
  };

  // Restores all data from the original searchResponse
  const handleRestoreAll = () => {
    console.log("handleRestoreAll", statusData);

    if (originalResults.current) {
      setResults(originalResults.current);
    }
  };

  // Simplify handleLoadMore: just create a new job, store its ID, and rely on the SWR we created above to poll
  const handleLoadMore = async () => {
    setLoadingMore(true);
    setError(null);

    try {
      const newPage = page + 1;
      const { jobId: newJobId } = await createSearchLeadsJob(
        searchQuery,
        newPage
      );

      // Save the new job ID in state and localStorage so we can resume it later
      setLoadMoreJobId(newJobId);
      if (localStorageKey) {
        localStorage.setItem(`${localStorageKey}_loadMoreJobId`, newJobId);
      }
    } catch (err) {
      console.error("Error loading more results:", err);
      setError("Failed to load more results");
      setLoadingMore(false);
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    jobId,
    setJobId,
    searchStatus,
    setSearchStatus,
    results,
    setResults,
    error,
    setError,
    originalResults,
    page,
    setPage,
    loadingMore,
    setLoadingMore,
    hasMoreData,
    setHasMoreData,
    numResults,
    setNumResults,
    selectedCategory,
    setSelectedCategory,
    loadMoreJobId,
    setLoadMoreJobId,
    handleSearch,
    handleNewSearch,
    handleDeleteRow,
    handleRestoreAll,
    handleLoadMore,
  };
};

export default useSearch;
