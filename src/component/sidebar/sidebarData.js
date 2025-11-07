import { 
  FiHome,
  FiClipboard,
  FiEdit,
  FiFileText,
  FiFilePlus,
  FiTruck,
  FiUserCheck,
  FiUpload,
  FiBarChart2,
  FiBell,
  FiSettings,
  FiSearch,
  FiGlobe,
  FiAlertCircle,
  FiUser,
  FiArchive,
  
} from "react-icons/fi";
import { RiTeamFill } from 'react-icons/ri'
import { MdOutlineDashboard } from "react-icons/md";


// SidebarData.js

export const sidebarData = {
  agent : [
    { label: "Notifications", icon: FiBell, path: "/notifications" },
    { label: "Incidents", icon: FiClipboard, path: "/incidents" },
    { label: "Settings", icon: FiSettings, path: "/settings" },
    { label: "Profile ", icon: FiUser, path: "/profile" },
  ],
  agencies : [
    { label: "Dashboard", icon: MdOutlineDashboard, path: "/dashboard" },
    { label: "Incident Alerts", icon: FiEdit, path: "/incidents-alerts" ,  },
    { label: "Incidents", icon: FiClipboard, path: "/incidents" },
    { label: "Notifications", icon: FiBell, path: "/notifications" , count: "Notify"},
    { label: "Field Agents", icon: FiUserCheck, path: "/field-agents" },
    { label: "Profile", icon: FiSettings, path: "/profile" },
    { label: "Profile ", icon: FiUser, path: "/profile" },
  ],
  state: [
    { label: "Dashboard", icon: MdOutlineDashboard, path: "/dashboard" },
    { label: "Incidents", icon: FiClipboard, path: "/incidents" },
    { label: "Notifications", icon: FiBell, path: "/notifications", count: "notify" },
    { label: "Field Agents", icon: FiUserCheck, path: "/field-agents" },
    { label: "Settings", icon: FiSettings, path: "/settings" },
     { label: "Profile ", icon: FiUser, path: "/profile" },
  ],

  zonal: [
    { label: "Dashboard", icon: MdOutlineDashboard, path: "/dashboard" },
    { label: "Incidents", icon: FiClipboard, path: "/incidents" },
    { label: "Notifications", icon: FiBell, path: "/notifications" },
    { label: "Field Agents", icon: FiUserCheck, path: "/field-agents" },
    { label: "Settings", icon: FiSettings, path: "/settings" },
     { label: "Profile ", icon: FiUser, path: "/profile" },
  ],

  central: [
    { label: "Dashboard", icon:MdOutlineDashboard, path: "/dashboard" },
    { label: "Incidents", icon: FiAlertCircle, path: "/incidents", badgeKey: "incidentCount", },
    { label: "Notifications", icon: FiBell, path: "/notifications", count: "notify", badgeKey: "unreadNotifications", },
    { label: "Agencies", icon: FiTruck, path: "/agency" },
    { label: "Field Agents", icon: FiUserCheck, path: "/field-agents" },
    { label: "Settings", icon: FiSettings, path: "/settings" },
    { label: "Profile ", icon: FiUser, path: "/profile" },
  ],

   hq: [
    { label: "Dashboard", icon: MdOutlineDashboard, path: "/dashboard" },
    { label: "All Incidents", icon: FiClipboard, path: "/incidents" },
    { label: "Agencies", icon: FiTruck, path: "/agencies" },
    { label: "Notifications", icon: FiBell, path: "/notifications" },
    { label: "Field Agents", icon: FiUserCheck, path: "/field-agents" },
    { label: "Administration", icon: FiSettings, path: "/admin" },
  ],
};




