// src/components/Dashboard/Charts.js
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function Charts() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Soil Moisture (%)",
        data: [65, 59, 80, 81, 56],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1
      },
      {
        label: "Temperature (°C)",
        data: [22, 24, 19, 21, 25],
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };

  return <Line data={data} options={options} />;
}