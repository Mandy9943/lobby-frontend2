interface CrunchbaseDisplayProps {
  data: {
    url: string;
    title: string;
  };
}

export default function CrunchbaseDisplay({ data }: CrunchbaseDisplayProps) {
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
                src="https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_2/unj63uuxb8ooxctihr1w"
                alt="Crunchbase Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-medium text-slate-200 group-hover:text-brand-default transition-colors">
                {orgName}
              </span>
              <span className="text-sm text-slate-400">on Crunchbase</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
