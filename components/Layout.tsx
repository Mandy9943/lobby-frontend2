"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { LanguageSelector } from "./LanguageSelector";
import { Sidebar } from "./Sidebar";
import Login from "./login";

const ModeToggle = dynamic(() => import("./mode-toggle"), { ssr: false });

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gradient-to-b from-white to-white/90 dark:from-slate-950 dark:to-slate-900/95 flex flex-col items-center justify-start p-4 transition-colors duration-150 -mt-4"
    >
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <Login />
        <LanguageSelector />
        <ModeToggle />
      </div>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className={`w-full space-y-8 transition-all duration-300 mt-20 ${
          isSidebarOpen ? "ml-64" : ""
        }`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Layout;
