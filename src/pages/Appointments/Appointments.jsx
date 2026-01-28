import React, { useState } from "react";
import {
  MdCalendarToday,
  MdCheckCircle,
  MdErrorOutline,
  MdContentCopy,
  MdChevronLeft,
  MdChevronRight,
  MdCheck,
} from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAppointmentStore from "../../stores/useAppointmentStore";

const fetchAppointments = async () => {
  const { data } = await axios.get("/appointmentsData.json");
  return data;
};

const Appointments = () => {
  const { currentPage, setCurrentPage } = useAppointmentStore();
  const itemsPerPage = 10;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        "https://techstore.com/book?id=store123",
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const {
    data: appointments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: fetchAppointments,
  });

  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAppointments = appointments.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="text-slate-900 dark:text-slate-100 font-['Inter']">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-primary shadow-sm">
            <div className="flex items-center space-x-2 text-slate-500 mb-4">
              <span className="text-[#3b82f6] text-xl">
                <MdCalendarToday />
              </span>
              <span className="text-sm font-medium">Total Booked</span>
            </div>
            <div className="text-3xl text-white mb-2">34</div>
            <div className="text-[#10b981] text-sm font-medium flex items-center">
              +8 this week
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-primary shadow-sm">
            <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 mb-4">
              <span className="text-[#10b981] text-xl">
                <MdCheckCircle />
              </span>
              <span className="text-sm font-medium">AI Booked</span>
            </div>
            <div className="text-3xl text-white mb-2">28</div>
            <div className="text-slate-500 dark:text-slate-400 text-sm">
              82% of total
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-primary shadow-sm">
            <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 mb-4">
              <span className="text-[#f59e0b] text-xl">
                <MdErrorOutline />
              </span>
              <span className="text-sm font-medium">Pending</span>
            </div>
            <div className="text-3xl text-white mb-2">3</div>
            <div className="text-slate-500 dark:text-slate-400 text-sm">
              Awaiting confirmation
            </div>
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-b from-[#1A1A2E] to-[#16213E] shadow-sm">
          <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">
            Booking Link
          </label>
          <div className="flex gap-4">
            <div className="relative flex-grow">
              <input
                className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-300 focus:ring-[#3b82f6] focus:border-[#3b82f6] transition-all outline-none border"
                readOnly
                type="text"
                value="https://techstore.com/book?id=store123"
              />
            </div>
            <button
              onClick={handleCopy}
              className="flex  items-center justify-between gap-4 rounded-2xl p-4 backdrop-blur-lg ring-inset ring-1 ring-white/40 shadow-[inset_0_0_35px_rgba(255,255,255,0.45)] text-white before:content-[''] before:absolute before:inset-0 before:bg-[url('/navBg.png')] before:bg-repeat before:opacity-40 before:z-0 after:content-[''] after:absolute after:inset-0 after:bg-white/20 after:z-0 cursor-pointer hover:bg-white/10 transition-colors z-10 relative overflow-hidden"
            >
              <span className="sm:text-sm md:text-lg lg:text-xl">
                {copied ? (
                  <MdCheck className="text-emerald-400" />
                ) : (
                  <MdContentCopy />
                )}
              </span>
              <span>{copied ? "Copied!" : "Copy Link"}</span>
            </button>
          </div>
        </div>
        <div className="rounded-2xl bg-primary shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-white text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">
                    Client Name
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">
                    Client Phone
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">
                    Client Mail
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">
                    Device
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">
                    Repair Type
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">
                    Date
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">
                    Slot No
                  </th>
                  <th className="px-6 py-4 font-semibold whitespace-nowrap">
                    Start Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#162F61]">
                {isLoading ? (
                  Array.from({ length: 10 }).map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td colSpan="8" className="px-6 py-4">
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                      </td>
                    </tr>
                  ))
                ) : isError ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-4 text-center text-red-500"
                    >
                      Error fetching data
                    </td>
                  </tr>
                ) : (
                  currentAppointments.map((item, index) => (
                    <tr key={index} className="transition-colors">
                      <td className="px-6 py-4 text-[#3b82f6] font-medium whitespace-nowrap">
                        {item.clientName}
                      </td>
                      <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                        {item.clientPhone}
                      </td>
                      <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                        {item.clientMail}
                      </td>
                      <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                        {item.device}
                      </td>
                      <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                        {item.repairType}
                      </td>
                      <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                        {item.slotNo}
                      </td>
                      <td className="px-6 py-4 text-slate-400 font-medium whitespace-nowrap">
                        {item.startTime}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-6 border-t border-[#162F61] flex items-center justify-center">
            <nav
              aria-label="Pagination"
              className="flex items-center space-x-2"
            >
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center cursor-pointer"
              >
                <span className="text-lg mr-1">
                  <MdChevronLeft />
                </span>
                <span>Previous</span>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors cursor-pointer ${
                      currentPage === page
                        ? "bg-[#3b82f6] text-white"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg text-[#3b82f6] hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center font-medium cursor-pointer"
              >
                <span>Next</span>
                <span className="text-lg ml-1">
                  <MdChevronRight />
                </span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
