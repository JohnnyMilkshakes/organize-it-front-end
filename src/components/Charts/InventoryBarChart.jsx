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

// Register the components explicitly
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InventoryBarChart = ({ items }) => {
    const itemQuantities = items.reduce((acc, item) => {
        acc[item.name] = (acc[item.name] || 0) + item.quantity;
        return acc;
    }, {});

    const labels = Object.keys(itemQuantities);
    const quantities = Object.values(itemQuantities);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Total Quantity of Items',
                data: quantities,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Item Quantities Overview' },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default InventoryBarChart;


