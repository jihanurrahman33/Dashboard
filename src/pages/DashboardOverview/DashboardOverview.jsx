import React from "react";
import { LuPhone } from "react-icons/lu";
import { FaRobot } from "react-icons/fa6";
import { BiTransfer } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import { MdOutlineCancel } from "react-icons/md";
import { RiTimer2Line } from "react-icons/ri";
import StatCard from "../../components/StatCard/StatCard";
import CallTrendChart from "./CallTrendChart";
import RecentActivity from "./RecentActivity";
import TopPairRequest from "./TopPairRequest";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchDashboardData = async () => {
  const { data } = await axios.get("/dashboardData.json");
  return data;
};

const DashboardOverview = () => {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: fetchDashboardData,
  });

  const getIcon = (type) => {
    switch (type) {
      case "LuPhone": return <LuPhone size={26} />;
      case "FaRobot": return <FaRobot size={26} />;
      case "BiTransfer": return <BiTransfer size={26} />;
      case "SlCalender": return <SlCalender size={26} />;
      case "MdOutlineCancel": return <MdOutlineCancel size={26} />;
      case "RiTimer2Line": return <RiTimer2Line size={26} />;
      default: return null;
    }
  };

  return (
    <div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-32 bg-gray-700/20 rounded-2xl animate-pulse"></div>
            ))
          : dashboardData?.metrics?.map((card, index) => (
              <StatCard 
                key={index} 
                cardData={{...card, icon: getIcon(card.iconType)}} 
              />
            ))
        }
      </div>
      <CallTrendChart 
        totalCalls={dashboardData?.callTrends?.total} 
        period={dashboardData?.callTrends?.period}
        isLoading={isLoading} 
      />
      <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mt-6">
        <RecentActivity />
        <TopPairRequest 
          data={dashboardData?.topRepairs} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
};

export default DashboardOverview;
