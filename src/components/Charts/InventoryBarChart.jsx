import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InventoryBarChart = ({ items }) => {
  const itemQuantities = items.reduce((acc, item) => {
    acc[item.name] = (acc[item.name] || 0) + item.quantity;
    return acc;
  }, {});

  const labels = Object.keys(itemQuantities);
  const quantities = Object.values(itemQuantities);

  const chartHeight = labels.length * 50;  // Dynamic height based on number of items

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Total Quantity of Items',
        data: quantities,
        backgroundColor: 'rgba(209, 68, 7, 1)',  // Orange color for bars
        borderColor: 'rgba(255, 140, 0, 1)',  // Darker orange for border
        borderWidth: 1,
        barThickness: 20,  // Adjust the thickness of the bars
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: 'y',  // Horizontal bar chart for better readability
    scales: {
      x: {
        ticks: {
          maxRotation: 45,  // Rotate X-axis labels if using a vertical chart
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: false,  // Allow for negative numbers
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Item Quantities Overview',
      },
    },
  };

  return <Bar data={chartData} options={options} height={chartHeight} />;
};

export default InventoryBarChart;
