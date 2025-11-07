import React from 'react';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet'; 
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FaFire, FaTint, FaCog, FaLightbulb } from 'react-icons/fa';
import { GiPoliceCar } from 'react-icons/gi';

const MapCard = ({coordinate}) => {


  // Convert React icons to Leaflet DivIcons
  const createDivIcon = (icon) => {
    return new L.DivIcon({
      html: `<div style="font-size: 24px;">${icon}</div>`,
      className: '', // remove default Leaflet styles
      iconSize: [30, 30],
      iconAnchor: [15, 30],
    });
  };

  return (
    <div className="flex-1 flex flex-col  h-full">
      {/* Map Section */}
      <div className="flex-1 h-full">
        <MapContainer center={coordinate} zoom={7} className="h-full w-full rounded-lg">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Main Nigeria marker */}
          <Marker position={coordinate}>
            <Popup>Nigeria</Popup>
          </Marker>

          {/* Incident markers */}
          {incidents.map((incident) => (
            <Marker
              key={incident.id}
              position={incident.position}
              icon={createDivIcon(ReactDOMServer.renderToString(icons[incident.type]))} 
            >
              <Popup>
                <strong>{incident.type}</strong>: {incident.description}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Actions Section */}
      {
        /*
      <div className="flex flex-wrap gap-2 items-center p-2 justify-end">
        {actionData.map((tab, idx) => (
          <button
            key={idx}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${tab.color} flex items-center gap-2`}
          >
            <span>{tab.icon}</span>
          </button>
        ))}
      </div>
      */}
    </div>
  );
};

const actionData = [
  { icon: <FaCog />, label: "Technical", color: "bg-gray-700 hover:bg-green-700" },
  { icon: <FaFire />, label: "Fire", color: "bg-red-700 hover:bg-red-600" },
  { icon: <FaTint />, label: "Spill", color: "bg-blue-700 hover:bg-blue-600" },
  { icon: <GiPoliceCar />, label: "Security", color: "bg-yellow-600 text-black hover:bg-yellow-500" },
  { icon: <FaLightbulb />, label: "Electrical", color: "bg-green-600 hover:bg-green-500" },
];
  // Example incident data
  const incidents = [
    { id: 1, type: 'Fire', position: [6.5244, 3.3792], description: 'Building on fire' }, // Lagos
    { id: 2, type: 'Spill', position: [7.4958, 3.6192], description: 'Oil spill reported' }, // Ibadan
    { id: 3, type: 'Technical', position: [9.0578, 7.4951], description: 'Technical issue reported' }, // Abuja
  ];

  // Define React Icon components for each incident type
  const icons = {
    Fire: <FaFire color="red" size={24} />,
    Spill: <FaTint color="blue" size={24} />,
    Technical: <FaCog color="gray" size={24} />,
    Security: <GiPoliceCar color="yellow" size={24} />,
    Electrical: <FaLightbulb color="green" size={24} />,
  };

export default MapCard;
