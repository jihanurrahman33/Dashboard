import { FiPhoneCall, FiClock, FiCheckCircle } from "react-icons/fi";

export default function CallLogCard({ callLog }) {
  return (
    <div className="w-full bg-primary p-6">
      {/* Top */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          {/* Call Icon */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg">
            <FiPhoneCall className="text-white" size={26} />
          </div>

          {/* Number + Date */}
          <div className="space-y-1">
            <p className="text-white text-xl font-semibold">{callLog.phone}</p>
            <p className="text-white/50 text-sm">
              {callLog.date} • {callLog.time}
            </p>
          </div>
        </div>

        {/* Action */}
        <button className="px-6 py-2 rounded-full bg-blue-500/20 text-blue-300 ring-1 ring-blue-400/30 hover:bg-blue-500/30 transition">
          Appointment
        </button>
      </div>

      {/* Bottom */}
      <div className="flex items-center gap-6 mt-5 text-white/60">
        <span className="flex items-center gap-2">
          <FiClock size={18} />
          {callLog.duration}
        </span>

        <span className="flex items-center gap-2">
          <FiCheckCircle size={18} />
          {callLog.status}
        </span>

        <span className="px-4 py-1 rounded-lg bg-blue-500/20 text-blue-300 text-sm font-medium">
          {callLog.category}
        </span>
      </div>
    </div>
  );
}
