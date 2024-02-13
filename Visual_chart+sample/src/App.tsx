import React from 'react'
import { UserData } from './Data'

import './App.css'
import { Bar } from 'react-chartjs-2';

function App() {
  
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
  
      const ctx = document.getElementById('myChart').getContext('2d');
      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: chartData,
      });
  
      setChartInstance(newChartInstance);
  
      // Cleanup on component unmount
      return () => {
        if (chartInstance) {
          chartInstance.destroy();
        }
      };
    }, [chartData]);
    
     return(
      <div>
        <Bar data={chartData} options={chartOptions} />
      </div>
     );
}

export default App
