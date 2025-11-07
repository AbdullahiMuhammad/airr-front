import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../component/sidebar/Sidebar";

const badges = {
  incidentCount: 4,
  unreadNotifications: 100,
};

const Home = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex min-h-screen bg-gray-200">
      {/* Fixed Sidebar / Bottom Tab */}
      {user && <Sidebar level={user.level} badges={badges} />}

      {/* Main content */}
      <main className="flex-1 lg:ml-54 pb-20 lg:pb-4 overflow-y-auto">
        <Outlet /> {/* MainDashboard or other pages render here */}
      </main>
    </div>
  );
};

export default Home;
