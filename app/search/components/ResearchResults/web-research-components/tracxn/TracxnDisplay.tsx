interface TracxnDisplayProps {
  data: {
    url: string;
    title: string;
  };
}

export default function TracxnDisplay({ data }: TracxnDisplayProps) {
  if (!data || !data.url) return null;

  // Extract organization name from title
  const orgName = data.title.split(" - ")[0];

  return (
    <div>
      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 border border-slate-800/50 hover:bg-slate-800/50 hover:border-slate-700/50 transition-all duration-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-lg p-2 flex-shrink-0">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMnv4-Pp4T35SPVgb1FUWBN2qmAgiWCELfFQ&s"
                alt="Tracxn Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-medium text-slate-200 group-hover:text-brand-default transition-colors">
                {orgName}
              </span>
              <span className="text-sm text-slate-400">on Tracxn</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
