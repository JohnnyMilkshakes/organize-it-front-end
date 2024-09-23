import React from 'react';
import { Bar } from 'react-chartjs-2';

const InventoryBarChart = ({ items }) => {
    // Process items to calculate total quantities by item type or other criteria
    const itemQuantities = items.reduce((acc, item) => {
        acc[item.name] = (acc[item.name] || 0) + item.quantity;  // Sum quantities by item name
        return acc;
    }, {});

    // Prepare data for Chart.js
    const labels = Object.keys(itemQuantities);  // Item names
    const quantities = Object.values(itemQuantities);  // Quantities of each item

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

