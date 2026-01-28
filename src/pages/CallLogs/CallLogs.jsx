
import React, { useEffect, useState, useMemo } from "react";
import {
  MdSearch,
  MdExpandMore,
  MdCall,
  MdSchedule,
  MdCheckCircle,
  MdErrorOutline,
  MdPlayCircle,
  MdDescription,
} from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useCallLogStore from "../../stores/useCallLogStore";

const fetchCallLogs = async () => {
  const { data } = await axios.get("/callLogsData.json");
  return data;
};

const CallLogs = () => {
  const { selectedCallId, setSelectedCallId } = useCallLogStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All Type");
  const [filterIssue, setFilterIssue] = useState("All Issues");
  const [filterDate, setFilterDate] = useState("All Time");

  const {
    data: callLogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["callLogs"],
    queryFn: fetchCallLogs,
  });

  // Unique values for dropdowns
  const uniqueTypes = useMemo(() => {
    return ["All Type", ...new Set(callLogs.map((log) => log.resolution))];
  }, [callLogs]);

  const uniqueIssues = useMemo(() => {
    return ["All Issues", ...new Set(callLogs.map((log) => log.category))];
  }, [callLogs]);

  // Filter Logic
  const filteredLogs = useMemo(() => {
    return callLogs.filter((log) => {
      const matchesSearch =
        log.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.status.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        filterType === "All Type" || log.resolution === filterType;
      
      const matchesIssue =
        filterIssue === "All Issues" || log.category === filterIssue;

      // Date filtering (mock logic for demonstration as data is static)
      const matchesDate = filterDate === "All Time" || true; 

      return matchesSearch && matchesType && matchesIssue && matchesDate;
    });
  }, [callLogs, searchQuery, filterType, filterIssue, filterDate]);

  // Default to selecting the first filtered log if the current selection is hidden
  // Default to selecting the first filtered log if the current selection is hidden
  useEffect(() => {
    if (filteredLogs.length > 0) {
       const isSelectedVisible = filteredLogs.find(l => l.id === selectedCallId);
       if (!isSelectedVisible) {
           if (selectedCallId !== filteredLogs[0].id) {
               setSelectedCallId(filteredLogs[0].id);
           }
       }
    } else {
        if (selectedCallId !== null) {
            setSelectedCallId(null);
        }
    }
  }, [filteredLogs, selectedCallId, setSelectedCallId]);

  const selectedCall = callLogs.find((log) => log.id === selectedCallId);

  return (
    <div className="text-white font-['Inter']">
      <div className="max-w-[1440px] mx-auto p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <MdSearch size={20} />
            </span>
            <input
              className="w-full bg-primary border-none rounded-2xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-slate-400 shadow-sm"
              placeholder="Search by phone number, issue type..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto overflow-x-auto">
            {/* Filter Type */}
            <div className="relative">
              <select
                className="appearance-none bg-primary text-white pl-4 pr-10 py-3 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer min-w-[140px]"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                {uniqueTypes.map((type) => (
                  <option key={type} value={type} className="bg-slate-800">
                    {type}
                  </option>
                ))}
              </select>
              <MdExpandMore
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white"
              />
            </div>

            {/* Filter Issue */}
            <div className="relative">
              <select
                className="appearance-none bg-primary text-white pl-4 pr-10 py-3 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer min-w-[140px]"
                value={filterIssue}
                onChange={(e) => setFilterIssue(e.target.value)}
              >
                {uniqueIssues.map((issue) => (
                  <option key={issue} value={issue} className="bg-slate-800">
                    {issue}
                  </option>
                ))}
              </select>
              <MdExpandMore
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white"
              />
            </div>

            {/* Filter Date (Static for now) */}
            <div className="relative">
              <select
                className="appearance-none bg-primary text-white pl-4 pr-10 py-3 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer min-w-[140px]"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              >
                <option value="All Time" className="bg-slate-800">All Time</option>
                <option value="Today" className="bg-slate-800">Today</option>
                <option value="Yesterday" className="bg-slate-800">Yesterday</option>
              </select>
              <MdExpandMore
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white"
              />
            </div>
          </div>
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <section className="lg:col-span-5 bg-primary rounded-2xl overflow-hidden flex flex-col h-[calc(100vh-160px)] shadow-sm">
            <div className="p-5 border-b border-[#192D71]">
              <h2 className="text-lg font-semibold text-white">Call List <span className="text-slate-400 text-sm font-normal ml-2">({filteredLogs.length})</span></h2>
            </div>
            <div className="overflow-y-auto custom-scrollbar flex-1">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="p-4 border-b border-[#192D71] animate-pulse">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="w-10 h-10 rounded-lg bg-slate-700"></div>
                       <div className="space-y-2 flex-1">
                         <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                         <div className="h-3 bg-slate-700 rounded w-1/3"></div>
                       </div>
                    </div>
                  </div>
                ))
              ) : isError ? (
                <div className="p-4 text-center text-red-500">Error loading call logs</div>
              ) : filteredLogs.length === 0 ? (
                <div className="p-8 text-center text-slate-400 flex flex-col items-center">
                   <MdSearch size={48} className="mb-2 opacity-20" />
                   <p>No calls found matching your filters.</p>
                </div>
              ) : (
                filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    onClick={() => setSelectedCallId(log.id)}
                    className={`p-4 border-b border-[#192D71] hover:bg-slate-800/30 cursor-pointer transition-colors ${
                      selectedCallId === log.id ? "bg-slate-800/50" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                          <MdCall size={20} />
                        </div>
                        <div>
                          <div className="font-semibold text-white">
                            {log.phone}
                          </div>
                          <div className="text-xs text-slate-400">
                            {log.date} • {log.time}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold border uppercase tracking-wide ${log.resolutionColor}`}
                      >
                        {log.resolution}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 items-center mt-3">
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <MdSchedule size={14} />
                        {log.duration}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        {log.resolution === "Dropped" ? (
                          <MdErrorOutline size={14} />
                        ) : (
                          <MdCheckCircle size={14} />
                        )}
                        {log.status}
                      </div>
                      <span className="px-2 py-0.5 rounded bg-slate-700/50 text-slate-300 text-[10px] font-medium border border-slate-600/30">
                        {log.category}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="lg:col-span-7 bg-primary rounded-2xl overflow-hidden flex flex-col h-[calc(100vh-160px)] shadow-sm">
            <div className="p-5 border-b border-[#192D71]">
              <h2 className="text-lg font-semibold text-white">Call Details</h2>
            </div>
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-8">
              {isLoading ? (
                 <div className="space-y-6 animate-pulse">
                   <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                     <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                     <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                     <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                     <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                   </div>
                   <div className="h-12 bg-slate-700 rounded-xl w-full"></div>
                   <div className="h-40 bg-slate-700 rounded-xl w-full"></div>
                 </div>
              ) : !selectedCall ? (
                 <div className="text-slate-400 text-center mt-10">Select a call log to view details</div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                    <div>
                      <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                        Phone Number
                      </div>
                      <div className="text-white font-semibold">
                        {selectedCall.phone}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                        Duration
                      </div>
                      <div className="text-white font-semibold">{selectedCall.duration}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                        Date & Time
                      </div>
                      <div className="text-white font-semibold">
                        {selectedCall.date} {selectedCall.time}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                        Issue Type
                      </div>
                      <div className="text-white font-semibold">{selectedCall.category}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                        Call Type
                      </div>
                      <div className="mt-1">
                        <span className={`px-2.5 py-1 rounded text-xs font-semibold border uppercase ${selectedCall.resolutionColor}`}>
                          {selectedCall.resolution}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                        Outcome
                      </div>
                      <div className="text-white font-semibold">{selectedCall.status}</div>
                    </div>
                  </div>

                  <button className="w-full py-3 px-4 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-xl flex items-center justify-center gap-2 text-purple-400 transition-colors font-medium cursor-pointer">
                    <MdPlayCircle size={24} />
                    Play Audio Recording
                  </button>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <MdDescription size={20} />
                      <h3>Conversation Transcript</h3>
                    </div>
                    <div className="bg-[#0a1128]/40 rounded-xl p-5 space-y-6 text-sm leading-relaxed border border-[#192D71]">
                      {selectedCall.transcript && selectedCall.transcript.map((line, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className={`${line.color} font-bold uppercase text-[10px] tracking-widest`}>
                            {line.speaker}:
                          </div>
                          <div className="text-slate-300">
                            {line.text}
                          </div>
                        </div>
                      ))}
                      {!selectedCall.transcript && (
                        <div className="text-slate-500 italic">No transcript available for this call.</div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};


export default CallLogs;
