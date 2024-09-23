import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getItems } from '../api/getItems';  // Import the Axios-based fetch function

const InventoryBarChart = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const loadData = async () => {
            const items = await getItems();  // Use Axios to fetch items from the backend

            // Process data to group by location
            const locationQuantities = items.reduce((acc, item) => {
                const locationName = item.location.name;  // Assuming location is nested within item
                acc[locationName] = (acc[locationName] || 0) + item.quantity;
                return acc;
            }, {});

            // Prepare data for Chart.js
            const labels = Object.keys(locationQuantities);  // Get the location names
            const quantities = Object.values(locationQuantities);  // Get total quantities per location

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Total Quantity of Items',
                        data: quantities,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',  // Bar colors
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        };

        loadData();  // Trigger data loading on component mount
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',  // Position of legend
            },
            title: {
                display: true,
                text: 'Item Quantities by Location',  // Chart title
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default InventoryBarChart;
