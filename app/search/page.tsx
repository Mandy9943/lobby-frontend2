"use client";
import useSearch from "@/hooks/useSearch";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ResultsTable } from "../(Home)/components/ResultsTable";
const SearchPage = () => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const { statusData } = useSearch(jobId || "");

  if (statusData?.status === "pending") {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mb-4"
        />
        <p className="text-muted-foreground">Searching for leads...</p>
      </div>
    );
  }
  return <ResultsTable results={statusData?.result?.data || []} />;
};

const page = () => {
  return (
    <div>
      <Suspense>
        <SearchPage />
      </Suspense>
    </div>
  );
};

export default page;
