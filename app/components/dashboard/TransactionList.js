import React from 'react';
import { useBudget } from '../../context/BudgetContext';

const TransactionList = ({ 
  transactions, 
  onDeleteTransaction, 
  onEditTransaction,
  currencyFormatter 
}) => {
  const { getCategoryById } = useBudget();
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTransactionIcon = (transaction) => {
    if (transaction.type === 'Income') {
      return '💰'; // Default income icon
    }
    
    if (transaction.categoryId) {
      const category = getCategoryById(transaction.categoryId);
      return category?.icon || '💸';
    }
    
    return '💸'; // Default expense icon
  };

  const getCategoryName = (transaction) => {
    if (transaction.type === 'Income') {
      return 'Income';
    }
    
    if (transaction.categoryId) {
      const category = getCategoryById(transaction.categoryId);
      return category?.name || 'Uncategorized';
    }
    
    return transaction.category || 'Uncategorized';
  };
  if (transactions.length === 0) {
    return (
      <div className="transaction-list">
        <h2>Transaction History</h2>
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <p>No transactions yet. Add your first transaction to get started!</p>
        </div>
        
        <style jsx>{`
          .transaction-list {
            background: #f8fafc;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 2px 8px rgba(37,99,235,0.04);
          }

          .transaction-list h2 {
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

          .empty-state p {
            font-size: 1.1rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      <h2>Transaction History</h2>
      <div className="transactions-container">
        {transactions.map((transaction) => (
          <div 
            key={transaction.id} 
            className={`transaction-item ${transaction.type.toLowerCase()}`}
          >
            <div className="transaction-main">
              <div className="transaction-icon">
                {getTransactionIcon(transaction)}
              </div>
              <div className="transaction-details">
                <div className="transaction-header">
                  <h4 className="transaction-desc">{transaction.desc}</h4>
                  <span className={`transaction-amount ${transaction.type.toLowerCase()}`}>
                    {transaction.type === 'Income' ? '+' : '-'}
                    {currencyFormatter.format(transaction.amount)}
                  </span>
                </div>
                <div className="transaction-meta">
                  <span className="transaction-category">{getCategoryName(transaction)}</span>
                  <span className="transaction-date">{formatDate(transaction.date)}</span>
                </div>
              </div>
            </div>
            <div className="transaction-actions">
              <button 
                onClick={() => onEditTransaction(transaction)}
                className="edit-btn"
                title="Edit transaction"
              >
                ✏️
              </button>
              <button 
                onClick={() => onDeleteTransaction(transaction.id)}
                className="delete-btn"
                title="Delete transaction"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .transaction-list {
          background: #f8fafc;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(37,99,235,0.04);
        }

        .transaction-list h2 {
          color: #2563EB;
          margin-bottom: 20px;
          font-size: 1.5rem;
        }

        .transactions-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .transaction-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-radius: 8px;
          background: white;
          border-left: 4px solid;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .transaction-item:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .transaction-item.income {
          border-left-color: #22c55e;
        }

        .transaction-item.expense {
          border-left-color: #ef4444;
        }

        .transaction-main {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .transaction-icon {
          font-size: 1.5rem;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f1f5f9;
          border-radius: 8px;
        }

        .transaction-details {
          flex: 1;
        }

        .transaction-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .transaction-desc {
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }

        .transaction-amount {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .transaction-amount.income {
          color: #22c55e;
        }

        .transaction-amount.expense {
          color: #ef4444;
        }

        .transaction-meta {
          display: flex;
          gap: 16px;
          font-size: 0.875rem;
          color: #64748b;
        }

        .transaction-category {
          background: #e2e8f0;
          padding: 2px 8px;
          border-radius: 12px;
          font-weight: 500;
        }

        .transaction-actions {
          display: flex;
          gap: 8px;
        }

        .edit-btn,
        .delete-btn {
          background: none;
          border: none;
          padding: 8px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.2s ease;
        }

        .edit-btn:hover {
          background: #dbeafe;
        }

        .delete-btn:hover {
          background: #fee2e2;
        }

        @media (max-width: 768px) {
          .transaction-item {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .transaction-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }

          .transaction-actions {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default TransactionList;