import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoImg from "/logo.svg";
import { NavLink, Outlet, useLocation, useMatches } from "react-router";
import { RiHome5Fill } from "react-icons/ri";
import { IoCallOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { GoGear } from "react-icons/go";
import { RiLogoutBoxLine } from "react-icons/ri";

const DashboardLayout = () => {
  const matches = useMatches();

  useEffect(() => {
    const currentRoute = matches[matches.length - 1];
    const title = currentRoute?.handle?.title;

    if (title) {
      document.title = title;
    }
  }, [matches]);
  const location = useLocation();
  const navTitle =
    location.pathname === "/"
      ? "Dashboard Overview"
      : location.pathname
          .slice(1)
          .replace("-", " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const baseClasses =
    "relative overflow-hidden flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-out";

  const activeClasses = `
  backdrop-blur-lg
  ring-inset ring-1 ring-white/40
  shadow-[inset_0_0_35px_rgba(255,255,255,0.45)]
  text-white

  before:content-['']
  before:absolute
  before:inset-0
  before:bg-[url('/navBg.png')]
  before:bg-repeat
  before:opacity-40
  before:z-0

  after:content-['']
  after:absolute
  after:inset-0
  after:bg-white/20
  after:z-0
`;

  const links = (
    <>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `${baseClasses} ${isActive ? activeClasses : ""}`
        }
      >
        <RiHome5Fill size={25} />
        <p>Dashboard Overview</p>
      </NavLink>
      <NavLink
        to={"call-logs"}
        className={({ isActive }) =>
          `${baseClasses} ${isActive ? activeClasses : ""}`
        }
      >
        <IoCallOutline size={25} />
        <p>Call Logs</p>
      </NavLink>
      <NavLink
        to={"appointments"}
        className={({ isActive }) =>
          `${baseClasses} ${isActive ? activeClasses : ""}`
        }
      >
        <SlCalender size={25} />
        <p>Appointments</p>
      </NavLink>
      <NavLink
        to={"settings"}
        className={({ isActive }) =>
          `${baseClasses} ${isActive ? activeClasses : ""}`
        }
      >
        <GoGear size={25} />
        <p>Settings</p>
      </NavLink>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-primary border-r-2 border-[#2B7FFF33] text-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        <div className="flex items-center justify-center p-4 h-40">
          <img width={80} src={logoImg} alt="Logo" className="h-14" />
        </div>

        <nav className="p-4 space-y-2 flex-1">{links}</nav>

        <div className="p-4 mb-6">
          <button
            className={`${baseClasses} w-full hover:bg-white/10 text-red-500`}
          >
            <RiLogoutBoxLine size={25} />
            <p>Logout</p>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Navigation */}
        <header className="bg-primary text-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
            <h2 className="font-bold sm:text-sm md:text-xl lg:text-2xl">
              {navTitle}
            </h2>

            <div className="flex items-center gap-4 ml-auto">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <div className="avatar">
                <div className="w-14 rounded-full">
                  <img src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?w=360" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-primary via-secondary to-primary min-h-[calc(100vh-64px)] text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
