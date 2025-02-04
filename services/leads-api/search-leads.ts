import {
  SearchCategory,
  SearchJobResponse,
  SearchLeadsResponse,
} from "@/types/search-leads.types";
import leadsApi from ".";

export const searchLeads = async (query: string) => {
  const res = await leadsApi.post<SearchLeadsResponse>(`/search-leads`, {
    query,
  });
  return res.data;
};

export const createSearchLeadsJob = async (
  query: string,
  page: number = 1,
  category: SearchCategory = SearchCategory.COMPANY,
  results: number = 5
) => {
  const res = await leadsApi.post<{ jobId: string }>(`/search-jobs`, {
    query,
    page,
    category,
    results,
  });
  return res.data;
};

export const getSearchJobStatus = async (jobId: string) => {
  const res = await leadsApi.get<{
    status: "pending" | "done" | "failed";
    result?: SearchLeadsResponse;
  }>(`/search-jobs/status/${jobId}`);
  return res.data;
};

export const getPreviousSearchLeads = async () => {
  const res = await leadsApi.get<
    {
      id: string;
      query: string;
      category: SearchCategory;
      resultsCount: number;
      emailCount: number;
      phoneCount: number;
      date: Date;
    }[]
  >(`/search-jobs/previous`);
  return res.data;
};

export const getPreviousSearchLeadsById = async (id: string) => {
  const res = await leadsApi.get<SearchJobResponse>(
    `/search-jobs/previous/${id}`
  );
  return res.data;
};
