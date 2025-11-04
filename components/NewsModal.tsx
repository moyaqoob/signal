import Link from "next/link";

type MarketNewsArticle = {
  id: number;
  headline: string;
  summary: string;
  source: string;
  url: string;
  datetime: number;
  category: string;
  related: string;
  image?: string;
};

const NewsModal = ({id,headline,summary,source,url,datetime,category,related}:MarketNewsArticle) => {
  return (
    <div key={id} className="w-sm h-full p-5 rounded-xl bg-[#141414]  ">
      <div className="relative space-y-2">
        <p className="text-md font-sans p-2 rounded-lg w-fit bg-green-700/20">
          {source}
        </p>
        <div className="font-medium text-xl">{headline}</div>
        <div className="flex items-center font-medium text-sm text-gray-300 space-x-3">
          <p>The Wall Street Journal</p>

          {/* Dot separator */}
          <span className="w-2 h-2 bg-gray-400 "></span>

          <p>{datetime} </p>
        </div>

        <div className="text-sm font-medium text-gray-400 leading-6">
         {summary}
        </div>
        <Link href={url} className="flex items-center gap-1 cursor-pointer">
          <p className="text-md text-[#FDD458]">Read More</p>
          <span className="text-[#FDD458] text-lg">→</span>
        </Link>
      </div>
    </div>
  );
};

export default NewsModal;
