"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Building2,
  FileText,
  GraduationCap,
  Sparkles,
  Users2,
} from "lucide-react";
import { useState } from "react";

const CategoriesSelector = ({
  onCategoryChange,
}: {
  onCategoryChange: (category: string) => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "Companies"
  );
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="flex justify-center"
    >
      <div className="flex justify-center gap-2 max-w-full overflow-x-auto py-2">
        {["Companies", "People", "Articles", "Research", "Other"].map(
          (category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
            >
              <Button
                variant="outline"
                onClick={() => handleCategoryChange(category)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600 hover:border-blue-600"
                    : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:border-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-600 dark:hover:border-slate-500"
                }`}
              >
                {category === "Companies" && <Building2 className="h-4 w-4" />}
                {category === "People" && <Users2 className="h-4 w-4" />}
                {category === "Articles" && <FileText className="h-4 w-4" />}
                {category === "Research" && (
                  <GraduationCap className="h-4 w-4" />
                )}
                {category === "Other" && <Sparkles className="h-4 w-4" />}
                {category}
              </Button>
            </motion.div>
          )
        )}
      </div>
    </motion.div>
  );
};

export default CategoriesSelector;
