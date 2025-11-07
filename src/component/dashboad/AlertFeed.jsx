import React from "react";
import { FaExclamationCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

const AlertItem = ({ type, message, time }) => {
  const typeStyles = {
    critical: {
      icon: <FaExclamationCircle className="text-red-500 text-lg" />,
      bg: "bg-red-500/20",
    },
    warning: {
      icon: <FaExclamationTriangle className="text-yellow-500 text-lg" />,
      bg: "bg-yellow-500/20",
    },
    info: {
      icon: <FaInfoCircle className="text-blue-500 text-lg" />,
      bg: "bg-blue-500/20",
    },
  };

  const { icon, bg } = typeStyles[type] || typeStyles.info;

  return (
    <div className="flex gap-3">
      <div
        className={`flex-shrink-0 size-8 ${bg} rounded-full flex items-center justify-center`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {message}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{time}</p>
      </div>
    </div>
  );
};

const AlertFeed = ({ alerts, title }) => {
  return (
    <div className="flex flex-col h-full min-h-[500px] bg-white dark:bg-[#111a22] p-4 rounded-lg border border-gray-200 dark:border-[#324d67]">
      <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-3">
        {title}
      </h2>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {alerts.length > 0 ? (
          alerts.map((alert, index) => <AlertItem key={index} {...alert} />)
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            No active alerts.
          </p>
        )}
      </div>
    </div>
  );
};

export default AlertFeed;
