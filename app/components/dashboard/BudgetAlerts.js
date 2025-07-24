import React from 'react';
import { useBudget } from '../../context/BudgetContext';

const BudgetAlerts = () => {
  const { alerts, dismissAlert } = useBudget();

  if (alerts.length === 0) {
    return null;
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return '🚨';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  const getAlertClass = (type) => {
    switch (type) {
      case 'error': return 'alert-error';
      case 'warning': return 'alert-warning';
      default: return 'alert-info';
    }
  };

  return (
    <div className="budget-alerts">
      <h3>Budget Alerts</h3>
      <div className="alerts-list">
        {alerts.map(alert => (
          <div key={alert.id} className={`alert-item ${getAlertClass(alert.type)}`}>
            <div className="alert-content">
              <div className="alert-icon">
                {getAlertIcon(alert.type)}
              </div>
              <div className="alert-text">
                <p>{alert.message}</p>
                {alert.percentage && (
                  <div className="alert-progress">
                    <div 
                      className="alert-progress-bar"
                      style={{ width: `${Math.min(100, alert.percentage)}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
            <button 
              className="dismiss-btn"
              onClick={() => dismissAlert(alert.id)}
              title="Dismiss alert"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <style jsx>{`
        .budget-alerts {
          background: #f8fafc;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
          box-shadow: 0 2px 8px rgba(37,99,235,0.04);
        }

        .budget-alerts h3 {
          color: #2563EB;
          margin: 0 0 16px 0;
          font-size: 1.25rem;
        }

        .alerts-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .alert-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-radius: 8px;
          border-left: 4px solid;
          background: white;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .alert-error {
          border-left-color: #ef4444;
          background: #fef2f2;
        }

        .alert-warning {
          border-left-color: #f59e0b;
          background: #fffbeb;
        }

        .alert-info {
          border-left-color: #3b82f6;
          background: #eff6ff;
        }

        .alert-content {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .alert-icon {
          font-size: 1.5rem;
        }

        .alert-text {
          flex: 1;
        }

        .alert-text p {
          margin: 0 0 8px 0;
          color: #374151;
          font-weight: 500;
        }

        .alert-progress {
          width: 100%;
          height: 4px;
          background: #e5e7eb;
          border-radius: 2px;
          overflow: hidden;
        }

        .alert-progress-bar {
          height: 100%;
          background: #ef4444;
          transition: width 0.3s ease;
        }

        .alert-warning .alert-progress-bar {
          background: #f59e0b;
        }

        .dismiss-btn {
          background: none;
          border: none;
          color: #6b7280;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: background 0.2s ease;
        }

        .dismiss-btn:hover {
          background: rgba(107, 114, 128, 0.1);
        }

        @media (max-width: 768px) {
          .alert-item {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .dismiss-btn {
            align-self: flex-end;
          }
        }
      `}</style>
    </div>
  );
};

export default BudgetAlerts;