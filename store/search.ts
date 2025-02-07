import { create } from "zustand";

interface SearchState {
  searchStatus: "idle" | "pending" | "done" | "failed";
  jobId: string | null;
  setSearchStatus: (status: "idle" | "pending" | "done" | "failed") => void;
  setJobId: (jobId: string) => void;
}

export const useLeadSearch = create<SearchState>((set) => ({
  searchStatus: "idle",
  jobId: null,
  setSearchStatus: (status) => set({ searchStatus: status }),
  setJobId: (jobId) => set({ jobId }),
}));
