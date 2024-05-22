import React, { useRef, useEffect } from "react";
import {Chart, ChartConfiguration} from "chart.js/auto";


interface BarChartProps {
  data: number[];
  labels: string[];
}

const BarChart: React.FC<BarChartProps> = ({ data, labels}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
 
  useEffect(()=> {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
        const chartConfig: ChartConfiguration = {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Bar Chart",
                data: data,
                backgroundColor: "rgba(75,192,192, 0,2)",
                borderColor: "rgba(75,192,192, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              x: { type: "category", position: "bottom"},
              y:{ beginAtZero: true},
            },
          },
          };
          chartInstanceRef.current = new Chart(ctx, chartConfig);
      }
    }
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, labels]);

  return (
    <div className="bar-chart-container">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BarChart;