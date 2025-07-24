import React, { useMemo } from 'react';
import { useBudget } from '../../context/BudgetContext';

const BudgetOverview = ({ transactions }) => {
  const { categories, budgets } = useBudget();

  const budgetData = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Get current month's expense transactions
    const monthlyExpenses = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear &&
             t.type === 'Expense';
    });

    // Calculate spending by category
    const spendingByCategory = {};
    monthlyExpenses.forEach(transaction => {
      const categoryId = transaction.categoryId;
      if (categoryId) {
        spendingByCategory[categoryId] = (spendingByCategory[categoryId] || 0) + transaction.amount;
      }
    });

    // Create budget overview data
    return categories.map(category => {
      const budget = budgets[category.id];
      const spent = spendingByCategory[category.id] || 0;
      const remaining = budget ? Math.max(0, budget.amount - spent) : 0;
      const percentage = budget ? Math.min(100, (spent / budget.amount) * 100) : 0;

      return {
        category,
        budget: budget?.amount || 0,
        spent,
        remaining,
        percentage,
        status: budget ? (
          percentage >= 100 ? 'exceeded' :
          percentage >= 80 ? 'warning' :
          percentage >= 60 ? 'caution' : 'good'
        ) : 'no-budget'
      };
    }).filter(item => item.budget > 0); // Only show categories with budgets
  }, [categories, budgets, transactions]);

  const totalBudget = budgetData.reduce((sum, item) => sum + item.budget, 0);
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);
  const totalRemaining = totalBudget - totalSpent;

  const getStatusColor = (status) => {
    switch (status) {
      case 'exceeded': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'caution': return '#eab308';
      case 'good': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getProgressBarColor = (percentage) => {
    if (percentage >= 100) return '#ef4444';
    if (percentage >= 80) return '#f59e0b';
    if (percentage >= 60) return '#eab308';
    return '#22c55e';
  };

  if (budgetData.length === 0) {
    return (
      <div className="budget-overview">
        <h2>Budget Overview</h2>
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <p>No budgets set yet. Create categories and set budgets to track your spending!</p>
        </div>

        <style jsx>{`
          .budget-overview {
            background: #f8fafc;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 32px;
            box-shadow: 0 2px 8px rgba(37,99,235,0.04);
          }

          .budget-overview h2 {
            color: #2563EB;
            margin-bottom: 20px;
            font-size: 1.5rem;
          }

          .empty-state {
            text-align: center;
            padding: 40px 20px;
            color: #6b7280;
          }

          .empty-icon {
            font-size: 3rem;
            margin-bottom: 16px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="budget-overview">
      <h2>Budget Overview - {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
      
      <div className="summary-cards">
        <div className="summary-card total">
          <h3>Total Budget</h3>
          <p className="amount">${totalBudget.toFixed(2)}</p>
        </div>
        <div className="summary-card spent">
          <h3>Total Spent</h3>
          <p className="amount">${totalSpent.toFixed(2)}</p>
        </div>
        <div className="summary-card remaining">
          <h3>Remaining</h3>
          <p className="amount">${totalRemaining.toFixed(2)}</p>
        </div>
      </div>

      <div className="budget-items">
        {budgetData.map(item => (
          <div key={item.category.id} className="budget-item">
            <div className="budget-header">
              <div className="category-info">
                <div 
                  className="category-icon"
                  style={{ backgroundColor: item.category.color }}
                >
                  {item.category.icon}
                </div>
                <div className="category-details">
                  <h4>{item.category.name}</h4>
                  <div className="budget-amounts">
                    <span className="spent-amount">${item.spent.toFixed(2)}</span>
                    <span className="budget-separator">of</span>
                    <span className="budget-amount">${item.budget.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="budget-status">
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(item.status) }}
                >
                  {item.percentage.toFixed(0)}%
                </span>
                <span className="remaining-amount">
                  ${item.remaining.toFixed(2)} left
                </span>
              </div>
            </div>
            
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${Math.min(100, item.percentage)}%`,
                  backgroundColor: getProgressBarColor(item.percentage)
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .budget-overview {
          background: #f8fafc;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 32px;
          box-shadow: 0 2px 8px rgba(37,99,235,0.04);
        }

        .budget-overview h2 {
          color: #2563EB;
          margin-bottom: 24px;
          font-size: 1.5rem;
        }

        .summary-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }

        .summary-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .summary-card h3 {
          margin: 0 0 8px 0;
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 500;
        }

        .summary-card .amount {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .summary-card.total .amount {
          color: #3b82f6;
        }

        .summary-card.spent .amount {
          color: #ef4444;
        }

        .summary-card.remaining .amount {
          color: #22c55e;
        }

        .budget-items {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .budget-item {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .budget-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .category-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .category-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: white;
        }

        .category-details h4 {
          margin: 0 0 4px 0;
          color: #1f2937;
          font-size: 1rem;
        }

        .budget-amounts {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.875rem;
        }

        .spent-amount {
          color: #ef4444;
          font-weight: 600;
        }

        .budget-separator {
          color: #6b7280;
        }

        .budget-amount {
          color: #3b82f6;
          font-weight: 600;
        }

        .budget-status {
          text-align: right;
        }

        .status-badge {
          display: inline-block;
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .remaining-amount {
          display: block;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          transition: width 0.3s ease;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .budget-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .budget-status {
            text-align: left;
            width: 100%;
          }

          .summary-cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default BudgetOverview;