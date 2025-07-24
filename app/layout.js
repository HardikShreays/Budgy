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

  // Default categories for different transaction types
  const categories = {
    Income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other Income'],
    Expense: ['Food', 'Transport', 'Utilities', 'Entertainment', 'Healthcare', 'Shopping', 'Education', 'Other Expense']
  };

  // Update form when editing transaction changes
  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        desc: editingTransaction.desc,
        amount: editingTransaction.amount.toString(),
        type: editingTransaction.type,
        date: editingTransaction.date,
        category: editingTransaction.category
      });
    } else {
      // Reset form when not editing
      setFormData({
        desc: '',
        amount: '',
        type: 'Income',
        date: new Date().toISOString().split('T')[0],
        category: ''
      });
    }
  }, [editingTransaction]);

  // Update category when type changes
  useEffect(() => {
    if (!editingTransaction) {
      setFormData(prev => ({
        ...prev,
        category: categories[prev.type][0] // Set first category as default
      }));
    }
  }, [formData.type, editingTransaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const numericAmount = parseFloat(formData.amount);
    if (!formData.desc.trim() || isNaN(numericAmount) || numericAmount <= 0 || !formData.category) {
      return;
    }

    const transactionData = {
      desc: formData.desc.trim(),
      amount: numericAmount,
      type: formData.type,
      date: formData.date,
      category: formData.category
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
      category: categories.Income[0]
    });
  };

  const handleCancel = () => {
    setEditingTransaction(null);
    setFormData({
      desc: '',
      amount: '',
      type: 'Income',
      date: new Date().toISOString().split('T')[0],
      category: categories.Income[0]
    });
  };

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

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select id="category" name="category" value={formData.category} onChange={handleChange} required>
          {categories[formData.type].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

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
        }
      `}</style>
    </form>
  );
};

export default TransactionForm;