import React from "react";

const StatCard = ({ cardData }) => {
  const { title, icon, value, rate } = cardData;
  return (
    <div className="flex items-center justify-between p-6 bg-primary rounded-lg shadow-md text-white w-full h-auto min-h-[144px]">
      <div className="">
        <p className="text-xs text-gray-400">{title}</p>
        <h2 className="text-3xl my-2">{value}</h2>
        <p
          className={`text-sm ${rate.startsWith("+") ? "text-green-500" : "text-red-500"}`}
        >
          {rate}
        </p>
      </div>
      <div className={`p-4 rounded-2xl ${cardData.iconBg}`}>{icon}</div>
    </div>
  );
};

export default StatCard;
