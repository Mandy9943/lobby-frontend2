/* eslint-disable @typescript-eslint/no-explicit-any */
// CompanyResearchHome.tsx

"use client";
import { researchSearchApiUrl } from "@/services/leads-api/research-search";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface LinkedInData {
  text: string;
  url: string;
  image: string;
  title: string;
  [key: string]: any;
}

interface Video {
  id: string;
  url: string;
  title: string;
  author: string;
  [key: string]: any;
}

interface RedditPost {
  url: string;
  title: string;
  [key: string]: any;
}

interface Tweet {
  id: string;
  url: string;
  title: string;
  author: string;
  [key: string]: any;
}

interface Competitor {
  title: string;
  url: string;
  summary: string;
  [key: string]: any;
}

interface NewsItem {
  url: string;
  title: string;
  image: string;
  [key: string]: any;
}

interface Founder {
  url: string;
  title: string;
  [key: string]: any;
}

// Add new interface for company map data
interface CompanyMapData {
  companyName: string;
  rootNode: {
    title: string;
    children: Array<{
      title: string;
      description: string;
      children: Array<{
        title: string;
        description: string;
      }>;
    }>;
  };
}

const useWebsiteResearch = (url: string) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [companyUrl] = useState(url);
  const [linkedinData, setLinkedinData] = useState<LinkedInData | null>(null);
  const [competitors, setCompetitors] = useState<Competitor[] | null>(null);
  const [news, setNews] = useState<NewsItem[] | null>(null);
  const [companySummary, setCompanySummary] = useState<any>(null);
  const [twitterProfileText, setTwitterProfileText] = useState<any>(null);
  const [recentTweets, setRecentTweets] = useState<Tweet[] | null>(null);
  const [youtubeVideos, setYoutubeVideos] = useState<Video[] | null>(null);
  const [redditPosts, setRedditPosts] = useState<RedditPost[] | null>(null);
  const [githubUrl, setGithubUrl] = useState<string | null>(null);
  const [fundingData, setFundingData] = useState<any>(null);
  const [financialReport, setFinancialReport] = useState<any>(null);
  const [tiktokData, setTiktokData] = useState<any>(null);
  const [wikipediaData, setWikipediaData] = useState<any>(null);
  const [crunchbaseData, setCrunchbaseData] = useState<any>(null);
  const [pitchbookData, setPitchbookData] = useState<any>(null);
  const [tracxnData, setTracxnData] = useState<any>(null);
  const [founders, setFounders] = useState<Founder[] | null>(null);
  const [companyMap, setCompanyMap] = useState<CompanyMapData | null>(null);

  // Function to check if a string is a valid URL
  const isValidUrl = (url: string): boolean => {
    try {
      // Remove any whitespace
      url = url.trim();

      // Check if it's just a single word without dots
      if (!url.includes(".")) {
        return false;
      }

      // Add protocol if missing
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }

      const urlObj = new URL(url);
      // Check if hostname has at least one dot and no spaces
      return urlObj.hostname.includes(".") && !urlObj.hostname.includes(" ");
    } catch {
      return false;
    }
  };

  // Function to validate and extract domain name from URL
  const extractDomain = (url: string): string | null => {
    try {
      if (!isValidUrl(url)) {
        return null;
      }

      let cleanUrl = url.trim().toLowerCase();

      // Add protocol if missing
      if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
        cleanUrl = "https://" + cleanUrl;
      }

      // Parse URL
      const parsedUrl = new URL(cleanUrl);

      // Get domain without www.
      const domain = parsedUrl.hostname.replace(/^www\./, "");

      // Additional validation: domain should have at least one dot and no spaces
      if (!domain.includes(".") || domain.includes(" ")) {
        return null;
      }

      return domain;
    } catch {
      toast.error("Error extracting domain name");
      return null;
    }
  };

  // LinkedIn API fetch function
  const fetchLinkedInData = async (url: string) => {
    try {
      const response = await fetch(`${researchSearchApiUrl}/social-profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error("LinkedIn research failed");
      }

      const data = await response.json();
      console.log(data);

      return data.linkedin[0];
    } catch (error) {
      console.error("Error fetching LinkedIn data:", error);
      throw error;
    }
  };

  // Function to scrape main page
  const scrapeMainPage = async (url: string) => {
    try {
      const response = await fetch(`${researchSearchApiUrl}/website-content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch main website data");
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error scraping main page:", error);
      throw error;
    }
  };

  // Function to fetch company details (summary and map)
  const fetchCompanyDetails = async (mainPageData: any, url: string) => {
    try {
      // First fetch subpages
      const subpagesResponse = await fetch(`${researchSearchApiUrl}/subpages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!subpagesResponse.ok) {
        throw new Error("Failed to fetch subpages data");
      }

      const subpagesData = await subpagesResponse.json();

      // Then use both main page and subpages data
      await Promise.all([
        fetchCompanySummary(subpagesData.results, mainPageData, url),
        fetchCompanyMap(mainPageData, url),
      ]);
    } catch (error) {
      console.error("Error fetching company details:", error);
      throw error;
    }
  };

  // Update fetchCompetitors to only use main page data
  const fetchCompetitors = async (summary: string, url: string) => {
    try {
      const response = await fetch(`${researchSearchApiUrl}/competitors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          websiteurl: url,
          summaryText: summary,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch competitors");
      }

      const data = await response.json();
      return data.results.map((result: any) => ({
        title: result.title,
        url: result.url,
        summary: result.summary,
      }));
    } catch (error) {
      console.error("Error fetching competitors:", error);
      throw error;
    }
  };

  // New function to fetch news
  const fetchNews = async (url: string) => {
    try {
      const response = await fetch(`${researchSearchApiUrl}/news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error("News research failed");
      }

      const data = await response.json();
      return data.results.results.filter((item: any) => item.title).slice(0, 6);
    } catch (error) {
      console.error("Error fetching news:", error);
      throw error;
    }
  };

  // Separate function for fetching company summary
  const fetchCompanySummary = async (
    subpages: any,
    mainpage: any,
    websiteurl: string
  ) => {
    try {
      const response = await fetch(`${researchSearchApiUrl}/summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subpages,
          mainpage,
          websiteurl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch company summary");
      }

      const data = await response.json();
      console.log(data);

      setCompanySummary(data.sections);
    } catch (error) {
      console.error("Error fetching company summary:", error);
    }
  };

  // New function for fetching company map
  const fetchCompanyMap = async (mainpage: any, websiteurl: string) => {
    try {
      const response = await fetch(`${researchSearchApiUrl}/mindmap`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mainpage,
          websiteurl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch company map");
      }

      const data = await response.json();
      setCompanyMap(data.result);
    } catch (error) {
      console.error("Error fetching company map:", error);
    }
  };

  // Recent tweets fetch function
  const fetchRecentTweets = async (username: string) => {
    try {
      const response = await fetch(`${researchSearchApiUrl}/recent-tweets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recent tweets");
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error("Error fetching recent tweets:", error);
      throw error;
    }
  };

  // Twitter profile fetch function
  const fetchTwitterProfile = async (url: string) => {
    try {
      const response = await fetch(`${researchSearchApiUrl}/social-profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch Twitter profile");
      }

      const data = await response.json();
      if (data.twitter && data.twitter.length > 0) {
        const result = data.twitter[0];
        // Fetch tweets separately without waiting
        if (result.author) {
          fetchRecentTweets(result.author)
            .then((tweets) => setRecentTweets(tweets))
            .catch((error) =>
              console.error("Error fetching recent tweets:", error)
            );
        }
        return {
          text: result.text,
          username: result.author,
        };
      }
      return null;
    } catch (error) {
      console.error("Error fetching Twitter profile:", error);
      throw error;
    }
  };
  // Youtube videos fetch function
  const fetchYoutubeVideos = async (url: string) => {
    try {
      const response = await fetch(`${researchSearchApiUrl}/youtube-videos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch YouTube videos");
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
      throw error;
    }
  };

  // Reddit posts fetch function
  const fetchRedditPosts = async (url: string) => {
    try {
      const response = await fetch(`${researchSearchApiUrl}/reddit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch Reddit posts");
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error("Error fetching Reddit posts:", error);
      throw error;
    }
  };

  // GitHub URL fetch function
  const fetchGitHubUrl = async (url: string) => {
    try {
      const response = await fetch(`${researchSearchApiUrl}/github`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch GitHub URL");
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].url;
      }
      return null;
    } catch (error) {
      console.error("Error fetching GitHub URL:", error);
      throw error;
    }
  };

  // Funding API fetch function
  const fetchFunding = async (url: string) => {
    try {
      const response = await fetch(`${researchSearchApiUrl}/funding`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch funding data");
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0];
      }
      return null;
    } catch (error) {
      console.error("Error fetching funding data:", error);
      throw error;
    }
  };

  // Financial report fetch function
  const fetchFinancialReport = async (url: string) => {
    try {
      const response = await fetch(
        `${researchSearchApiUrl}/financial-reports`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ websiteurl: url }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch financial report");
      }

      const data = await response.json();
      return data.results || null;
    } catch (error) {
      console.error("Error fetching financial report:", error);
      throw error;
    }
  };

  // TikTok fetch function
  const fetchTikTokProfile = async (url: string) => {
    try {
      const response = await fetch(`${researchSearchApiUrl}/tiktok`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch TikTok profile");
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0];
      }
      return null;
    } catch (error) {
      console.error("Error fetching TikTok profile:", error);
      throw error;
    }
  };

  // Wikipedia fetch function
  const fetchWikipedia = async (url: string) => {
    try {
      const response = await fetch(`${researchSearchApiUrl}/wikipedia`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch Wikipedia data");
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return {
          text: data.results[0].text,
          url: data.results[0].url,
        };
      }
      return null;
    } catch (error) {
      console.error("Error fetching Wikipedia data:", error);
      throw error;
    }
  };

  // Crunchbase fetch function
  const fetchCrunchbase = async (url: string) => {
    try {
      const response = await fetch(`${researchSearchApiUrl}/crunchbase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch Crunchbase data");
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0];
      }
      return null;
    } catch (error) {
      console.error("Error fetching Crunchbase data:", error);
      throw error;
    }
  };

  // PitchBook fetch function
  const fetchPitchbook = async (url: string) => {
    try {
      const response = await fetch(`${researchSearchApiUrl}/pitchbook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch PitchBook data");
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0];
      }
      return null;
    } catch (error) {
      console.error("Error fetching PitchBook data:", error);
      throw error;
    }
  };

  // Tracxn fetch function
  const fetchTracxn = async (url: string) => {
    try {
      const response = await fetch(`${researchSearchApiUrl}/tracxn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch Tracxn data");
      }

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0];
      }
      return null;
    } catch (error) {
      console.error("Error fetching Tracxn data:", error);
      throw error;
    }
  };

  // Founders fetch function
  const fetchFounders = async (url: string) => {
    try {
      const response = await fetch(`${researchSearchApiUrl}/founders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ websiteurl: url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch founders");
      }

      const data = await response.json();
      // Filter out company and post URLs, only keep individual profiles
      return data.results.filter(
        (result: any) =>
          !result.url.includes("/company/") &&
          !result.url.includes("/post/") &&
          result.url.includes("/in/")
      );
    } catch (error) {
      console.error("Error fetching founders:", error);
      throw error;
    }
  };

  // Add helper function to process LinkedIn text
  const processLinkedInText = (data: LinkedInData) => {
    const extract = (marker: string): string => {
      const index = data.text.indexOf(marker);
      if (index === -1) return "";

      const start = index + marker.length;
      const possibleEndMarkers = [
        "Industry",
        "Company size",
        "Headquarters",
        "\n\n",
      ];
      let end = data.text.length;

      for (const endMarker of possibleEndMarkers) {
        const nextIndex = data.text.indexOf(endMarker, start);
        if (nextIndex !== -1 && nextIndex < end && nextIndex > start) {
          end = nextIndex;
        }
      }

      return data.text.substring(start, end).trim();
    };

    return {
      companySize: extract("Company size"),
    };
  };

  // Add helper function to parse company size
  const parseCompanySize = (size: string): number => {
    if (!size) return 0;
    // Extract first number from string (e.g. "1,001-5,000" -> 1001)
    const match = size.match(/(\d+(?:,\d+)*)/);
    if (!match) return 0;
    return parseInt(match[1].replace(/,/g, ""));
  };

  // Main Research Function
  const handleResearch = async () => {
    if (!companyUrl) {
      toast.error("Please enter a company URL");
      return;
    }

    const domainName = extractDomain(companyUrl);

    if (!domainName) {
      toast.error("Please enter a valid company URL ('example.com')");
      return;
    }

    setIsGenerating(true);

    // Reset all states to null
    setLinkedinData(null);
    setCompetitors(null);
    setNews(null);
    setCompanySummary(null);
    setTwitterProfileText(null);
    setRecentTweets(null);
    setYoutubeVideos(null);
    setRedditPosts(null);
    setGithubUrl(null);
    setFundingData(null);
    setFinancialReport(null);
    setTiktokData(null);
    setWikipediaData(null);
    setCrunchbaseData(null);
    setPitchbookData(null);
    setTracxnData(null);
    setFounders(null);
    setCompanyMap(null);

    try {
      // Run all API calls in parallel
      const promises = [
        // Main page scraping and dependent calls
        (async () => {
          const mainPageData = await scrapeMainPage(domainName);
          if (mainPageData && mainPageData[0]?.summary) {
            await Promise.all([
              fetchCompanyDetails(mainPageData, domainName).catch((error) =>
                toast.error(
                  `Company details: ${error.message || "An error occurred"}`
                )
              ),
              fetchCompetitors(mainPageData[0].summary, domainName)
                .then((data) => setCompetitors(data))
                .catch((error) =>
                  toast.error(
                    `Competitors: ${error.message || "An error occurred"}`
                  )
                ),
            ]);
          }
        })().catch((error) =>
          toast.error(`Website data: ${error.message || "An error occurred"}`)
        ),

        // Independent API calls that don't need main page data
        fetchLinkedInData(domainName)
          .then((data) => setLinkedinData(data))
          .catch((error) =>
            toast.error(`LinkedIn: ${error.message || "An error occurred"}`)
          ),

        fetchNews(domainName)
          .then((data) => setNews(data))
          .catch((error) =>
            toast.error(`News: ${error.message || "An error occurred"}`)
          ),

        fetchTwitterProfile(domainName)
          .then((data) => setTwitterProfileText(data))
          .catch((error) =>
            toast.error(
              `Twitter profile: ${error.message || "An error occurred"}`
            )
          ),

        fetchYoutubeVideos(domainName)
          .then((data) => setYoutubeVideos(data))
          .catch((error) =>
            toast.error(
              `YouTube videos: ${error.message || "An error occurred"}`
            )
          ),

        fetchRedditPosts(domainName)
          .then((data) => setRedditPosts(data))
          .catch((error) =>
            toast.error(`Reddit posts: ${error.message || "An error occurred"}`)
          ),

        fetchGitHubUrl(domainName)
          .then((url) => setGithubUrl(url))
          .catch((error) =>
            toast.error(`GitHub: ${error.message || "An error occurred"}`)
          ),

        fetchFunding(domainName)
          .then((data) => setFundingData(data))
          .catch((error) =>
            toast.error(`Funding: ${error.message || "An error occurred"}`)
          ),

        fetchFinancialReport(domainName)
          .then((data) => setFinancialReport(data))
          .catch((error) =>
            toast.error(
              `Financial report: ${error.message || "An error occurred"}`
            )
          ),

        fetchTikTokProfile(domainName)
          .then((data) => setTiktokData(data))
          .catch((error) =>
            toast.error(`TikTok: ${error.message || "An error occurred"}`)
          ),

        fetchWikipedia(domainName)
          .then((data) => setWikipediaData(data))
          .catch((error) =>
            toast.error(`Wikipedia: ${error.message || "An error occurred"}`)
          ),

        fetchCrunchbase(domainName)
          .then((data) => setCrunchbaseData(data))
          .catch((error) =>
            toast.error(`Crunchbase: ${error.message || "An error occurred"}`)
          ),

        fetchPitchbook(domainName)
          .then((data) => setPitchbookData(data))
          .catch((error) =>
            toast.error(`PitchBook: ${error.message || "An error occurred"}`)
          ),

        fetchTracxn(domainName)
          .then((data) => setTracxnData(data))
          .catch((error) =>
            toast.error(`Tracxn: ${error.message || "An error occurred"}`)
          ),

        fetchFounders(domainName)
          .then((data) => setFounders(data))
          .catch((error) =>
            toast.error(`Founders: ${error.message || "An error occurred"}`)
          ),
      ];

      await Promise.allSettled(promises);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (companyUrl) {
      handleResearch();
    }
  }, [companyUrl]);

  console.log(linkedinData);
  console.log(companySummary);
  console.log(founders);
  console.log(financialReport);
  console.log(fundingData);
  console.log(crunchbaseData);
  console.log(pitchbookData);
  console.log(tracxnData);
  console.log(wikipediaData);
  console.log(competitors);
  console.log(news);
  console.log(twitterProfileText);
  console.log(youtubeVideos);
  console.log(tiktokData);
  console.log(redditPosts);
  console.log(githubUrl);
  console.log(companyMap);

  return {
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
    tiktokData,
    wikipediaData,
    crunchbaseData,
    pitchbookData,
    tracxnData,
    founders,
    companyMap,
    isGenerating,
    processLinkedInText,
    parseCompanySize,
  };
};

export default useWebsiteResearch;
