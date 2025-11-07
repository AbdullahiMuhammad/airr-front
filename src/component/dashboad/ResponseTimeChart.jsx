import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const NMDPRColors = {
  green: "#00A859",
  yellow: "#FFD500",
  black: "#000000",
  white: "#FFFFFF",
  grayGrid: "#E5E7EB",
  darkGrayGrid: "#324d67",
};

const ResponseTimeChart = ({ data, darkMode = false, title }) => {
  const chartData = {
    labels: data.map((d) => d.zone),
    datasets: [
      {
        label: "Avg. Response Time (hrs)",
        data: data.map((d) => d.time),
        borderColor: function(context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return NMDPRColors.green; // chart not ready yet

          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, NMDPRColors.green);
          gradient.addColorStop(1, NMDPRColors.yellow);

          return gradient;
        },
        backgroundColor: "rgba(0, 168, 89, 0.1)",
        pointBackgroundColor: NMDPRColors.yellow,
        pointBorderColor: NMDPRColors.black,
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.35,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: darkMode ? NMDPRColors.white : NMDPRColors.black,
          font: { size: 13, weight: "500" },
        },
      },
      title: {
        display: true,
        text: title,
        color: darkMode ? NMDPRColors.white : NMDPRColors.black,
        font: { size: 16, weight: "bold" },
      },
      tooltip: {
        backgroundColor: darkMode ? NMDPRColors.black : NMDPRColors.green,
        titleColor: NMDPRColors.white,
        bodyColor: NMDPRColors.white,
        borderColor: NMDPRColors.yellow,
        borderWidth: 1,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        ticks: { color: darkMode ? NMDPRColors.white : NMDPRColors.black },
        grid: {
          color: darkMode ? NMDPRColors.darkGrayGrid : NMDPRColors.grayGrid,
        },
      },
      y: {
        ticks: { color: darkMode ? NMDPRColors.white : NMDPRColors.black },
        grid: {
          color: darkMode ? NMDPRColors.darkGrayGrid : NMDPRColors.grayGrid,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      className={`p-4 rounded-lg h-[400px] border ${
        darkMode
          ? "bg-[#111a22] border-[#324d67]"
          : "bg-white border-gray-200"
      }`}
    >
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ResponseTimeChart;
