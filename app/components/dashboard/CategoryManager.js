import React, { useState } from 'react';
import { useBudget } from '../../context/BudgetContext';

const CategoryManager = () => {
  const { 
    categories, 
    budgets, 
    addCategory, 
    updateCategory, 
    deleteCategory, 
    setBudget 
  } = useBudget();

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: '💰',
    color: '#3B82F6'
  });
  const [budgetData, setBudgetData] = useState({});

  const categoryIcons = [
    '🍽️', '🚗', '⚡', '🎬', '🏥', '🛍️', '📚', '💸',
    '🏠', '📱', '✈️', '🎯', '💼', '🎮', '👕', '🍕'
  ];

  const categoryColors = [
    '#ef4444', '#f97316', '#eab308', '#22c55e',
    '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899',
    '#64748b', '#0f172a', '#7c2d12', '#166534'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
    } else {
      addCategory(formData);
    }

    resetForm();
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      icon: category.icon,
      color: category.color
    });
    setShowForm(true);
  };

  const handleDelete = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category? This will also remove its budget.')) {
      deleteCategory(categoryId);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', icon: '💰', color: '#3B82F6' });
    setEditingCategory(null);
    setShowForm(false);
  };

  const handleBudgetChange = (categoryId, amount) => {
    setBudgetData(prev => ({ ...prev, [categoryId]: amount }));
  };

  const handleBudgetSubmit = (categoryId) => {
    const amount = budgetData[categoryId];
    if (amount && parseFloat(amount) > 0) {
      setBudget(categoryId, amount);
      setBudgetData(prev => ({ ...prev, [categoryId]: '' }));
    }
  };

  return (
    <div className="category-manager">
      <div className="manager-header">
        <h2>Manage Categories</h2>
        <button 
          className="add-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Category
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>{editingCategory ? 'Edit Category' : 'Add New Category'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Category Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter category name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Icon</label>
                <div className="icon-grid">
                  {categoryIcons.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      className={`icon-btn ${formData.icon === icon ? 'selected' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, icon }))}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Color</label>
                <div className="color-grid">
                  {categoryColors.map(color => (
                    <button
                      key={color}
                      type="button"
                      className={`color-btn ${formData.color === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setFormData(prev => ({ ...prev, color }))}
                    />
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={resetForm} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingCategory ? 'Update' : 'Add'} Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="categories-list">
        {categories.length === 0 ? (
          <div className="empty-state">
            <p>No categories yet. Add your first category to get started!</p>
          </div>
        ) : (
          categories.map(category => (
            <div key={category.id} className="category-item">
              <div className="category-info">
                <div 
                  className="category-icon"
                  style={{ backgroundColor: category.color }}
                >
                  {category.icon}
                </div>
                <div className="category-details">
                  <h4>{category.name}</h4>
                  <div className="budget-section">
                    {budgets[category.id] ? (
                      <span className="current-budget">
                        Budget: ${budgets[category.id].amount.toFixed(2)}/month
                      </span>
                    ) : (
                      <span className="no-budget">No budget set</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="budget-input">
                <input
                  type="number"
                  placeholder="Set budget"
                  value={budgetData[category.id] || ''}
                  onChange={(e) => handleBudgetChange(category.id, e.target.value)}
                  min="0"
                  step="0.01"
                />
                <button
                  onClick={() => handleBudgetSubmit(category.id)}
                  className="set-budget-btn"
                  disabled={!budgetData[category.id]}
                >
                  Set
                </button>
              </div>

              <div className="category-actions">
                <button
                  onClick={() => handleEdit(category)}
                  className="edit-btn"
                  title="Edit category"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="delete-btn"
                  title="Delete category"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .category-manager {
          background: #f8fafc;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 32px;
          box-shadow: 0 2px 8px rgba(37,99,235,0.04);
        }

        .manager-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .manager-header h2 {
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
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
        }

        .form-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 1rem;
        }

        .icon-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 8px;
        }

        .icon-btn {
          background: #f3f4f6;
          border: 2px solid transparent;
          border-radius: 8px;
          padding: 8px;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .icon-btn:hover {
          background: #e5e7eb;
        }

        .icon-btn.selected {
          border-color: #3B82F6;
          background: #dbeafe;
        }

        .color-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 8px;
        }

        .color-btn {
          width: 40px;
          height: 40px;
          border: 3px solid transparent;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .color-btn:hover {
          transform: scale(1.1);
        }

        .color-btn.selected {
          border-color: #1f2937;
          transform: scale(1.1);
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

        .categories-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .empty-state {
          text-align: center;
          padding: 40px;
          color: #6b7280;
        }

        .category-item {
          display: flex;
          align-items: center;
          gap: 16px;
          background: white;
          padding: 16px;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .category-info {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
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

        .current-budget {
          color: #22c55e;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .no-budget {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .budget-input {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .budget-input input {
          width: 100px;
          padding: 6px 8px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          font-size: 0.875rem;
        }

        .set-budget-btn {
          background: #22c55e;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 0.875rem;
          cursor: pointer;
          font-weight: 500;
        }

        .set-budget-btn:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .category-actions {
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
          .category-item {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .budget-input {
            justify-content: center;
          }

          .category-actions {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default CategoryManager;