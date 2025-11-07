import React from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarData } from "./sidebarData";
import logo from "../../assets/logo.png";

const Sidebar = ({ level, badges = {} }) => {
  const location = useLocation();
  const items = sidebarData[level] || [];
  if (!items.length) return null;

  return (
    <>
      {/* Fixed Sidebar on large screens */}
      <div className="hidden lg:flex flex-col w-54 h-screen bg-green-900 text-white fixed top-0 left-0">
        <div className="h-16 flex items-center gap-3 justify-start p-3">
          <img src={logo} alt="logo" width={40} height={40} />
          <h2 className="text-white font-bold text-xl">NMDPR</h2>
        </div>

        <ul className="flex-1 flex flex-col gap-1 w-full overflow-y-auto">
          {items.map((item, index) => {
            if (item.hideOnSidebar) return null;
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const badgeValue = item.badgeKey ? badges[item.badgeKey] : null;

            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded ${
                    isActive ? "bg-green-700" : "hover:bg-green-500/30"
                  }`}
                >
                  <Icon size={24} />
                  <span className="text-lg">{item.label}</span>
                  {badgeValue && (
                    <span className="ml-auto bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                      {badgeValue > 99 ? "99+" : badgeValue}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Fixed Bottom Tab on small/medium screens */}
      <div className="fixed bottom-0 left-0 w-full h-16 bg-green-900 text-white flex justify-around lg:hidden">
        {items.map((item, index) => {
          if (item.hideOnBottomTab) return null;
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const badgeValue = item.badgeKey ? badges[item.badgeKey] : null;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex flex-col items-center justify-center text-xs ${
                isActive ? "text-yellow-400" : "text-white"
              }`}
            >
              <div className="relative">
                <Icon size={24} />
                {badgeValue && (
                  <span className="absolute -top-1 -right-2 bg-yellow-400 text-black text-[10px] font-bold px-1 py-0.5 rounded-full">
                    {badgeValue > 99 ? "99+" : badgeValue}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
