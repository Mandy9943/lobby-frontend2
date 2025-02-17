import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { baseUrl } from "@/services/leads-api";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ResearchTopic = ({ query }: { query: string }) => {
  const [research, setResearch] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Track the last query to know when it changes.
  const lastQueryRef = useRef<string | null>(null);
  // Use a ref that persists across unmounts for the current fetch
  const fetchingRef = useRef(false);

  const fetchResearch = useCallback(async (currentQuery: string) => {
    // Prevent duplicate fetches if one is already in progress.
    if (fetchingRef.current) return;
    fetchingRef.current = true;

    try {
      const response = await fetch(
        `${baseUrl}/api/search-research/topic-research`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
          body: JSON.stringify({
            query: currentQuery,
            category: "RESEARCH",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch research");
      }

      const reader = response.body?.getReader();
      if (!reader) return;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split("\n");

        lines.forEach((line) => {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              const content =
                typeof data === "string"
                  ? data
                  : data.content || data.message || JSON.stringify(data);
              setResearch((prev) => prev + content);
            } catch (e) {
              console.error("Error parsing JSON:", e);
            }
          }
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    // Only reset and fetch if the query has changed.
    if (lastQueryRef.current !== query) {
      lastQueryRef.current = query;
      setResearch("");
      setLoading(true);
      setError(null);
      fetchResearch(query);
    }
  }, [query, fetchResearch]);

  if (error) {
    return (
      <Card className="mt-4 bg-destructive/10">
        <CardContent className="pt-6">
          <p className="text-destructive">Error: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mt-4 min-h-[200px] border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow duration-200">
        <CardHeader className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-600">
            Research Results for: {query}
          </h3>
        </CardHeader>
        <CardContent className="p-6">
          {loading && !research && (
            <div className="space-y-3">
              <Skeleton className="h-4 w-[80%]" />
              <Skeleton className="h-4 w-[70%]" />
              <Skeleton className="h-4 w-[85%]" />
              <Skeleton className="h-4 w-[75%]" />
            </div>
          )}

          {research && (
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ ...props }) => (
                    <p
                      className="mb-6 leading-relaxed text-slate-700 dark:text-slate-300"
                      {...props}
                    />
                  ),
                  h1: ({ ...props }) => (
                    <h1
                      className="text-3xl font-bold mb-4 text-slate-900 dark:text-slate-100"
                      {...props}
                    />
                  ),
                  h2: ({ ...props }) => (
                    <h2
                      className="text-2xl font-semibold mb-3 text-slate-800 dark:text-slate-200"
                      {...props}
                    />
                  ),
                  h3: ({ ...props }) => (
                    <h3
                      className="text-xl font-medium mb-2 text-slate-800 dark:text-slate-200"
                      {...props}
                    />
                  ),
                  a: ({ ...props }) => (
                    <a
                      className="text-primary hover:text-primary/80 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 underline decoration-2 underline-offset-2"
                      {...props}
                    />
                  ),
                  ul: ({ ...props }) => (
                    <ul
                      className="my-4 list-disc list-inside space-y-2"
                      {...props}
                    />
                  ),
                  ol: ({ ...props }) => (
                    <ol
                      className="my-4 list-decimal pl-4 space-y-2 marker:text-primary dark:marker:text-blue-400"
                      {...props}
                    />
                  ),
                  li: ({ ...props }) => (
                    <li
                      className="text-slate-700 dark:text-slate-300 pl-2"
                      {...props}
                    />
                  ),
                  blockquote: ({ ...props }) => (
                    <blockquote
                      className="border-l-4 border-primary dark:border-blue-500 pl-4 my-4 italic text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 py-2 rounded-r"
                      {...props}
                    />
                  ),
                  code: ({ ...props }) => (
                    <code
                      className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono text-primary dark:text-blue-400"
                      {...props}
                    />
                  ),
                  table: ({ ...props }) => (
                    <div className="overflow-x-auto my-6">
                      <table
                        className="min-w-full border border-slate-200 dark:border-slate-700 rounded-lg"
                        {...props}
                      />
                    </div>
                  ),
                  th: ({ ...props }) => (
                    <th
                      className="bg-slate-50 dark:bg-slate-800 px-4 py-2 border-b border-slate-200 dark:border-slate-700 font-semibold text-left"
                      {...props}
                    />
                  ),
                  td: ({ ...props }) => (
                    <td
                      className="px-4 py-2 border-b border-slate-200 dark:border-slate-700"
                      {...props}
                    />
                  ),
                }}
              >
                {research}
              </ReactMarkdown>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResearchTopic;
