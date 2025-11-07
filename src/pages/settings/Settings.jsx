import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  // --- States ---
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState({
    incidentUpdates: true,
    weeklySummary: false,
    highPriorityAlerts: true,
    systemDowntime: false,
  });
  const [bestSettings, setBestSettings] = useState({
    autoAssignIncidents: true,
    highPriorityAlerts: true,
  });

  // --- Handlers ---
  const handlePasswordChange = (e) => {
    e.preventDefault();
    alert('Password updated!');
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    alert('Email updated!');
  };

  const handleNotificationChange = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };

  const handleBestSettingsChange = (e) => {
    setBestSettings({ ...bestSettings, [e.target.name]: e.target.checked });
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-black mb-6">Settings</h1>

      {/* Logout Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Password Change */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Change Password</h2>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Email Change */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-yellow-500 mb-4">Change Email</h2>
          <form onSubmit={handleEmailChange} className="space-y-4">
            <input
              type="email"
              placeholder="New Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Update Email
            </button>
          </form>
        </div>

        {/* Notification Settings */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Notification Settings</h2>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="incidentUpdates"
                checked={notifications.incidentUpdates}
                onChange={handleNotificationChange}
                className="form-checkbox text-green-600"
              />
              <span>Incident Updates</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="weeklySummary"
                checked={notifications.weeklySummary}
                onChange={handleNotificationChange}
                className="form-checkbox text-green-600"
              />
              <span>Weekly Summary</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="highPriorityAlerts"
                checked={notifications.highPriorityAlerts}
                onChange={handleNotificationChange}
                className="form-checkbox text-yellow-500"
              />
              <span>High Priority Alerts</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="systemDowntime"
                checked={notifications.systemDowntime}
                onChange={handleNotificationChange}
                className="form-checkbox text-yellow-500"
              />
              <span>System Downtime Alerts</span>
            </label>
          </div>
        </div>

        {/* Best Settings */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Best Settings for Incident Response</h2>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="autoAssignIncidents"
                checked={bestSettings.autoAssignIncidents}
                onChange={handleBestSettingsChange}
                className="form-checkbox text-green-600"
              />
              <span>Auto-assign incidents</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="highPriorityAlerts"
                checked={bestSettings.highPriorityAlerts}
                onChange={handleBestSettingsChange}
                className="form-checkbox text-yellow-500"
              />
              <span>Enable high priority alerts</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
