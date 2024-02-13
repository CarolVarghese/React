// DataChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { markDetailsModel } from './App';
import {Chart  as ChartJS} from 'chart.js/auto';
interface DataChartProps {
  data: markDetailsModel[];
}

const DataChart: React.FC<DataChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(student => student.name),
    datasets: [
      {
        label: 'My Data',
        data: data.map(student => student.english),
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default DataChart;
