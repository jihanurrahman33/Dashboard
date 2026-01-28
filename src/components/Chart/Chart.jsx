import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CallTrendsChart() {
  const chartData = [
    { day: "Mon", calls: 45 },
    { day: "Tue", calls: 62 },
    { day: "Wed", calls: 58 },
    { day: "Thu", calls: 72 },
    { day: "Fri", calls: 88 },
    { day: "Sat", calls: 95 },
    { day: "Sun", calls: 60 },
  ];
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* Gradient */}
          <defs>
            <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f7cff" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#4f7cff" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="day"
            stroke="#94a3b8"
            tickLine={true}
            axisLine={true}
          />
          <YAxis stroke="#94a3b8" tickLine={true} axisLine={true} />

          <Tooltip
            contentStyle={{
              background: "#0f172a",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
            }}
            cursor={{ stroke: "#4f7cff", strokeDasharray: "3 3" }}
          />

          <Area
            type="monotone"
            dataKey="calls"
            stroke="#4f7cff"
            strokeWidth={3}
            fill="url(#colorCalls)"
            dot={false}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
