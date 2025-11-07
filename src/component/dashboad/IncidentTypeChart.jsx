import React, { useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// NMDPR Color Palette
const NMDPRColors = {
  green: "#00A859",
  yellow: "#FFD500",
  black: "#000000",
  white: "#FFFFFF",
};

const IncidentTypeChart = ({ data, darkMode = false }) => {
  const chartRef = useRef(null);

  // Create gradient dynamically after the chart is drawn
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const ctx = chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, NMDPRColors.green);
    gradient.addColorStop(0.5, NMDPRColors.yellow);
    gradient.addColorStop(1, darkMode ? "#1E293B" : NMDPRColors.black);

    chart.data.datasets[0].backgroundColor = gradient;
    chart.update();
  }, [darkMode]);

  const chartData = {
    labels: data.map((d) => d.type),
    datasets: [
      {
        label: "Incident Volume",
        data: data.map((d) => d.count),
        borderWidth: 2,
        borderRadius: 8,
        borderColor: darkMode ? NMDPRColors.white : NMDPRColors.black,
        backgroundColor: NMDPRColors.green, // Placeholder; replaced by gradient
        hoverBackgroundColor: NMDPRColors.yellow,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: darkMode ? NMDPRColors.white : NMDPRColors.black,
          font: { size: 13 },
        },
      },
      title: {
        display: true,
        text: "Incident Volume by Type",
        color: darkMode ? NMDPRColors.white : NMDPRColors.black,
        font: { size: 16, weight: "bold" },
      },
      tooltip: {
        backgroundColor: darkMode ? NMDPRColors.black : NMDPRColors.green,
        titleColor: NMDPRColors.white,
        bodyColor: NMDPRColors.white,
        borderColor: NMDPRColors.yellow,
        borderWidth: 1,
        cornerRadius: 6,
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? NMDPRColors.white : NMDPRColors.black,
          font: { weight: "500" },
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: darkMode ? NMDPRColors.white : NMDPRColors.black,
        },
        grid: {
          color: darkMode ? "#324d67" : "#E5E7EB",
          drawBorder: false,
        },
      },
    },
  };

  return (
    <div
      className={`p-6 rounded-xl border shadow-md transition-all duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-[#0a0f14] via-[#111a22] to-[#0d1218] border-[#324d67]"
          : "bg-gradient-to-br from-white via-gray-100 to-gray-50 border-gray-200"
      }`}
    >
      <div className="h-[400px]">
        <Bar ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
};

export default IncidentTypeChart;
