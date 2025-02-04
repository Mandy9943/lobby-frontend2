"use client";

import { SearchHistoryCard } from "@/components/SearchHistoryCard";
import { getPreviousSearchLeads } from "@/services/leads-api/search-leads";
import useSWR from "swr";

export default function PreviousSearches() {
  const {
    data: previousSearches,
    error,
    isLoading,
  } = useSWR("/api/search-leads/previous", getPreviousSearchLeads);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-red-400 dark:text-red-500 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
              Error loading search history
            </h3>
          </div>
          <div className="mt-2 text-sm text-red-700 dark:text-red-300">
            Please try refreshing the page or contact support if the problem
            persists.
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Last 24 Hours
          </h1>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-slate-200 dark:bg-slate-700 rounded-lg p-6">
                  <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-slate-300 dark:bg-slate-600 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Last 24 Hours
        </h1>
        <div className="grid gap-4">
          {previousSearches?.map((search) => (
            <SearchHistoryCard
              key={search.id}
              query={search.query}
              category={search.category}
              resultsCount={search.resultsCount}
              emailsCount={search.emailCount}
              phoneCount={search.phoneCount}
              date={new Date(search.date).toLocaleTimeString()}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
