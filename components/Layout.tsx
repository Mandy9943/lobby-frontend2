"use client";
import { useSidebar } from "@/store/global";
import { motion } from "framer-motion";
import React from "react";
import SettingsModal from "./SettingsModal/settings-modal";
import { Sidebar } from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gradient-to-b from-white to-white/90 dark:from-slate-950 dark:to-slate-900/95 flex flex-col items-center justify-start p-4 transition-colors duration-150 -mt-4"
    >
      <Sidebar isOpen={isOpen} onToggle={toggleSidebar} />
      <SettingsModal />

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className={`space-y-8 transition-all duration-300 mt-20 ${
          isOpen
            ? "w-[calc(100%-260px)] ml-[260px]"
            : "w-[calc(100%-64px)] ml-[64px]"
        }`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Layout;
