import React, { useState, useEffect } from 'react';
import { useBudget } from '../../context/BudgetContext';

const TransactionForm = ({ 
  onAddTransaction, 
  onUpdateTransaction, 
  editingTransaction, 
  setEditingTransaction 
}) => {
  const { categories } = useBudget();
  
  const [formData, setFormData] = useState({
    desc: '',
    amount: '',
    type: 'Income',
    date: new Date().toISOString().split('T')[0], // Today's date
    categoryId: ''
  });


  // Update form when editing transaction changes
  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        desc: editingTransaction.desc,
        amount: editingTransaction.amount.toString(),
        type: editingTransaction.type,
        date: editingTransaction.date,
        categoryId: editingTransaction.categoryId || ''
      });
    } else {
      // Reset form when not editing
      setFormData({
        desc: '',
        amount: '',
        type: 'Income',
        date: new Date().toISOString().split('T')[0],
        categoryId: ''
      });
    }
  }, [editingTransaction]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'categoryId' ? parseInt(value) || '' : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const numericAmount = parseFloat(formData.amount);
    if (!formData.desc.trim() || isNaN(numericAmount) || numericAmount <= 0) {
      return;
    }

    // For expenses, require category selection
    if (formData.type === 'Expense' && !formData.categoryId) {
      alert('Please select a category for expenses');
      return;
    }
    const transactionData = {
      desc: formData.desc.trim(),
      amount: numericAmount,
      type: formData.type,
      date: formData.date,
      categoryId: formData.categoryId || null
    };

    if (editingTransaction) {
      onUpdateTransaction(editingTransaction.id, transactionData);
      setEditingTransaction(null);
    } else {
      onAddTransaction(transactionData);
    }

    // Reset form
    setFormData({
      desc: '',
      amount: '',
      type: 'Income',
      date: new Date().toISOString().split('T')[0],
      categoryId: ''
    });
  };

  const handleCancel = () => {
    setEditingTransaction(null);
    setFormData({
      desc: '',
      amount: '',
      type: 'Income',
      date: new Date().toISOString().split('T')[0],
      categoryId: ''
    });
  };

  // Filter categories based on transaction type
  const availableCategories = categories.filter(category => {
    // For now, show all categories for expenses, none for income
    // You can modify this logic based on your needs
    return formData.type === 'Expense';
  });
  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <h2>{editingTransaction ? 'Edit Transaction' : 'Add Transaction'}</h2>
      
      <div className="form-group">
        <label htmlFor="desc">Description</label>
        <input
          id="desc"
          name="desc"
          type="text"
          placeholder="e.g., Salary, Groceries"
          value={formData.desc}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          name="amount"
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
          min="0.01"
          step="0.01"
        />
      </div>

      <div className="form-group">
        <label htmlFor="type">Transaction Type</label>
        <select id="type" name="type" value={formData.type} onChange={handleChange}>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      {formData.type === 'Expense' && (
        <div className="form-group">
          <label htmlFor="categoryId">Category</label>
          <select 
            id="categoryId" 
            name="categoryId" 
            value={formData.categoryId} 
            onChange={handleChange} 
            required={formData.type === 'Expense'}
          >
            <option value="">Select a category</option>
            {availableCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
          {availableCategories.length === 0 && (
            <p className="category-hint">
              No categories available. Create categories first to assign expenses.
            </p>
          )}
        </div>
      )}

      <div className="form-buttons">
        <button type="submit" className="submit-btn">
          {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
        </button>
        {editingTransaction && (
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>

      <style jsx>{`
        .transaction-form {
          background: #f8fafc;
          padding: 24px;
          border-radius: 12px;
          margin-bottom: 32px;
          box-shadow: 0 2px 8px rgba(37,99,235,0.04);
        }

        .transaction-form h2 {
          color: #2563EB;
          margin-bottom: 20px;
          font-size: 1.5rem;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          font-weight: 500;
          color: #2563EB;
          margin-bottom: 6px;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 10px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #2563EB;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .category-hint {
          color: #6b7280;
          font-size: 0.875rem;
          margin-top: 4px;
          font-style: italic;
        }
        .form-buttons {
          display: flex;
          gap: 12px;
          margin-top: 20px;
        }

        .submit-btn {
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 12px 24px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease;
          flex: 1;
        }

        .submit-btn:hover {
          transform: translateY(-1px);
        }

        .cancel-btn {
          background: #6b7280;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 12px 24px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .cancel-btn:hover {
          background: #4b5563;
        }
      `}</style>
    </form>
  );
};

export default TransactionForm;