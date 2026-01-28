import React from "react";

const TopPairRequest = ({ data, isLoading }) => {
  return (
    <div className="bg-primary p-6 rounded-2xl border border-[#192D71] shadow-sm flex-1 w-full">
      <h2 className="text-xl font-semibold mb-8 text-white">
        Top Repair Requests
      </h2>
      <div className="space-y-8">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
             <div key={i} className="space-y-3 animate-pulse">
                <div className="flex justify-between items-center">
                   <div className="h-4 bg-slate-700 rounded w-1/3"></div>
                   <div className="h-4 bg-slate-700 rounded w-1/6"></div>
                </div>
                <div className="w-full bg-[#162447] rounded-full h-2.5">
                   <div className="bg-slate-700 h-full rounded-full w-1/2"></div>
                </div>
             </div>
          ))
        ) : (
          data?.map((item, index) => (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-slate-200">
                  {item.name}
                </span>
                <span className="text-slate-400 font-medium">
                  {item.count} requests
                </span>
              </div>
              <div className="w-full bg-[#162447] rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: item.width }}
                ></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopPairRequest;
