import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCallLogs = async () => {
  const { data } = await axios.get("/callLogsData.json");
  return data;
};

const RecentActivity = () => {
  const { data: callLogs = [], isLoading } = useQuery({
    queryKey: ["callLogs"],
    queryFn: fetchCallLogs,
  });

  const recentActivity = useMemo(() => {
    return callLogs.slice(0, 5); 
  }, [callLogs]);

  // Helper to map log data to activity content (simplified mapping)
  const getActivityContent = (log) => {
    let color = "bg-blue-500";
    let shadow = "shadow-[0_0_8px_rgba(59,130,246,0.4)]";
    let text = `${log.resolution} - ${log.category}`;

    if (log.resolution === "Appointment") {
      color = "bg-emerald-500";
      shadow = "shadow-[0_0_8px_rgba(16,185,129,0.4)]";
      text = `Appointment booked for ${log.category} repair`;
    } else if (log.resolution === "Warm Transfer") {
      color = "bg-orange-500";
      shadow = "shadow-[0_0_8px_rgba(245,158,11,0.4)]";
      text = `Warm transfer to technician - ${log.category} issue`;
    } else if (log.resolution === "Dropped") {
      color = "bg-red-500";
      shadow = "shadow-[0_0_8px_rgba(239,68,68,0.4)]";
      text = `Call dropped after ${log.duration}`;
    }

    return { color, shadow, text };
  };

  return (
    <div className="bg-primary p-6 rounded-2xl border border-[#192D71] shadow-sm flex-1 w-full">
      <h2 className="text-xl font-semibold mb-6 text-white">
        Recent Activity
      </h2>
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
             <div key={i} className="bg-slate-800/30 p-4 rounded-xl flex items-start gap-4 animate-pulse">
                <div className="mt-1.5 h-2.5 w-2.5 rounded-full bg-slate-600 flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-600 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-600 rounded w-1/4"></div>
                </div>
             </div>
          ))
        ) : (
          recentActivity.map((log) => {
            const { color, shadow, text } = getActivityContent(log);
            return (
              <div key={log.id} className="bg-slate-800/30 p-4 rounded-xl flex items-start gap-4 transition-colors">
                <div className={`mt-1.5 h-2.5 w-2.5 rounded-full ${color} ${shadow} flex-shrink-0`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-200">
                    {text}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {/* Mock relative time based on log time for demo */}
                    {Math.floor(Math.random() * 60)} min ago
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
