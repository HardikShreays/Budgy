"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const BudgetContext = createContext();

export function BudgetProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState({});
  const [recurringExpenses, setRecurringExpenses] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCategories = localStorage.getItem('budgy-categories');
    const savedBudgets = localStorage.getItem('budgy-budgets');
    const savedRecurring = localStorage.getItem('budgy-recurring');

    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    }

    if (savedBudgets) {
      try {
        setBudgets(JSON.parse(savedBudgets));
      } catch (error) {
        console.error('Error loading budgets:', error);
      }
    }

    if (savedRecurring) {
      try {
        setRecurringExpenses(JSON.parse(savedRecurring));
      } catch (error) {
        console.error('Error loading recurring expenses:', error);
      }
    }
  }, []);

  // Save categories to localStorage
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem('budgy-categories', JSON.stringify(categories));
    }
  }, [categories]);

  // Save budgets to localStorage
  useEffect(() => {
    if (Object.keys(budgets).length > 0) {
      localStorage.setItem('budgy-budgets', JSON.stringify(budgets));
    }
  }, [budgets]);

  // Save recurring expenses to localStorage
  useEffect(() => {
    if (recurringExpenses.length > 0) {
      localStorage.setItem('budgy-recurring', JSON.stringify(recurringExpenses));
    }
  }, [recurringExpenses]);

  const addCategory = (categoryData) => {
    const newCategory = {
      id: Date.now(),
      name: categoryData.name,
      icon: categoryData.icon || '💰',
      color: categoryData.color || '#3B82F6',
      createdAt: new Date().toISOString()
    };
    setCategories(prev => [...prev, newCategory]);
    return newCategory;
  };

  const updateCategory = (id, categoryData) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, ...categoryData } : cat
    ));
  };

  const deleteCategory = (id) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    // Remove budget for this category
    setBudgets(prev => {
      const newBudgets = { ...prev };
      delete newBudgets[id];
      return newBudgets;
    });
  };

  const setBudget = (categoryId, amount, period = 'monthly') => {
    setBudgets(prev => ({
      ...prev,
      [categoryId]: {
        amount: parseFloat(amount),
        period,
        updatedAt: new Date().toISOString()
      }
    }));
  };

  const addRecurringExpense = (expenseData) => {
    const newExpense = {
      id: Date.now(),
      ...expenseData,
      nextDue: calculateNextDue(expenseData.frequency, expenseData.startDate),
      createdAt: new Date().toISOString()
    };
    setRecurringExpenses(prev => [...prev, newExpense]);
    return newExpense;
  };

  const updateRecurringExpense = (id, expenseData) => {
    setRecurringExpenses(prev => prev.map(expense => 
      expense.id === id ? { 
        ...expense, 
        ...expenseData,
        nextDue: calculateNextDue(expenseData.frequency, expenseData.startDate)
      } : expense
    ));
  };

  const deleteRecurringExpense = (id) => {
    setRecurringExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const calculateNextDue = (frequency, startDate) => {
    const start = new Date(startDate);
    const now = new Date();
    
    switch (frequency) {
      case 'weekly':
        while (start <= now) {
          start.setDate(start.getDate() + 7);
        }
        break;
      case 'monthly':
        while (start <= now) {
          start.setMonth(start.getMonth() + 1);
        }
        break;
      case 'yearly':
        while (start <= now) {
          start.setFullYear(start.getFullYear() + 1);
        }
        break;
      default:
        return startDate;
    }
    
    return start.toISOString().split('T')[0];
  };

  const checkBudgetAlerts = (transactions) => {
    const newAlerts = [];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Get current month's transactions
    const monthlyTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear &&
             t.type === 'Expense';
    });

    // Check each category's spending against budget
    categories.forEach(category => {
      const budget = budgets[category.id];
      if (!budget) return;

      const spent = monthlyTransactions
        .filter(t => t.categoryId === category.id)
        .reduce((sum, t) => sum + t.amount, 0);

      const percentage = (spent / budget.amount) * 100;

      if (percentage >= 100) {
        newAlerts.push({
          id: `budget-exceeded-${category.id}`,
          type: 'error',
          category: category.name,
          message: `Budget exceeded for ${category.name}! Spent $${spent.toFixed(2)} of $${budget.amount.toFixed(2)}`,
          percentage: percentage.toFixed(1)
        });
      } else if (percentage >= 80) {
        newAlerts.push({
          id: `budget-warning-${category.id}`,
          type: 'warning',
          category: category.name,
          message: `Warning: ${percentage.toFixed(1)}% of budget used for ${category.name}`,
          percentage: percentage.toFixed(1)
        });
      }
    });

    setAlerts(newAlerts);
    return newAlerts;
  };

  const dismissAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const getCategoryById = (id) => {
    return categories.find(cat => cat.id === id);
  };

  const getBudgetByCategory = (categoryId) => {
    return budgets[categoryId];
  };

  const getUpcomingRecurring = (days = 7) => {
    const upcoming = new Date();
    upcoming.setDate(upcoming.getDate() + days);
    
    return recurringExpenses.filter(expense => {
      const dueDate = new Date(expense.nextDue);
      return dueDate <= upcoming;
    });
  };

  return (
    <BudgetContext.Provider value={{
      categories,
      budgets,
      recurringExpenses,
      alerts,
      addCategory,
      updateCategory,
      deleteCategory,
      setBudget,
      addRecurringExpense,
      updateRecurringExpense,
      deleteRecurringExpense,
      checkBudgetAlerts,
      dismissAlert,
      getCategoryById,
      getBudgetByCategory,
      getUpcomingRecurring
    }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
}