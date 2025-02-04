import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Home, Search, Mail, Phone, Video } from "lucide-react"
import Link from "next/link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 text-primary hover:text-primary/90 dark:text-white dark:hover:text-white/90"
      >
        <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </Button>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white/80 dark:bg-slate-800/90 backdrop-blur-xl border-r border-white/20 dark:border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 pt-20">
          <nav>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors duration-200"
                >
                  <Home className="h-5 w-5" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/previous-searches"
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors duration-200"
                >
                  <Search className="h-5 w-5" />
                  Searches
                </Link>
              </li>
              <li>
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-left text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors duration-200">
                    <span className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Email Agent
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-7 mt-2 space-y-2">
                    <Link
                      href="/email-agent/create"
                      className="block text-sm text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors duration-200"
                    >
                      Create an AI email agent
                    </Link>
                    <Link
                      href="/email-agent/leads"
                      className="block text-sm text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors duration-200"
                    >
                      All email leads
                    </Link>
                    <Link
                      href="/email-agent/sent"
                      className="block text-sm text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors duration-200"
                    >
                      Sent Emails
                    </Link>
                    <Link
                      href="/email-agent/send"
                      className="block text-sm text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors duration-200"
                    >
                      Send emails
                    </Link>
                    <Link
                      href="/email-agent/responders"
                      className="block text-sm text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors duration-200"
                    >
                      Responders
                    </Link>
                  </CollapsibleContent>
                </Collapsible>
              </li>
              <li>
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-left text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors duration-200">
                    <span className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Voice Agent
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-7 mt-2 space-y-2">
                    <Link
                      href="/voice-agent/clone"
                      className="block text-sm text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors duration-200"
                    >
                      Clone voice
                    </Link>
                    <Link
                      href="/voice-agent/create"
                      className="block text-sm text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors duration-200"
                    >
                      Create an AI agent
                    </Link>
                    <Link
                      href="/voice-agent/numbers"
                      className="block text-sm text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors duration-200"
                    >
                      All phone numbers
                    </Link>
                  </CollapsibleContent>
                </Collapsible>
              </li>
              <li>
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-left text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors duration-200">
                    <span className="flex items-center gap-2">
                      <Video className="h-5 w-5" />
                      Video Agent
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-7 mt-2 space-y-2">
                    <Link
                      href="/video-agent/clone"
                      className="block text-sm text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors duration-200"
                    >
                      Clone yourself
                    </Link>
                    <Link
                      href="/video-agent/creator"
                      className="block text-sm text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors duration-200"
                    >
                      AI Creator
                    </Link>
                    <Link
                      href="/video-agent/ads"
                      className="block text-sm text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors duration-200"
                    >
                      AI Ads
                    </Link>
                  </CollapsibleContent>
                </Collapsible>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

