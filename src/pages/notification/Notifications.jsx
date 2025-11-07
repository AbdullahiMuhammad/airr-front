import React, { useState, useEffect } from 'react';

// Example notifications data
const exampleNotifications = [
  {
    id: 1,
    type: 'incident',
    title: 'New incident assigned',
    message: 'You have been assigned to incident #1234',
    date: '2025-11-07 10:30',
    status: 'unread',
  },
  {
    id: 2,
    type: 'alert',
    title: 'High priority alert',
    message: 'Incident #1220 requires immediate attention',
    date: '2025-11-06 16:45',
    status: 'read',
  },
  {
    id: 3,
    type: 'system',
    title: 'System maintenance',
    message: 'Scheduled maintenance tonight at 2:00 AM',
    date: '2025-11-05 12:00',
    status: 'unread',
  },
];

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from API here
    setNotifications(exampleNotifications);
  }, []);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, status: 'read' } : n
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-black mb-6">Notifications</h1>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-gray-600">No notifications yet.</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg shadow-md flex justify-between items-center
                ${notification.status === 'unread' ? 'bg-green-100' : 'bg-white'}`}
            >
              <div>
                <h2 className="font-semibold text-black">
                  {notification.title}
                </h2>
                <p className="text-gray-700">{notification.message}</p>
                <span className="text-gray-500 text-sm">{notification.date}</span>
              </div>
              {notification.status === 'unread' && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  Mark as read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
