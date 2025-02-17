"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";

interface MindMapNode {
  title: string;
  description?: string;
  children?: MindMapNode[];
}

interface CompanyMapData {
  companyName: string;
  rootNode: {
    title: string;
    children: MindMapNode[];
  };
}

interface CompanyMindMapProps {
  data: CompanyMapData;
}

interface TreeNode {
  name: string;
  description?: string;
  children: TreeNode[];
}

const CustomNode = ({
  nodeDatum,
  isMobile,
}: {
  nodeDatum: TreeNode;
  isMobile: boolean;
}) => (
  <foreignObject
    width={isMobile ? 160 : 280}
    height={80}
    x={isMobile ? -80 : -140}
    y={-40}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-[var(--secondary-faint)] p-2 md:p-4 rounded-xl border border-[var(--secondary-darkest)] 
                 hover:shadow-md hover:border-[var(--secondary-accent)] transition-all duration-300 
                 backdrop-blur-sm"
    >
      <div className="font-semibold text-[11px] md:text-sm text-[var(--foreground)] mb-1 md:mb-1.5 line-clamp-1">
        {nodeDatum.name}
      </div>
      {nodeDatum.description && (
        <div className="text-[9px] md:text-xs text-[var(--foreground-muted)] line-clamp-2 leading-relaxed">
          {nodeDatum.description}
        </div>
      )}
    </motion.div>
  </foreignObject>
);

const CompanyMindMap: React.FC<CompanyMindMapProps> = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const transformData = (node: MindMapNode): TreeNode => {
    return {
      name: node.title,
      description: node.description,
      children: node.children ? node.children.map(transformData) : [],
    };
  };

  const treeData: TreeNode = {
    name: data.companyName,
    description: data.rootNode.title,
    children: data.rootNode.children.map(transformData),
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const renderCustomNodeElement = (nodeData) => (
    <CustomNode {...nodeData} isMobile={isMobile} />
  );

  return (
    <div
      className="w-full  h-[400px] md:h-[700px] bg-[var(--background)] rounded-md shadow-inner relative 
                    border border-border stroke-white stroke-[2px]"
    >
      <Tree
        data={treeData}
        orientation="horizontal"
        nodeSize={{
          x: isMobile ? 250 : 600,
          y: isMobile ? 30 : 60,
        }}
        separation={{
          siblings: isMobile ? 1 : 1.7,
          nonSiblings: isMobile ? 1.2 : 2.2,
        }}
        translate={{
          x: isMobile ? 80 : 150,
          y: isMobile ? 180 : 350,
        }}
        renderCustomNodeElement={renderCustomNodeElement}
        pathClassFunc={() =>
          "stroke-white stroke-[2px]  transition-all duration-300"
        }
        zoom={isMobile ? 0.6 : 0.5}
        enableLegacyTransitions={true}
        transitionDuration={800}
      />
    </div>
  );
};

export default CompanyMindMap;
