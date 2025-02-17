import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  SearchLeadsResponse,
  SearchPeopleResult,
} from "@/types/search-leads.types";
import { routesNames } from "@/utils/routes";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface ResultsTableProps {
  results: SearchLeadsResponse<SearchPeopleResult>["data"];
}

export function ArticlesResultsTable({ results }: ResultsTableProps) {
  const router = useRouter();
  console.log(results);

  // Remove sorting since we don't have email/phone fields anymore
  const onNewSearch = () => {
    router.push(routesNames.home);
  };

  return (
    <div className="flex-grow overflow-auto p-4 md:p-6 fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl text-center font-bold text-primary dark:text-slate-100"
        >
          {results.length
            ? `We found ${results.length} people`
            : "No results found"}
        </motion.h1>

        {results.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-6"
          >
            <p className="text-muted-foreground mb-4">
              Try refining your search.
            </p>
            <Button
              variant="outline"
              onClick={onNewSearch}
              className="border-2 border-primary/30 dark:border-blue-500/30 hover:border-primary dark:hover:border-blue-500 shadow-md hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-blue-500/20"
            >
              New Search
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg border border-white/20 dark:border-slate-800/50 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.3)] overflow-hidden"
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-slate-200 dark:border-slate-700">
                    <TableHead className="text-slate-600 dark:text-slate-300">
                      #
                    </TableHead>
                    <TableHead className="text-slate-600 dark:text-slate-300">
                      Author
                    </TableHead>
                    <TableHead className="text-slate-600 dark:text-slate-300">
                      Title
                    </TableHead>
                    <TableHead className="text-slate-600 dark:text-slate-300">
                      Content
                    </TableHead>
                    <TableHead className="text-slate-600 dark:text-slate-300">
                      URL
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result, index) => (
                    <ResultRow
                      key={result.url}
                      index={index + 1}
                      result={result}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

interface ResultRowProps {
  index: number;
  result: SearchPeopleResult;
}

function ResultRow({ index, result }: ResultRowProps) {
  return (
    <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
      <TableCell className="text-slate-600 dark:text-slate-300">
        {index}
      </TableCell>
      <TableCell className="max-w-[200px] text-slate-700 dark:text-slate-200">
        <div className="truncate font-medium" title={result.author}>
          {result.author}
        </div>
      </TableCell>
      <TableCell className="max-w-[300px]">
        <div className="truncate" title={result.title}>
          {result.title}
        </div>
      </TableCell>
      <TableCell className="max-w-[400px]">
        <div className="truncate" title={result.text}>
          {result.text}
        </div>
      </TableCell>
      <TableCell className="max-w-[200px]">
        <a
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline truncate block"
          title={result.url}
        >
          {result.url}
        </a>
      </TableCell>
    </TableRow>
  );
}
