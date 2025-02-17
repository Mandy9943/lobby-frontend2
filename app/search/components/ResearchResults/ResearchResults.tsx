import { isUrl } from "@/utils";
import ResearchTopic from "./ResearchTopic";
import ResearchWebsiteResults from "./ResearchWebsiteResults";

const ResearchResults = ({ query }: { query: string }) => {
  console.log(query);

  if (isUrl(query)) {
    return <ResearchWebsiteResults url={query} />;
  }

  return <ResearchTopic query={query} />;
};

export default ResearchResults;
