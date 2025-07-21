import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

const ChartCard = ({ title, type, data, options }) => {
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return <Bar data={data} options={options} />;
      case 'doughnut':
        return <Doughnut data={data} options={options} />;
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <div className="chart-card">
      <h3 className="chart-title">{title}</h3>
      <div className="chart-container">
        {renderChart()}
      </div>

      <style jsx>{`
        .chart-card {
          background: #f1f5f9;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(37,99,235,0.05);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .chart-title {
          color: #2563EB;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 20px;
          text-align: center;
        }

        .chart-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
        }

        @media (max-width: 768px) {
          .chart-container {
            min-height: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export default ChartCard;