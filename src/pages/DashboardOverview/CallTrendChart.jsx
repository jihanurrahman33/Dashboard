import React from "react";
import CallTrendsChart from "../../components/Chart/Chart";

const CallTrendChart = ({ totalCalls, period = "This Week", isLoading }) => {
  return (
    <div className="p-6 bg-primary mt-6 rounded-2xl border border-[#192D71] shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-white">Call Trends - {period}</h1>
          {isLoading ? (
            <div className="h-4 w-24 bg-slate-700/50 rounded animate-pulse mt-1"></div>
          ) : (
            <p className="text-sm text-slate-400 mt-1">Total: {totalCalls} Calls</p>
          )}
        </div>
        <div>
          <select defaultValue="This Week" className="appearance-none bg-slate-800 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 ml-auto cursor-pointer border border-[#192D71] text-sm hidden md:block">
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>
      </div>
      <div>
        <CallTrendsChart />
      </div>
    </div>
  );
};

export default CallTrendChart;
