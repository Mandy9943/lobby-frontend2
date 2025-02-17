import React from "react";

interface TagPillProps {
  content: string;
  icon?: React.ReactNode;
}

const TagPill = ({ content, icon }: TagPillProps) => {
  return (
    <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-800/50 text-slate-300 text-sm break-all dark:hover:bg-slate-700/50 transition-colors">
      <div className="flex items-center min-w-0">
        {icon && <span className="mr-2 flex-shrink-0">{icon}</span>}
        <span className="truncate">{content}</span>
      </div>
    </div>
  );
};

export default TagPill;
