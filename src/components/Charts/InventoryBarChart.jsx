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
        barThickness: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: 'y',  // Horizontal bar chart
    scales: {
      x: {
        ticks: {
          color: '#FFFFFF',  // Change X-axis label color to white
          maxRotation: 45,  // Rotate X-axis labels if needed
          minRotation: 45,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',  // Optional: Change grid line color
        },
      },
      y: {
        ticks: {
          color: '#FFFFFF',  // Change Y-axis label color to white
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',  // Optional: Change grid line color
        },
        beginAtZero: false,  // Allow for negative numbers
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#FFFFFF',  // Change legend text color to white
        },
      },
      tooltip: {
        bodyColor: '#FFFFFF',  // Change tooltip text color to white
        backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Optional: Change tooltip background color
      },
      title: {
        display: true,
        text: 'Item Quantities Overview',
        color: '#FFFFFF',  // Change title text color to white
      },
    },
  };

  return <Bar data={chartData} options={options} height={chartHeight} />;
};

export default InventoryBarChart;
