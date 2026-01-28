import { createBrowserRouter } from "react-router";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardOverview from "../pages/DashboardOverview/DashboardOverview";
import CallLogs from "../pages/CallLogs/CallLogs";
import Appointments from "../pages/Appointments/Appointments";
import Settings from "../pages/Settings/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        element: <DashboardOverview />,
        handle: { title: "Dashboard Overview" },
      },
      {
        path: "call-logs",
        element: <CallLogs />,
        handle: { title: "Call Logs" },
      },
      {
        path: "appointments",
        element: <Appointments />,
        handle: { title: "Appointments" },
      },
      {
        path: "settings",
        element: <Settings />,
        handle: { title: "Settings" },
      },
    ],
  },
]);
export default router;
