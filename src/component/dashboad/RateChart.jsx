import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

const NMDPRColors = {
  greenStart: "#00A859",
  greenEnd: "#00FF9D",
  yellowStart: "#FFD500",
  yellowEnd: "#FFF35C",
  blackStart: "#000000",
  blackEnd: "#434343",
  white: "#FFFFFF",
};

const RateChart = ({ data, darkMode = false, title, perc, height }) => {
  const chartData = {
    labels: data.map((d) => d.zone),
    datasets: [
      {
        data: data.map((d) => d.rate),
        backgroundColor: function(context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return NMDPRColors.greenStart; // chart not ready yet

          const index = context.dataIndex;

          // define gradient for each slice
          const gradient = ctx.createLinearGradient(
            chartArea.left,
            chartArea.top,
            chartArea.right,
            chartArea.bottom
          );

          if (index === 0) gradient.addColorStop(0, NMDPRColors.greenStart);
          if (index === 0) gradient.addColorStop(1, NMDPRColors.greenEnd);

          if (index === 1) gradient.addColorStop(0, NMDPRColors.yellowStart);
          if (index === 1) gradient.addColorStop(1, NMDPRColors.yellowEnd);

          if (index === 2) gradient.addColorStop(0, NMDPRColors.blackStart);
          if (index === 2) gradient.addColorStop(1, NMDPRColors.blackEnd);

          // fallback gray for additional slices
          if (index > 2) gradient.addColorStop(0, "#808080");
          if (index > 2) gradient.addColorStop(1, "#B0B0B0");

          return gradient;
        },
        borderColor: darkMode ? NMDPRColors.white : NMDPRColors.black,
        borderWidth: 2,
        hoverOffset: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "65%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: darkMode ? NMDPRColors.white : NMDPRColors.black,
          font: { size: 13, weight: "500" },
        },
      },
      title: {
        display: true,
        text: `${title} ${perc}%`,
        color: darkMode ? NMDPRColors.white : NMDPRColors.black,
        font: { size: 16, weight: "bold" },
      },
      tooltip: {
        backgroundColor: darkMode ? NMDPRColors.black : NMDPRColors.greenStart,
        titleColor: NMDPRColors.white,
        bodyColor: NMDPRColors.white,
        borderColor: NMDPRColors.yellowStart,
        borderWidth: 1,
        padding: 10,
      },
      datalabels: {
        color: darkMode ? NMDPRColors.white : NMDPRColors.black,
        formatter: (value) => `${value}%`,
        font: { size: 12, weight: "bold" },
      },
    },
  };

  return (
    <div
      className={`p-4 flex-1 rounded-lg w-auto h-auto min-h-[420px] border ${
        darkMode
          ? "bg-[#111a22] border-[#324d67]"
          : "bg-white border-gray-200"
      }`}
    >
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default RateChart;
