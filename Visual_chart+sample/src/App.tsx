
import React, { useEffect, useState } from 'react';
import { UserData } from './Data'

import './App.css'
import { Bar } from 'react-chartjs-2';
import  Chart, {CategoryScale}  from 'chart.js/auto';

Chart.register(CategoryScale);

function App() {
  
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);

     const chartData = {
      labels: UserData.map((data) => data.year),
      datasets: [
        {
          label: "Users Gained",
          data: UserData.map((data) => data.userGain),
          backgroundColour: 'rgba(75,192,192,0.6)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth:1,
        },
      ],
     };

     const chartOptions = {
      scales: {
        x: {
          type: 'category',
          beginAtZero:true,
        },
        y:{
          beginAtZero: true,
        },
      },
     };

     useEffect(() => {
      if (chartInstance) {
        chartInstance.destroy();
      }
  
      const ctx = document.getElementById('myChart') as HTMLCanvasElement | null;
      if (!ctx) return null;

      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions,
      });
  
      setChartInstance(newChartInstance);
  
      
      const cleanupFunction: () => void = () => {
        if (chartInstance) {
          chartInstance.destroy();
        }
      };
      return cleanupFunction;
      
    }, [chartData,chartOptions,chartInstance]);

     return(
      <div>
        <Bar data={chartData} options={chartOptions} />
      </div>
     );
}

export default App
