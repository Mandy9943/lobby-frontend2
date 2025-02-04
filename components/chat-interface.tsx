"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { ArrowRight, Paperclip, Sun, Moon, Building2, Users2, FileText, GraduationCap, Sparkles } from "lucide-react"
import { createGlobalStyle } from "styled-components"
import { Sidebar } from "@/components/Sidebar"
import { LanguageSelector } from "@/components/LanguageSelector"
import { motion, AnimatePresence } from "framer-motion"

const GlobalStyle = createGlobalStyle`
  *:focus {
    outline: none !important;
    box-shadow: none !important;
  }
`

export default function ChatInterface() {
  const [isPro, setIsPro] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [numResults, setNumResults] = useState<number>(10)

  useEffect(() => {
    document.documentElement.classList.add("transition-colors", "duration-150")
    document.documentElement.classList.toggle("dark", isDarkMode)
    return () => {
      document.documentElement.classList.remove("transition-colors", "duration-150")
    }
  }, [isDarkMode])

  return (
    <>
      <GlobalStyle />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen w-full bg-gradient-to-b from-white to-white/90 dark:from-slate-950 dark:to-slate-900/95 flex flex-col items-center justify-start p-4 transition-colors duration-150 -mt-4"
      >
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <LanguageSelector />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-primary hover:text-primary/90 dark:text-white dark:hover:text-white/90"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={`w-full max-w-3xl space-y-8 transition-all duration-300 mt-20 ${isSidebarOpen ? "ml-64" : ""}`}
        >
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-primary dark:text-slate-100 drop-shadow-lg"
          >
            What are you looking for?
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="flex justify-center gap-2 max-w-full overflow-x-auto py-2">
              {["Companies", "People", "Articles", "Research", "Other"].map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCategory(category)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 ${
                      selectedCategory === category
                        ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600 hover:border-blue-600"
                        : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:border-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-600 dark:hover:border-slate-500"
                    }`}
                  >
                    {category === "Companies" && <Building2 className="h-4 w-4" />}
                    {category === "People" && <Users2 className="h-4 w-4" />}
                    {category === "Articles" && <FileText className="h-4 w-4" />}
                    {category === "Research" && <GraduationCap className="h-4 w-4" />}
                    {category === "Other" && <Sparkles className="h-4 w-4" />}
                    {category}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="relative group"
          >
            <div className="relative bg-white/90 dark:bg-slate-900 backdrop-blur-sm rounded-lg border border-white/20 dark:border-slate-800/50 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.5)] p-2">
              <div className="absolute bottom-7 right-16 flex items-center gap-4">
                <AnimatePresence>
                  {selectedCategory !== "Research" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 pr-4 border-r border-slate-200 dark:border-slate-700"
                    >
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Results</span>
                      <Input
                        type="number"
                        value={numResults}
                        onChange={(e) => setNumResults(Number(e.target.value))}
                        className="w-16 h-7 text-sm bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full text-center focus:ring-1 ring-blue-500"
                        min={1}
                        max={100}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <Switch
                  checked={isPro}
                  onCheckedChange={setIsPro}
                  className={`relative w-11 h-6 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800 hover:scale-95 ${
                    isPro ? "bg-blue-500 dark:bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <motion.span
                    layout
                    transition={{
                      type: "spring",
                      stiffness: 700,
                      damping: 30,
                    }}
                    className={`${
                      isPro ? "translate-x-6 bg-white" : "translate-x-1 bg-white"
                    } inline-block w-4 h-4 transform rounded-full shadow-lg`}
                  />
                  <span className="sr-only">Enable Pro mode</span>
                </Switch>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Pro</span>
              </div>
              <Input
                type="text"
                autoFocus
                placeholder={
                  selectedCategory === "Research"
                    ? "Research a topic or paste a website link"
                    : `Search for ${selectedCategory?.toLowerCase() || "leads"}...`
                }
                className="border-0 focus-visible:ring-0 focus:outline-none focus-visible:outline-none text-xl bg-transparent dark:text-slate-100 dark:placeholder:text-slate-400 px-6 py-8 pr-44 w-full"
              />
              <Button
                size="icon"
                className="absolute bottom-7 right-6 rounded-full bg-primary hover:bg-primary/90 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-200 hover:scale-105 w-8 h-8 flex items-center justify-center"
                onClick={() => {
                  setIsLoading(true)
                  setTimeout(() => setIsLoading(false), 2000)
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="rounded-full h-4 w-4 border-2 border-white border-t-transparent"
                  />
                ) : (
                  <ArrowRight className="h-4 w-4 text-white" />
                )}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex justify-center"
          >
            <Button
              variant="outline"
              size="lg"
              className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-all duration-300 transform hover:scale-105 border-2 border-primary/30 dark:border-blue-500/30 hover:border-primary dark:hover:border-blue-500 shadow-md hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-blue-500/20 rounded-full px-6 py-3 font-semibold"
            >
              <Paperclip className="h-5 w-5 mr-2" />
              <span className="relative">
                <span className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-blue-500/20 dark:to-purple-500/20 blur rounded-full"></span>
                <span className="relative">or Attach your own leads</span>
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  )
}

