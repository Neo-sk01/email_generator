"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
)

const chartData = {
  labels: ["Batch 1", "Batch 2", "Batch 3", "Batch 4", "Batch 5"],
  datasets: [
    {
      label: "Open Rate %",
      data: [35, 46, 55, 52, 61],
      borderColor: "#ef4444",
      backgroundColor: "rgba(239,68,68,0.09)",
      pointRadius: 2,
      tension: 0.4,
      fill: true,
    },
  ],
}

const chartOptions = {
  plugins: { legend: { display: false } },
  scales: {
    x: { display: false },
    y: { display: false, min: 0, max: 70 },
  },
  elements: { line: { borderWidth: 3 } },
  responsive: true,
  maintainAspectRatio: false,
}

export function MiniChart() {
  return <Line data={chartData} options={chartOptions} height={46} />
} 