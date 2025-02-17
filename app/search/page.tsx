"use client";
import useSearch from "@/hooks/useSearch";
import { SearchCategory } from "@/types/search-leads.types";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ArticlesResultsTable } from "./components/ArticlesResultsTable";
import { CompaniesResultsTable } from "./components/CompaniesResultsTable";
import { PeopleResultsTable } from "./components/PeopleResultsTable";
import ResearchResultsTable from "./components/ResearchResults/ResearchResults";
const SearchPage = () => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const category = searchParams.get("category");
  const query = searchParams.get("q");
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

  if (category === SearchCategory.COMPANY) {
    return <CompaniesResultsTable results={statusData?.result?.data || []} />;
  }

  if (category === SearchCategory.PEOPLE) {
    return <PeopleResultsTable results={statusData?.result?.data || []} />;
  }

  if (category === SearchCategory.ARTICLES) {
    return <ArticlesResultsTable results={statusData?.result?.data || []} />;
  }

  if (category === SearchCategory.RESEARCH) {
    return <ResearchResultsTable query={query || ""} />;
  }

  return <CompaniesResultsTable results={statusData?.result?.data || []} />;
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
