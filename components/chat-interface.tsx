"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { createSearchLeadsJob } from "@/services/leads-api/search-leads";
import { CATEGORY_MAPPING } from "@/types/search-leads.types";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  FileText,
  GraduationCap,
  Paperclip,
  Sparkles,
  Users2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MAX_UNAUTH_RESULTS = 5;
const MAX_AUTH_RESULTS = 10;

export default function ChatInterface() {
  const [isPro, setIsPro] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "Companies"
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [numResults, setNumResults] = useState(5);

  const [searchStatus, setSearchStatus] = useState<
    "idle" | "pending" | "done" | "failed"
  >("idle");

  useEffect(() => {
    console.log("useEffect user");

    if (user) {
      setNumResults(10);
    }
  }, [user]);

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchStatus("pending");
    const searchCategoryEnum =
      CATEGORY_MAPPING[selectedCategory as keyof typeof CATEGORY_MAPPING];
    try {
      const { jobId } = await createSearchLeadsJob(
        searchQuery,
        1,
        searchCategoryEnum,
        numResults
      );
      setSearchStatus("done");
      router.push(`/search?q=${searchQuery}&jobId=${jobId}`);
    } catch (err) {
      console.error("Error starting search:", err);
      setSearchStatus("failed");
    }
  };

  return (
    <>
      <div className="w-full max-w-3xl mx-auto space-y-8">
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-primary dark:text-slate-100 drop-shadow-lg"
        >
          What are you looking for?
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="flex justify-center gap-2 max-w-full overflow-x-auto py-2">
            {["Companies", "People", "Articles", "Research", "Other"].map(
              (category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCategory(category)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 ${
                      selectedCategory === category
                        ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600 hover:border-blue-600"
                        : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:border-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-600 dark:hover:border-slate-500"
                    }`}
                  >
                    {category === "Companies" && (
                      <Building2 className="h-4 w-4" />
                    )}
                    {category === "People" && <Users2 className="h-4 w-4" />}
                    {category === "Articles" && (
                      <FileText className="h-4 w-4" />
                    )}
                    {category === "Research" && (
                      <GraduationCap className="h-4 w-4" />
                    )}
                    {category === "Other" && <Sparkles className="h-4 w-4" />}
                    {category}
                  </Button>
                </motion.div>
              )
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="relative group"
        >
          <div className="relative bg-white/90 dark:bg-slate-900 backdrop-blur-sm rounded-lg border border-white/20 dark:border-slate-800/50 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.5)] p-2">
            <div className="absolute bottom-7 right-16 flex items-center gap-4">
              <AnimatePresence>
                {selectedCategory !== "Research" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 pr-4 border-r border-slate-200 dark:border-slate-700"
                  >
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      Results
                    </span>
                    <Input
                      type="number"
                      value={numResults}
                      onChange={(e) => {
                        const newValue = Number(e.target.value);
                        if (!user && newValue > MAX_UNAUTH_RESULTS) {
                          toast({
                            title: "Limit Reached",
                            description:
                              "Please login to search for more than 5 results",
                            variant: "destructive",
                          });
                          setNumResults(MAX_UNAUTH_RESULTS);
                        } else {
                          setNumResults(newValue);
                        }
                      }}
                      className="w-16 h-7 text-sm bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full text-center focus:ring-1 ring-blue-500"
                      min={1}
                      max={user ? MAX_AUTH_RESULTS : MAX_UNAUTH_RESULTS}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <Switch
                checked={isPro}
                onCheckedChange={setIsPro}
                className={`relative w-11 h-6 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800 hover:scale-95 ${
                  isPro
                    ? "bg-blue-500 dark:bg-blue-600"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                <motion.span
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 700,
                    damping: 30,
                  }}
                  className={`${
                    isPro ? "translate-x-6 bg-white" : "translate-x-1 bg-white"
                  } inline-block w-4 h-4 transform rounded-full shadow-lg`}
                />
                <span className="sr-only">Enable Pro mode</span>
              </Switch>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Pro
              </span>
            </div>
            <form onSubmit={onSearch}>
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                placeholder={
                  selectedCategory === "Research"
                    ? "Research a topic or paste a website link"
                    : `Search for ${
                        selectedCategory?.toLowerCase() || "leads"
                      }...`
                }
                className="border-0 focus-visible:ring-0 focus:outline-none focus-visible:outline-none text-xl bg-transparent dark:text-slate-100 dark:placeholder:text-slate-400 px-6 py-8 pr-44 w-full"
              />
              <Button
                size="icon"
                type="submit"
                className="absolute bottom-7 right-6 rounded-full bg-primary hover:bg-primary/90 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-200 hover:scale-105 w-8 h-8 flex items-center justify-center"
                disabled={searchStatus === "pending"}
              >
                {searchStatus === "pending" ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="rounded-full h-4 w-4 border-2 border-white border-t-transparent"
                  />
                ) : (
                  <ArrowRight className="h-4 w-4 text-white" />
                )}
              </Button>
            </form>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex justify-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-all duration-300 transform hover:scale-105 border-2 border-primary/30 dark:border-blue-500/30 hover:border-primary dark:hover:border-blue-500 shadow-md hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-blue-500/20 rounded-full px-6 py-3 font-semibold"
          >
            <Paperclip className="h-5 w-5 mr-2" />
            <span className="relative">
              <span className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-blue-500/20 dark:to-purple-500/20 blur rounded-full"></span>
              <span className="relative">or Attach your own leads</span>
            </span>
          </Button>
        </motion.div>
      </div>
    </>
  );
}
