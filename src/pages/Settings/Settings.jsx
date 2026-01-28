import React, { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Settings = () => {
  return (
    <div className="text-white font-['Inter']">
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-10 md:py-12">
        <div className="flex gap-6 md:gap-10 mb-10 md:mb-16 border-b border-slate-700/50 pb-2 md:pb-0 md:border-b-0 overflow-x-auto">
          <button className="text-base md:text-lg font-medium border-b-2 border-transparent hover:text-[#A855F7] transition-colors text-white whitespace-nowrap">
            Profile
          </button>
          <button className="text-base md:text-lg font-medium border-b-2 border-transparent text-slate-400 hover:text-[#A855F7] transition-colors whitespace-nowrap">
            Password Settings
          </button>
        </div>
        <div className="space-y-6">
          <h2 className="text-lg md:text-xl font-medium text-white">
            Profile Image
          </h2>
          <div className="flex items-center gap-6">
            <div className="relative w-20 h-20 md:w-24 md:h-24">
              <div className="w-full h-full rounded-full overflow-hidden shadow-[0_0_0_4px_#A855F7]">
                <img
                  alt="Jane D. profile photo"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_PLU_3VuLAhv59XGE06TFUuQ-lnYr4q0dR-zvLCKW73B-W1iZumGT8IycWKJsV_kSCa9EYiIPzfVNFRsQKo2h3ruGvCgyPf2lPIWYgkgl4c2F7aD2siSXMU6wMkkp9PKbprY0cT36AQVucJxaLdMOG6oYjY3E2GSNDXxWqpeQRD4U34qNLJOCtqCzcSzbwIRPFXII1_EmRzbev5MuNyuRqHLYoIPiK56n9M7YiYZBgYB0lV0k_7zXy2PgaZIWJ9z6NoKC3psVZyY"
                />
              </div>
            </div>
            <button className="px-4 py-1.5 bg-slate-700/40 hover:bg-slate-600 border border-[#192D71] rounded-full text-xs font-medium text-white shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all backdrop-blur-sm cursor-pointer">
              Edit Profile
            </button>
          </div>
        </div>
        <div className="mt-8 md:mt-12 max-w-lg">
          <div className="flex flex-col md:flex-row md:items-center py-4 md:py-5 border-b border-[#192D71] gap-1 md:gap-0">
            <span className="w-full md:w-1/3 text-base md:text-lg font-medium text-white">
              Full Name:
            </span>
            <span className="w-full md:w-2/3 text-base md:text-lg text-slate-300">
              Jane D.
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center py-4 md:py-5 border-b border-[#192D71] gap-1 md:gap-0">
            <span className="w-full md:w-1/3 text-base md:text-lg font-medium text-white">
              Email:
            </span>
            <span className="w-full md:w-2/3 text-base md:text-lg text-slate-300 break-all">
              jane@gmail.com
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center py-4 md:py-5 border-b border-[#192D71] gap-1 md:gap-0">
            <span className="w-full md:w-1/3 text-base md:text-lg font-medium text-white">
              Store Name:
            </span>
            <span className="w-full md:w-2/3 text-base md:text-lg text-slate-300">
              Ubreakfix Store
            </span>
          </div>
          <div className="flex flex-col md:flex-row items-start py-4 md:py-5 gap-1 md:gap-0">
            <span className="w-full md:w-1/3 text-base md:text-lg font-medium text-white pt-0.5">
              Store Address:
            </span>
            <span className="w-full md:w-2/3 text-base md:text-lg text-slate-300 leading-relaxed">
              123 Main Street,
              <br />
              New York, NY 10001
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
