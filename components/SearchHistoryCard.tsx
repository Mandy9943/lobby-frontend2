import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Mail, Phone, Search } from "lucide-react";

interface SearchHistoryCardProps {
  query: string;
  category: string;
  resultsCount: number;
  emailsCount: number;
  phoneCount: number;
  date: string;
}

export function SearchHistoryCard({
  query,
  category,
  resultsCount,
  emailsCount,
  phoneCount,
  date,
}: SearchHistoryCardProps) {
  return (
    <Card className="w-full bg-white/80 dark:bg-slate-800/90 backdrop-blur-xl border-white/20 dark:border-white/10">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                {query}
              </h3>
              <Badge
                variant="secondary"
                className="bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              >
                <Building2 className="w-4 h-4 mr-1" />
                {category}
              </Badge>
            </div>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {date}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Search className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Results: {resultsCount}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Mail className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Emails: {emailsCount}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Phone className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Phone numbers: {phoneCount}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
