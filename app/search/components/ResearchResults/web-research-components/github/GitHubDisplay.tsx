/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { MapPin, Users2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FaGithub, FaStar, FaUsers } from "react-icons/fa";

// Language colors matching GitHub's colors
const LANGUAGE_COLORS: { [key: string]: string } = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  PHP: "#4F5D95",
  Swift: "#ffac45",
  Kotlin: "#F18E33",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Dart: "#00B4AB",
  Scala: "#c22d40",
  default: "#808080",
};

interface GitHubProfile {
  name: string;
  login: string;
  description: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
  avatar_url: string;
  html_url: string;
  location?: string;
  blog?: string;
  stargazers_count?: number;
  repositories?: any[];
}

interface GitHubDisplayProps {
  githubUrl: string;
}

export default function GitHubDisplay({ githubUrl }: GitHubDisplayProps) {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Extract username from GitHub URL
        const username = githubUrl.split("/").pop();
        if (!username) throw new Error("Invalid GitHub URL");

        const headers = {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        };

        // Fetch profile data
        const profileResponse = await fetch(
          `https://api.github.com/users/${username}`,
          { headers }
        );
        if (!profileResponse.ok)
          throw new Error("Failed to fetch GitHub profile");
        const profileData = await profileResponse.json();

        // Fetch repositories with sort parameter in the API URL
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=stars&direction=desc&per_page=6`,
          { headers }
        );
        if (!reposResponse.ok) throw new Error("Failed to fetch repositories");
        const reposData = await reposResponse.json();

        setProfile({
          ...profileData,
          repositories: reposData,
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch GitHub data"
        );
      } finally {
        setLoading(false);
      }
    };

    if (githubUrl) {
      fetchGitHubData();
    }
  }, [githubUrl]);

  if (loading) {
    return (
      <div className="animate-pulse bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="rounded-full bg-gray-200 h-16 w-16"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="bg-red-50 rounded-lg p-6 mb-6">
        <h3 className="text-red-800 font-semibold flex items-center gap-2">
          <FaGithub className="text-xl" />
          Error Loading GitHub Data
        </h3>
        <p className="text-red-600 mt-2">
          {error || "Failed to load GitHub profile"}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 border border-slate-800/50 transition-all hover:shadow-xl hover:border-slate-700/50">
        <div className="flex items-center gap-2 text-slate-200 mb-6">
          <FaGithub className="text-2xl" />
          <h2 className="text-2xl font-normal">GitHub Profile</h2>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-medium text-slate-200 mb-2">
              {profile.name || profile.login}
            </h3>
            {profile.bio && (
              <p className="text-slate-300 mb-4">{profile.bio}</p>
            )}

            <div className="flex flex-wrap gap-4 text-slate-300">
              {profile.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Users2 className="w-4 h-4" />
                <span>{profile.followers} followers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Repositories Section */}
        <div className="mt-8">
          <p className="text-md font-semibold mb-4 text-slate-200">
            Popular Repositories
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.repositories?.map((repo: any) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-slate-800/50 rounded-lg p-4 hover:border-slate-700/50 transition-colors bg-slate-800/30 block"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-brand-default hover:text-brand-hover font-semibold">
                    {repo.name}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-slate-700/50 text-slate-300">
                    {repo.visibility}
                  </span>
                </div>
                <p className="text-slate-300 text-sm mb-3 line-clamp-2">
                  {repo.description || "No description provided"}
                </p>
                <div className="flex gap-4 text-slate-400 text-sm">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor:
                            LANGUAGE_COLORS[repo.language] || "#ddd",
                        }}
                      />
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      {repo.stargazers_count}
                    </span>
                  )}
                  {repo.forks_count > 0 && (
                    <span className="flex items-center gap-1">
                      <FaUsers className="text-slate-400" />
                      {repo.forks_count}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
