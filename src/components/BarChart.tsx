'use client';
import { FC } from 'react';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  Colors,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

interface BarChartProps {
  data: ChartData<'bar', number[], string>;
}

const BarChart: FC<BarChartProps> = ({ data }) => {
  return (
    <Bar
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
      data={data}
    />
  );
};

export default BarChart;
