import { Home, Mail, Phone, Search, Video } from "lucide-react";

export const routesNames = {
  home: "/",
  previousSearches: "/previous-searches",
  emailAgent: "/email-agent",

  privacyPolicy: "/privacy-policy",
  termsOfUse: "/terms-of-use",
};

interface NavRoute {
  name: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  subRoutes?: NavRoute[];
}

export const navRoutes: NavRoute[] = [
  {
    name: "Home",
    href: routesNames.home,
    icon: Home,
  },
  {
    name: "Searches",
    href: routesNames.previousSearches,
    icon: Search,
  },
  {
    name: "Email Agent",
    icon: Mail,
    subRoutes: [
      {
        name: "Create an AI email agent",
        href: routesNames.emailAgent,
      },
      {
        name: "All email leads",
        href: routesNames.emailAgent,
      },
      {
        name: "Sent Emails",
        href: routesNames.emailAgent,
      },
      {
        name: "Responders",
        href: routesNames.emailAgent,
      },
    ],
  },
  {
    name: "Voice Agent",
    icon: Phone,
    subRoutes: [
      {
        name: "Clone voice",
        href: routesNames.emailAgent,
      },
      {
        name: "Create an AI agent",
        href: routesNames.emailAgent,
      },
      {
        name: "All phone number",
        href: routesNames.emailAgent,
      },
    ],
  },
  {
    name: "Video Agent",
    icon: Video,
    subRoutes: [
      {
        name: "Clone yourself",
        href: routesNames.emailAgent,
      },
      {
        name: "AI Creator",
        href: routesNames.emailAgent,
      },
      {
        name: "AI Ads",
        href: routesNames.emailAgent,
      },
    ],
  },
];
