import React from 'react';
import 'leaflet/dist/leaflet.css';
import MapCard from '../../component/dashboad/MapCard';
import LiveFeed from '../../component/dashboad/Livefeed';
import Searching from '../../component/input/Searching';
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { BiBell } from 'react-icons/bi';
import ProfileRoundedImg from '../../component/cards/ProfileRoundedImg';
import IncidentVolumeChart from '../../component/dashboad/IncidentVolumeChart';
import IncidentCard from '../../component/dashboad/IncidentCard';
import ResponseTimeChart from '../../component/dashboad/ResponseTimeChart';
import ClosureRateChart from '../../component/dashboad/RateChart';
import AlertFeed from '../../component/dashboad/AlertFeed';
import IncidentTypeChart from '../../component/dashboad/IncidentTypeChart';
import RateChart from '../../component/dashboad/RateChart';
const HqDashboard = () => {
  const nigeriaCenter = [9.0820, 8.6753];

  return (
    <div className="relative flex-1 flex flex-col gap-4 p-2 pl-4 min-h-screen bg-gray-200 ">
      <div className="flex justify-between items-center p-3 border-b border-[#00A859]/30 bg-white dark:bg-[#111a22]">
      {/* Left: System Status */}
      <div className="flex items-center gap-2">
        <IoCheckmarkCircleOutline className="text-[#00A859] text-xl" />
        <h3 className="text-sm font-semibold text-[#111a22] dark:text-white">
          All Systems Operational
        </h3>
      </div>

      {/* Right: Search, Notification, Profile */}
      <div className="flex items-center gap-3 pr-2">
        <Searching
          pHolder="Search incidents, resources, locations"
          cName="bg-[#F9F9F9] dark:bg-[#111a22] text-[#111a22] dark:text-white border border-gray-300 dark:border-[#324d67] rounded-md px-3 py-1 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-[#FFD100]"
        />

        {/* Notification bell */}
        <div className="relative">
          <BiBell className="text-[#111a22] dark:text-[#FFD100] text-3xl p-1 cursor-pointer hover:text-[#00A859] transition-colors" />
          {/* Notification dot */}
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#FFD100]"></span>
        </div>

        {/* Profile */}
        <ProfileRoundedImg />
       </div>
     </div>
    {/* incidents cards*/}

    <div className='flex gap-5 flex-wrap'>
       <IncidentCard title='Total Active' sub_title='Incident' count={124} projection={3} />
       <IncidentCard title='Resources' sub_title='Deployed' count={897} projection={3} />
       <IncidentCard title='High Priority' sub_title='Alerts' count={23} projection={3} />
       <IncidentCard title='Response Time' sub_title='Avg.' count={124} projection={3} />
       <IncidentCard title='Total Active' sub_title='Incident' count={124} projection={3} />
    </div>
     {/*  map */}
    <div className="flex gap-3 rounded-lg h-[500px]">
        <div className="flex-4 flex flex-col p-1">
           <MapCard coordinate={nigeriaCenter} />
        </div>
         <div className='flex-2'>
          <AlertFeed alerts={alertData} title='Inter-Zonal Alert Feed' />
        </div>      
    </div>
    
    <div className='flex'>
      <div className="flex-1 h-auto flex items-start text-white flex items-center justify-start">
        <LiveFeed />
      </div>
      <div className='flex gap-2 h-auto'>
        <RateChart data={closureData} darkMode={false} title='Acitive Rate' perc={89} />
        <RateChart data={activeData} darkMode={false} title='Closure Rate' perc={40} />
        </div>
    </div>

    <div className='grid grid-cols-3 gap-2 '>
      <div className='flex-1 '>
        <IncidentTypeChart data={sampleData} />
      </div>
       <div className='flex-1'>
          <ResponseTimeChart data={responseData} title='Average Response Time by Zone' />
        </div>
       
      

    </div>
      {/* chat*/}
      <div className='flex justify-start flex-wrap gap-2 h-auto '>
         <div className='flex-1 bg-white rounded'>
            <IncidentVolumeChart data={incidentData} />
         </div>
        
        
      </div>

    </div>
  );
};

export default HqDashboard;

const incidentData = [
  { zone: "Zone A", volume: 12 },
  { zone: "Zone B", volume: 20 },
  { zone: "Zone C", volume: 8 },
  { zone: "Zone D", volume: 15 }
];

const responseData = [
  { zone: "Zone A", time: 4.2 },
  { zone: "Zone B", time: 5.1 },
  { zone: "Zone C", time: 3.8 },
  { zone: "Zone D", time: 6.0 },
  { zone: "Zone E", time: 4.6 },
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
  {
    type: "critical",
    message: "Zone-C requests immediate air support. [Critical]",
    time: "2 mins ago",
  },
  {
    type: "warning",
    message: "Low medical supplies reported in Zone-A shelters.",
    time: "15 mins ago",
  },
  {
    type: "info",
    message: "Task Force TF-19B has arrived at destination in Zone-B.",
    time: "32 mins ago",
  },
  {
    type: "info",
    message: "Weather advisory issued for coastal areas in Zone-D.",
    time: "1 hour ago",
  },
];

// type incident
const sampleData = [
  { type: "Fire", count: 15 },
  { type: "Spill", count: 9 },
  { type: "Technical", count: 6 },
  { type: "Security", count: 11 },
  { type: "Electrical", count: 7 },
];
