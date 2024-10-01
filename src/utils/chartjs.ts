import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PieController,
  DoughnutController,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PieController,
  DoughnutController,
  ArcElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);
