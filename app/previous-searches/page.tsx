"use client"

import { SearchHistoryCard } from "@/components/SearchHistoryCard"

// Mock data - in a real app, this would come from an API or database
const searchHistory = [
  {
    query: "Companies: AI companies from Romania",
    category: "Companies",
    resultsCount: 156,
    emailsCount: 89,
    phoneCount: 45,
    date: "About 3 hours ago",
  },
  {
    query: "People: Software Engineers in Berlin",
    category: "People",
    resultsCount: 234,
    emailsCount: 198,
    phoneCount: 67,
    date: "5 hours ago",
  },
  {
    query: "Companies: Startups in London",
    category: "Companies",
    resultsCount: 432,
    emailsCount: 289,
    phoneCount: 156,
    date: "8 hours ago",
  },
]

export default function PreviousSearches() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Last 24 Hours</h1>
        <div className="grid gap-4">
          {searchHistory.map((search, index) => (
            <SearchHistoryCard
              key={index}
              query={search.query}
              category={search.category}
              resultsCount={search.resultsCount}
              emailsCount={search.emailsCount}
              phoneCount={search.phoneCount}
              date={search.date}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

