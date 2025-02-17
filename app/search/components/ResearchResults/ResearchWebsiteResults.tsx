/* eslint-disable @typescript-eslint/no-explicit-any */
// CompanyResearchHome.tsx

"use client";
import useWebsiteResearch from "./useWebsiteResearch";
import CompanySummary from "./web-research-components/companycontent/CompanySummar";
import FundingDisplay from "./web-research-components/companycontent/FundingDisplay";
import CompetitorsDisplay from "./web-research-components/competitors/CompetitorsDisplay";
import CrunchbaseDisplay from "./web-research-components/crunchbase/CrunchbaseDisplay";
import FinancialReportDisplay from "./web-research-components/financial/FinancialReportDisplay";
import FoundersDisplay from "./web-research-components/founders/FoundersDisplay";
import GitHubDisplay from "./web-research-components/github/GitHubDisplay";
import CompanyMindMap from "./web-research-components/mindmap/CompanyMindMap";
import NewsDisplay from "./web-research-components/news/NewsDisplay";
import PitchBookDisplay from "./web-research-components/pitchbook/PitchBookDisplay";
import RedditDisplay from "./web-research-components/reddit/RedditDisplay";
import {
  CompanySummarySkeleton,
  CompetitorsSkeleton,
  FinancialSkeleton,
  FoundersSkeleton,
  FundingSkeleton,
  GitHubSkeleton,
  NewsSkeleton,
  RedditSkeleton,
  TikTokSkeleton,
  TwitterSkeleton,
  WikipediaSkeleton,
  YouTubeSkeleton,
} from "./web-research-components/skeletons/ResearchSkeletons";
import TikTokDisplay from "./web-research-components/tiktok/TikTokDisplay";
import TracxnDisplay from "./web-research-components/tracxn/TracxnDisplay";
import RecentTweetsDisplay from "./web-research-components/twitter/RecentTweetsDisplay";
import ProfileDisplay from "./web-research-components/twitter/TwitterProfileDisplay";
import WikipediaDisplay from "./web-research-components/wikipedia/WikipediaDisplay";
import YoutubeVideosDisplay from "./web-research-components/youtube/YoutubeVideosDisplay";

export default function CompanyResearcher({ url }: { url: string }) {
  const {
    linkedinData,
    competitors,
    news,
    companySummary,
    twitterProfileText,
    recentTweets,
    youtubeVideos,
    redditPosts,
    githubUrl,
    fundingData,
    financialReport,
    crunchbaseData,
    pitchbookData,
    tracxnData,
    founders,
    companyMap,
    isGenerating,
    wikipediaData,
    tiktokData,
    processLinkedInText,
    parseCompanySize,
  } = useWebsiteResearch(url);

  return (
    <div className="w-full max-w-5xl p-6 z-10 mb-20 mt-6">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl md:text-4xl pb-4 font-medium opacity-0 animate-fade-up [animation-delay:200ms]">
          Research Results for
        </h1>
        <span className="text-3xl md:text-4xl pb-4 font-medium text-brand-default opacity-0 animate-fade-up [animation-delay:300ms]">
          {url}
        </span>
      </div>

      <p className="text-muted-foreground mb-8 opacity-0 animate-fade-up [animation-delay:400ms]">
        Analyzing company data, social presence, and market insights
      </p>

      <div className="space-y-8">
        {/* Company Overview Section */}
        <div className="space-y-12">
          {(linkedinData ||
            companySummary ||
            founders ||
            financialReport ||
            fundingData ||
            crunchbaseData ||
            pitchbookData ||
            tracxnData ||
            wikipediaData) && (
            <div className="flex items-center">
              <h2 className="text-2xl font-medium">Company Overview</h2>
            </div>
          )}

          {isGenerating && founders === null ? (
            <FoundersSkeleton />
          ) : (
            founders &&
            founders.length > 0 && (
              <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                <FoundersDisplay founders={founders} />
              </div>
            )
          )}

          {linkedinData &&
            parseCompanySize(processLinkedInText(linkedinData).companySize) >=
              1000 &&
            (isGenerating && financialReport === null ? (
              <FinancialSkeleton />
            ) : (
              financialReport && (
                <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                  <FinancialReportDisplay report={financialReport} />
                </div>
              )
            ))}

          <div className="space-y-6">
            {isGenerating && fundingData === null ? (
              <FundingSkeleton />
            ) : (
              fundingData && (
                <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                  <FundingDisplay fundingData={fundingData} />
                </div>
              )
            )}

            {isGenerating && crunchbaseData === null ? (
              <FundingSkeleton />
            ) : (
              crunchbaseData && (
                <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                  <CrunchbaseDisplay data={crunchbaseData} />
                </div>
              )
            )}

            {isGenerating && pitchbookData === null ? (
              <FundingSkeleton />
            ) : (
              pitchbookData && (
                <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                  <PitchBookDisplay data={pitchbookData} />
                </div>
              )
            )}

            {isGenerating && tracxnData === null ? (
              <FundingSkeleton />
            ) : (
              tracxnData && (
                <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                  <TracxnDisplay data={tracxnData} />
                </div>
              )
            )}
          </div>

          {isGenerating && wikipediaData === null ? (
            <WikipediaSkeleton />
          ) : (
            wikipediaData && (
              <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                <WikipediaDisplay data={wikipediaData} websiteUrl={url} />
              </div>
            )
          )}

          {isGenerating && competitors === null ? (
            <CompetitorsSkeleton />
          ) : (
            competitors &&
            competitors.length > 0 && (
              <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                <CompetitorsDisplay competitors={competitors} />
              </div>
            )
          )}

          {isGenerating && news === null ? (
            <NewsSkeleton />
          ) : (
            news &&
            news.length > 0 && (
              <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                <NewsDisplay news={news} />
              </div>
            )
          )}
        </div>

        {/* Company Socials Section */}
        <div className="space-y-12 pt-8">
          {(twitterProfileText ||
            youtubeVideos ||
            tiktokData ||
            redditPosts ||
            githubUrl) && (
            <div className="flex items-center">
              <h2 className="text-2xl font-medium">Company Socials</h2>
            </div>
          )}

          {isGenerating && twitterProfileText === null ? (
            <TwitterSkeleton />
          ) : (
            twitterProfileText && (
              <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                <ProfileDisplay
                  rawText={twitterProfileText.text}
                  username={twitterProfileText.username}
                />
                {recentTweets && <RecentTweetsDisplay tweets={recentTweets} />}
              </div>
            )
          )}

          {isGenerating && youtubeVideos === null ? (
            <YouTubeSkeleton />
          ) : (
            youtubeVideos &&
            youtubeVideos.length > 0 && (
              <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                <YoutubeVideosDisplay videos={youtubeVideos} />
              </div>
            )
          )}

          {isGenerating && redditPosts === null ? (
            <RedditSkeleton />
          ) : (
            redditPosts &&
            redditPosts.length > 0 && (
              <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                <RedditDisplay posts={redditPosts} />
              </div>
            )
          )}

          {isGenerating && tiktokData === null ? (
            <TikTokSkeleton />
          ) : (
            tiktokData && (
              <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                <TikTokDisplay data={tiktokData} />
              </div>
            )
          )}

          {isGenerating && githubUrl === null ? (
            <GitHubSkeleton />
          ) : (
            githubUrl && (
              <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                <GitHubDisplay githubUrl={githubUrl} />
              </div>
            )
          )}
        </div>

        {/* Summary and Mind Map Section */}
        {(isGenerating || companySummary) && (
          <div className="space-y-6">
            <div className="flex items-center">
              <h2 className="text-2xl font-medium mt-4">
                Summary and Mind Map
              </h2>
            </div>

            {isGenerating && companySummary === null ? (
              <CompanySummarySkeleton />
            ) : (
              companySummary && (
                <div className="opacity-0 animate-fade-up [animation-delay:200ms]">
                  <CompanySummary summary={companySummary} />
                </div>
              )
            )}

            {isGenerating && companyMap === null ? (
              <div className="hidden sm:block animate-pulse">
                <div className="h-64 bg-secondary-darkest rounded-lg flex items-center justify-center">
                  <p className="text-gray-400 text-md">Loading...</p>
                </div>
              </div>
            ) : (
              companyMap && (
                <div className="hidden sm:block opacity-0 animate-fade-up [animation-delay:200ms]">
                  <CompanyMindMap data={companyMap} />
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
