import React, { useState, useEffect } from 'react';
import { useBudget } from '../../context/BudgetContext';

const RecurringExpenses = ({ onAddTransaction }) => {
  const { 
    recurringExpenses, 
    categories,
    addRecurringExpense, 
    updateRecurringExpense, 
    deleteRecurringExpense,
    getUpcomingRecurring
  } = useBudget();

  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    categoryId: '',
    frequency: 'monthly',
    startDate: new Date().toISOString().split('T')[0],
    description: ''
  });

  const [upcomingExpenses, setUpcomingExpenses] = useState([]);

  useEffect(() => {
    setUpcomingExpenses(getUpcomingRecurring(7));
  }, [recurringExpenses]);

  // Check for due recurring expenses and auto-add them
  useEffect(() => {
    const checkDueExpenses = () => {
      const today = new Date().toISOString().split('T')[0];
      
      recurringExpenses.forEach(expense => {
        if (expense.nextDue <= today && expense.autoAdd !== false) {
          // Add transaction
          const category = categories.find(cat => cat.id === expense.categoryId);
          if (category) {
            onAddTransaction({
              desc: `${expense.name} (Recurring)`,
              amount: expense.amount,
              type: 'Expense',
              date: today,
              categoryId: expense.categoryId,
              category: category.name,
              isRecurring: true
            });

            // Update next due date
            const nextDue = calculateNextDue(expense.frequency, expense.nextDue);
            updateRecurringExpense(expense.id, { ...expense, nextDue });
          }
        }
      });
    };

    checkDueExpenses();
    // Check daily
    const interval = setInterval(checkDueExpenses, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [recurringExpenses, categories, onAddTransaction, updateRecurringExpense]);

  const calculateNextDue = (frequency, currentDate) => {
    const date = new Date(currentDate);
    
    switch (frequency) {
      case 'weekly':
        date.setDate(date.getDate() + 7);
        break;
      case 'monthly':
        date.setMonth(date.getMonth() + 1);
        break;
      case 'yearly':
        date.setFullYear(date.getFullYear() + 1);
        break;
      default:
        return currentDate;
    }
    
    return date.toISOString().split('T')[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.amount || !formData.categoryId) return;

    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount)
    };

    if (editingExpense) {
      updateRecurringExpense(editingExpense.id, expenseData);
    } else {
      addRecurringExpense(expenseData);
    }

    resetForm();
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setFormData({
      name: expense.name,
      amount: expense.amount.toString(),
      categoryId: expense.categoryId,
      frequency: expense.frequency,
      startDate: expense.startDate,
      description: expense.description || ''
    });
    setShowForm(true);
  };

  const handleDelete = (expenseId) => {
    if (window.confirm('Are you sure you want to delete this recurring expense?')) {
      deleteRecurringExpense(expenseId);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      amount: '',
      categoryId: '',
      frequency: 'monthly',
      startDate: new Date().toISOString().split('T')[0],
      description: ''
    });
    setEditingExpense(null);
    setShowForm(false);
  };

  const handleAddNow = (expense) => {
    const category = categories.find(cat => cat.id === expense.categoryId);
    if (category) {
      onAddTransaction({
        desc: `${expense.name} (Manual Add)`,
        amount: expense.amount,
        type: 'Expense',
        date: new Date().toISOString().split('T')[0],
        categoryId: expense.categoryId,
        category: category.name,
        isRecurring: true
      });
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="recurring-expenses">
      <div className="section-header">
        <h2>Recurring Expenses</h2>
        <button 
          className="add-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Recurring
        </button>
      </div>

      {upcomingExpenses.length > 0 && (
        <div className="upcoming-section">
          <h3>Upcoming This Week</h3>
          <div className="upcoming-list">
            {upcomingExpenses.map(expense => {
              const category = categories.find(cat => cat.id === expense.categoryId);
              const daysUntil = getDaysUntilDue(expense.nextDue);
              
              return (
                <div key={expense.id} className="upcoming-item">
                  <div className="upcoming-info">
                    <div className="upcoming-icon" style={{ backgroundColor: category?.color }}>
                      {category?.icon || '💰'}
                    </div>
                    <div className="upcoming-details">
                      <h4>{expense.name}</h4>
                      <p>${expense.amount.toFixed(2)} • {category?.name}</p>
                    </div>
                  </div>
                  <div className="upcoming-due">
                    <span className={`due-badge ${daysUntil <= 0 ? 'overdue' : daysUntil <= 2 ? 'urgent' : ''}`}>
                      {daysUntil <= 0 ? 'Due Now' : `${daysUntil} days`}
                    </span>
                    <button 
                      className="add-now-btn"
                      onClick={() => handleAddNow(expense)}
                    >
                      Add Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showForm && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>{editingExpense ? 'Edit Recurring Expense' : 'Add Recurring Expense'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Expense Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Netflix Subscription"
                  required
                />
              </div>

              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="0.00"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData(prev => ({ ...prev, categoryId: parseInt(e.target.value) }))}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Frequency</label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value }))}
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description (Optional)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Additional notes..."
                  rows="3"
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={resetForm} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingExpense ? 'Update' : 'Add'} Recurring Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="recurring-list">
        {recurringExpenses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔄</div>
            <p>No recurring expenses set up yet. Add your first recurring expense to automate your budget tracking!</p>
          </div>
        ) : (
          recurringExpenses.map(expense => {
            const category = categories.find(cat => cat.id === expense.categoryId);
            const daysUntil = getDaysUntilDue(expense.nextDue);
            
            return (
              <div key={expense.id} className="recurring-item">
                <div className="recurring-info">
                  <div className="recurring-icon" style={{ backgroundColor: category?.color }}>
                    {category?.icon || '💰'}
                  </div>
                  <div className="recurring-details">
                    <h4>{expense.name}</h4>
                    <p>${expense.amount.toFixed(2)} • {expense.frequency} • {category?.name}</p>
                    <span className="next-due">Next due: {expense.nextDue}</span>
                  </div>
                </div>
                <div className="recurring-actions">
                  <button
                    onClick={() => handleEdit(expense)}
                    className="edit-btn"
                    title="Edit recurring expense"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="delete-btn"
                    title="Delete recurring expense"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <style jsx>{`
        .recurring-expenses {
          background: #f8fafc;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 32px;
          box-shadow: 0 2px 8px rgba(37,99,235,0.04);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .section-header h2 {
          color: #2563EB;
          font-size: 1.5rem;
          margin: 0;
        }

        .add-btn {
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .add-btn:hover {
          transform: translateY(-1px);
        }

        .upcoming-section {
          background: #fef3c7;
          border: 1px solid #fbbf24;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
        }

        .upcoming-section h3 {
          color: #92400e;
          margin: 0 0 12px 0;
          font-size: 1rem;
        }

        .upcoming-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .upcoming-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          padding: 12px;
          border-radius: 6px;
        }

        .upcoming-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .upcoming-icon {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          color: white;
        }

        .upcoming-details h4 {
          margin: 0 0 4px 0;
          font-size: 0.9rem;
          color: #1f2937;
        }

        .upcoming-details p {
          margin: 0;
          font-size: 0.8rem;
          color: #6b7280;
        }

        .upcoming-due {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
        }

        .due-badge {
          background: #e5e7eb;
          color: #374151;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .due-badge.urgent {
          background: #fbbf24;
          color: #92400e;
        }

        .due-badge.overdue {
          background: #ef4444;
          color: white;
        }

        .add-now-btn {
          background: #22c55e;
          color: white;
          border: none;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          cursor: pointer;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          padding: 24px;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-content h3 {
          color: #2563EB;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          color: #374151;
          margin-bottom: 6px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 1rem;
        }

        .form-group textarea {
          resize: vertical;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 24px;
        }

        .cancel-btn {
          background: #6b7280;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
        }

        .submit-btn {
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
        }

        .recurring-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
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

        .recurring-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          padding: 16px;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .recurring-info {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .recurring-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: white;
        }

        .recurring-details h4 {
          margin: 0 0 4px 0;
          color: #1f2937;
          font-size: 1rem;
        }

        .recurring-details p {
          margin: 0 0 4px 0;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .next-due {
          color: #3b82f6;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .recurring-actions {
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
          .recurring-item {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .recurring-actions {
            justify-content: center;
          }

          .upcoming-item {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .upcoming-due {
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default RecurringExpenses;