import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
    const [dailyVisitors, setDailyVisitors] = useState(0);
    const [monthlyVisitors, setMonthlyVisitors] = useState([]);
    const [totalMonthlyVisitors, setTotalMonthlyVisitors] = useState(0);
    const APP_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token')

    useEffect(() => {
        axios.get(`${APP_URL}/api/analytics/visitors/daily`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => setDailyVisitors(response.data.count))
            .catch(error => console.error('Error fetching daily visitors', error));

        axios.get(`${APP_URL}/api/analytics/visitors/monthly`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setMonthlyVisitors(response.data);
                setTotalMonthlyVisitors(response.data.reduce((sum, day) => sum + day.count, 0));
            })
            .catch(error => console.error('Error fetching monthly visitors', error));
    }, [APP_URL, token]);

    const chartData = {
        labels: Array.from({ length: 31 }, (_, i) => i + 1),
        datasets: [{
            label: 'Visitors',
            data: Array.from({ length: 31 }, (_, i) => {
                const day = monthlyVisitors.find(d => d._id === i + 1);
                return day ? day.count : 0;
            }),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Visitors',
            },
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Daily Visitors</h2>
                    <p className="text-3xl font-bold text-blue-600">{dailyVisitors}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Total Monthly Visitors</h2>
                    <p className="text-3xl font-bold text-green-600">{totalMonthlyVisitors}</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <Line options={options} data={chartData} />
            </div>
        </div>
    );
}

export default Dashboard;