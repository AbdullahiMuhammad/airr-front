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

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NMDPRColors = {
  black: "#000000",
  green: "#28a745",
  yellow: "#ffc107",
  white: "#ffffff",
};

const IncidentVolumeChart = ({ data }) => {
  const chartRef = useRef(null);

  // Create gradient dynamically after chart mounts
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
    gradient.addColorStop(0, NMDPRColors.green);
    gradient.addColorStop(1, NMDPRColors.black);

    chart.data.datasets[0].backgroundColor = gradient;
    chart.update();
  }, [data]);

  const chartData = {
    labels: data.map((d) => d.zone),
    datasets: [
      {
        label: "Incident Volume",
        data: data.map((d) => d.volume),
        backgroundColor: NMDPRColors.green, // placeholder, replaced by gradient
        borderColor: NMDPRColors.black,
        borderWidth: 1,
        borderRadius: 6, // rounded bars
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: NMDPRColors.black },
      },
      title: {
        display: true,
        text: "Incident Volume by Zone",
        color: NMDPRColors.black,
        font: { size: 16, weight: "bold" },
      },
      tooltip: {
        backgroundColor: NMDPRColors.black,
        titleColor: NMDPRColors.white,
        bodyColor: NMDPRColors.white,
        borderColor: NMDPRColors.green,
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: NMDPRColors.black },
        grid: { color: "#e0e0e0" },
      },
      y: {
        ticks: { color: NMDPRColors.black },
        grid: { color: "#e0e0e0" },
        beginAtZero: true,
      },
    },
  };

  return <Bar ref={chartRef} data={chartData} options={options} />;
};

export default IncidentVolumeChart;
