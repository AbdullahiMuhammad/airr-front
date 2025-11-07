import React from "react";

const IncidentBreakdownCard = ({ incidents }) => {
  return (
    <div className="bg-white bg-gradient-to-br from-green-700 via-gray-900 to-black  rounded-xl border border-gray-200 dark:border-[#324d67] p-4 shadow-md">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Incident Breakdown by State
      </h3>

      <div className="overflow-x-auto ">
        <table className="w-full text-sm text-left text-gray-600  dark:text-gray-300">
          <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">State</th>
              <th className="px-6 py-3 text-center">Total</th>
              <th className="px-6 py-3 text-center text-red-500">High</th>
              <th className="px-6 py-3 text-center text-yellow-500">Medium</th>
              <th className="px-6 py-3 text-center text-green-500">Low</th>
            </tr>
          </thead>

          <tbody>
            {incidents.map((state, index) => (
              <tr
                key={index}
                className="bg-white dark:bg-[#111a22] hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 transition"
              >
                <td className="px-6 py-3 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                  {state.name}
                </td>
                <td className="px-6 py-3 text-center">{state.total}</td>
                <td className="px-6 py-3 text-center">
                  <span className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 px-3 py-1 rounded-full text-xs font-semibold">
                    {state.high}
                  </span>
                </td>
                <td className="px-6 py-3 text-center">
                  <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 px-3 py-1 rounded-full text-xs font-semibold">
                    {state.medium}
                  </span>
                </td>
                <td className="px-6 py-3 text-center">
                  <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-3 py-1 rounded-full text-xs font-semibold">
                    {state.low}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncidentBreakdownCard;
