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

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InventoryBarChart = ({ items }) => {
    // Process items to calculate total quantities by item name
    const itemQuantities = items.reduce((acc, item) => {
        acc[item.name] = (acc[item.name] || 0) + item.quantity;
        return acc;
    }, {});

    // Prepare data for Chart.js
    const labels = Object.keys(itemQuantities);
    const quantities = Object.values(itemQuantities);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Total Quantity of Items',
                data: quantities,
                backgroundColor: 'rgba(255, 165, 0, 0.6)',  // Orange color for bars
                borderColor: 'rgba(255, 140, 0, 1)',  // Darker orange for border
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: false,  // Allow the Y-axis to include negative numbers
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

    return <Bar data={chartData} options={options} />;
};

export default InventoryBarChart;



