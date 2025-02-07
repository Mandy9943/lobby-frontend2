import { getSearchJobStatus } from "@/services/leads-api/search-leads";
import useSWR from "swr";

const useSearch = (jobId: string) => {
  // Add a new piece of state for loadMoreJobId

  // SWR-based re-validation/polling for job status
  const { data: statusData, error } = useSWR(
    jobId ? `/api/search-jobs/${jobId}/status` : null,
    () => getSearchJobStatus(jobId!),
    {
      refreshInterval: (data) => {
        if (data && (data.status === "done" || data.status === "failed")) {
          return 0; // Stop polling
        }
        return 5000; // Poll every 5 seconds otherwise
      },
    }
  );

  return {
    error,
    statusData,
  };
};

export default useSearch;
