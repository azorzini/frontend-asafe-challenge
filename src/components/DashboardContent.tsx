'use client';

import { useTheme } from 'next-themes';
import '@/utils/chartjs';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

export default function DashboardContent() {
  const { theme } = useTheme();
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const randomData = Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 100)
    );
    setData(randomData);
  }, []);

  const classesData = {
    labels: ['Class A', 'Class B'],
    datasets: [
      {
        data: [35, 15],
        backgroundColor: ['rgba(79, 70, 229, 0.7)', 'rgba(237, 100, 166, 0.7)'],
        borderWidth: 1,
      },
    ],
  };

  const salesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sales',
        data: [50, 75, 150, 100, 200, 175, 80],
        fill: false,
        borderColor: 'rgba(79, 70, 229, 0.7)',
        tension: 0.1,
      },
    ],
  };

  const tasksData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [75, 25],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',
          'rgba(229, 231, 235, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const defaultChartOptions = {
    plugins: {
      legend: {
        labels: {
          color: theme === 'dark' ? '#fff' : '#000',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme === 'dark' ? '#fff' : '#000',
        },
        grid: {
          color: theme === 'dark' ? '#444' : '#e5e7eb',
        },
      },
      y: {
        ticks: {
          color: theme === 'dark' ? '#fff' : '#000',
        },
        grid: {
          color: theme === 'dark' ? '#444' : '#e5e7eb',
        },
      },
    },
  };

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Random Data',
        data: data,
        backgroundColor: 'rgba(79, 70, 229, 0.7)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: theme === 'dark' ? '#fff' : '#000',
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme === 'dark' ? '#fff' : '#000',
        },
        grid: {
          color: theme === 'dark' ? '#444' : '#e5e7eb',
        },
      },
      y: {
        ticks: {
          color: theme === 'dark' ? '#fff' : '#000',
        },
        grid: {
          color: theme === 'dark' ? '#444' : '#e5e7eb',
        },
      },
    },
  };

  const numberStyle = 'text-5xl font-bold text-black dark:text-white';

  return (
    <div className="flex flex-wrap -mx-2">
      <div className="w-full sm:w-1/2 lg:w-1/3 p-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-full">
          <h2 className="text-xl font-bold text-black dark:text-white mb-2">
            Classes Distribution
          </h2>
          <Pie data={classesData} options={defaultChartOptions} />
        </div>
      </div>

      <div className="w-full sm:w-1/2 lg:w-1/3 p-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-full flex flex-col justify-center items-center">
          <h2 className="text-xl font-bold text-black dark:text-white mb-2">
            Active Sessions
          </h2>
          <p className={numberStyle}>25</p>
        </div>
      </div>

      <div className="w-full sm:w-1/2 lg:w-1/3 p-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-full">
          <h2 className="text-xl font-bold text-black dark:text-white mb-2">
            Sales Over Time
          </h2>
          <Line data={salesData} options={defaultChartOptions} />
        </div>
      </div>

      <div className="w-full sm:w-1/2 lg:w-1/3 p-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-full flex flex-col justify-center items-center">
          <h2 className="text-xl font-bold text-black dark:text-white mb-2">
            New Users
          </h2>
          <p className={numberStyle}>120</p>
        </div>
      </div>

      <div className="w-full sm:w-1/2 lg:w-1/3 p-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-full">
          <h2 className="text-xl font-bold text-black dark:text-white mb-2">
            Tasks Completion
          </h2>
          <Doughnut data={tasksData} options={defaultChartOptions} />
        </div>
      </div>

      <div className="w-full sm:w-1/2 lg:w-1/3 p-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-full flex flex-col justify-center items-center">
          <h2 className="text-xl font-bold text-black dark:text-white mb-2">
            Server Uptime
          </h2>
          <p className={numberStyle}>99.9%</p>
        </div>
      </div>

      <div className="w-full p-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h2 className="text-xl font-bold text-black dark:text-white mb-4">
            Weekly Data
          </h2>
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
}
