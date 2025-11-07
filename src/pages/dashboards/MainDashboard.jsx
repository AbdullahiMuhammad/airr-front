import React from "react";
import 'leaflet/dist/leaflet.css';
import MapCard from '../../component/dashboad/MapCard';
import Searching from '../../component/input/Searching';
import { BiBell } from 'react-icons/bi';
import ProfileRoundedImg from '../../component/cards/ProfileRoundedImg';
import IncidentCard from '../../component/dashboad/IncidentCard';
import IncidentBreakdownCard from '../../component/dashboad/IncidentBreakdownCard';
import RateChart from '../../component/dashboad/RateChart';
import IncidentVolumeChart from '../../component/dashboad/IncidentVolumeChart';
import AlertFeed from '../../component/dashboad/AlertFeed';
import ResponseTimeChart from '../../component/dashboad/ResponseTimeChart';
import IncidentTypeChart from '../../component/dashboad/IncidentTypeChart';
import RecentMajorIncidents from '../../component/dashboad/RecentMajorIncidents';

const MainDashboard = () => {
  const northEastCenter = [10.8, 12.0];

  return (
    <div className="flex flex-col gap-4 p-2 min-h-full">
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b border-gray-300 bg-white">
        <h3 className="text-xl font-semibold text-[#111a22]">
          Zonal Coordinator Dashboard - North East
        </h3>

        <div className="flex items-center gap-3">
          <Searching
            pHolder="Search incidents, resources, locations"
            cName="bg-[#F9F9F9] text-[#111a22] border border-gray-300 rounded-md px-3 py-1 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-[#FFD100]"
          />

          {/* Notification */}
          <div className="relative">
            <BiBell className="text-[#111a22] text-3xl p-1 cursor-pointer hover:text-[#00A859]" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#FFD100]"></span>
          </div>

          <ProfileRoundedImg />
        </div>
      </div>

      {/* Incident Cards */}
      <div className="flex flex-wrap gap-5">
        <IncidentCard title='Total Active Incident' count={124} projection={3} />
        <IncidentCard title='Affected Population' sub_title='Deployed' count={897} projection={3} />
        <IncidentCard title='Resources Deployed' count={23} projection={3} />
        <IncidentCard title='High-Priority Alerts' count={4} projection={3} time="from last week" />
      </div>

      {/* Map + Alert Feed */}
      <div className="flex gap-3 rounded-lg h-[600px] flex-wrap">
        <div className="flex-3 bg-white flex flex-col">
          <MapCard coordinate={northEastCenter} />
        </div>

        <div className="flex-1 flex items-start text-white bg-green-400 justify-center">
          <AlertFeed alerts={alertData} title='Alerts & Escalation' />
        </div>
      </div>

      {/* Charts + Breakdown */}
      <div className="flex gap-2 flex-wrap">
        <div className="flex-2 gap-5 flex flex-col">
          <IncidentBreakdownCard incidents={sampleIncidents} />
          <div className="flex gap-2">
            <RateChart data={closureData} darkMode={false} title='Active Rate' perc={89} />
            <RateChart data={activeData} darkMode={false} title='Closure Rate' perc={40} />
          </div>
        </div>

        <div className="flex-1 flex gap-4 flex-col">
          <RecentMajorIncidents />
          <div className="bg-white rounded">
            <IncidentVolumeChart data={incidentData} />
          </div>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="flex gap-2 flex-wrap">
        <div className="flex-1">
          <IncidentTypeChart data={sampleData} />
        </div>
        <div className="flex-1">
          <ResponseTimeChart data={responseData} title='Average Response Time by States' />
        </div>
      </div>
    </div>
  );
};

// Sample Data
const incidentData = [
  { zone: "Zone A", volume: 12 },
  { zone: "Zone B", volume: 20 },
  { zone: "Zone C", volume: 8 },
  { zone: "Zone D", volume: 15 }
];
const responseData = [
  { zone: "Gombe", time: 4.2 },
  { zone: "Bauchi", time: 5.1 },
  { zone: "Yobe", time: 3.8 },
  { zone: "Borno", time: 6.0 },
  { zone: "Adamawa", time: 4.6 },
  { zone: "Taraba", time: 4.6 },
];
const closureData = [
  { zone: "Gombe", rate: 82 },
  { zone: "Bauchi", rate: 68 },
  { zone: "Yobe", rate: 74 },
  { zone: "Borno", rate: 90 },
  { zone: "Adamawa", rate: 74 },
  { zone: "Taraba", rate: 90 },
];
const activeData = [
  { zone: "Gombe", rate: 82 },
  { zone: "Bauchi", rate: 68 },
  { zone: "Yobe", rate: 74 },
  { zone: "Borno", rate: 90 },
  { zone: "Adamawa", rate: 74 },
  { zone: "Taraba", rate: 90 },
];
const alertData = [
  { type: "critical", message: "Borno requests immediate air support. [Critical]", time: "2 mins ago" },
  { type: "warning", message: "Low medical supplies reported in Taraba shelters.", time: "15 mins ago" },
  { type: "info", message: "Task Force TF-19B has arrived at destination in Gombe.", time: "32 mins ago" },
  { type: "info", message: "Weather advisory issued for coastal areas in Yobe.", time: "1 hour ago" },
];
const sampleData = [
  { type: "Fire", count: 15 },
  { type: "Spill", count: 9 },
  { type: "Technical", count: 6 },
  { type: "Security", count: 11 },
  { type: "Electrical", count: 7 },
];
const sampleIncidents = [
  { name: "Adamawa", total: 45, high: 12, medium: 20, low: 13 },
  { name: "Borno", total: 32, high: 4, medium: 14, low: 14 },
  { name: "Bauchi", total: 45, high: 12, medium: 20, low: 13 },
  { name: "Gombe", total: 32, high: 4, medium: 14, low: 14 },
  { name: "Taraba", total: 47, high: 8, medium: 25, low: 14 },
  { name: "Yobe", total: 45, high: 12, medium: 20, low: 13 },
];

export default MainDashboard;
