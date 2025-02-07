import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchLeadsResponse } from "@/types/search-leads.types";
import { routesNames } from "@/utils/routes";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EmailTemplateDialog } from "./EmailTemplateDialog";
import { socialIcons } from "./socialIcons";

interface ResultsTableProps {
  results: SearchLeadsResponse["data"];
}

export function ResultsTable({ results }: ResultsTableProps) {
  const router = useRouter();

  // Sort results based on contact information priority
  const sortedResults = [...results].sort((a, b) => {
    const aHasEmail = a.email && a.email.length > 0;
    const bHasEmail = b.email && b.email.length > 0;
    const aHasPhone = a.phone && a.phone.length > 0;
    const bHasPhone = b.phone && b.phone.length > 0;

    if (aHasEmail && !bHasEmail) return -1;
    if (!aHasEmail && bHasEmail) return 1;
    if (aHasPhone && !bHasPhone) return -1;
    if (!aHasPhone && bHasPhone) return 1;
    return 0;
  });

  const onNewSearch = () => {
    router.push(routesNames.home);
  };
  console.log(results);

  return (
    <div className="flex-grow overflow-auto p-4 md:p-6 fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl text-center font-bold text-primary dark:text-slate-100"
        >
          {results.length
            ? `We found ${results.length} companies`
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
                      Name
                    </TableHead>
                    <TableHead className="text-slate-600 dark:text-slate-300">
                      URL
                    </TableHead>
                    <TableHead className="text-slate-600 dark:text-slate-300">
                      Description
                    </TableHead>
                    <TableHead className="text-slate-600 dark:text-slate-300">
                      Contact
                    </TableHead>
                    <TableHead className="text-slate-600 dark:text-slate-300">
                      Socials
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedResults.map((result, index) => (
                    <ResultRow
                      key={result.domain}
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
  result: SearchLeadsResponse["data"][0];
}

function ResultRow({ index, result }: ResultRowProps) {
  const [showEmailDialog, setShowEmailDialog] = useState(false);

  const socialLinks = Object.entries(result.social_links || {}).filter(
    ([, urls]) => urls && urls.length > 0
  );
  const hasSocials = socialLinks.length > 0;

  return (
    <>
      <TableRow className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
        <TableCell className="text-slate-600 dark:text-slate-300">
          {index}
        </TableCell>
        <TableCell className="max-w-[200px] text-slate-700 dark:text-slate-200">
          <div
            className="truncate font-medium"
            title={result.title || result.domain}
          >
            {result.title || result.domain}
          </div>
        </TableCell>
        <TableCell className="max-w-[200px]">
          <a
            href={`https://${result.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline truncate block"
            title={result.domain}
          >
            {result.domain}
          </a>
        </TableCell>
        <TableCell className="max-w-[300px]">
          <div className="truncate" title={result.description}>
            {result.description}
          </div>
        </TableCell>
        <TableCell className="min-w-[200px]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {result.email?.[0] ? (
                <>
                  <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                    Email
                  </span>
                  <a
                    href={`mailto:${result.email[0]}`}
                    className="text-blue-400 hover:underline text-sm"
                  >
                    {result.email[0]}
                  </a>
                </>
              ) : (
                <span className="text-muted-foreground text-sm">
                  No email found
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {result.phone?.[0] ? (
                <>
                  <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                    Phone
                  </span>
                  <a
                    href={`tel:${result.phone[0]}`}
                    className="text-blue-400 hover:underline text-sm"
                  >
                    {result.phone[0]}
                  </a>
                </>
              ) : (
                <span className="text-muted-foreground text-sm">
                  No phone found
                </span>
              )}
            </div>
          </div>
        </TableCell>
        <TableCell>
          {hasSocials ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  {socialLinks.length} platforms
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                <div className="grid grid-cols-2 gap-2">
                  {socialLinks.map(([platform, urls]) => (
                    <a
                      key={platform}
                      href={urls[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent"
                    >
                      {socialIcons[platform as keyof typeof socialIcons]}
                      <span className="capitalize">{platform}</span>
                    </a>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <span className="text-slate-500 dark:text-slate-400 text-sm">
              No socials found
            </span>
          )}
        </TableCell>
      </TableRow>
      <EmailTemplateDialog
        isOpen={showEmailDialog}
        onClose={() => setShowEmailDialog(false)}
        emailContent={result.emailTemplate || ""}
        companyName={result.title || result.domain}
      />
    </>
  );
}
