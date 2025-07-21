"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/Authcontext';
import { useRouter } from 'next/navigation';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import TransactionForm from '../components/dashboard/TransactionForm';
import TransactionList from '../components/dashboard/TransactionList';
import ChartCard from '../components/dashboard/ChartCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const Dashboard = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Load transactions from localStorage on component mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('budgy-transactions');
    if (savedTransactions) {
      try {
        setTransactions(JSON.parse(savedTransactions));
      } catch (error) {
        console.error('Error loading transactions:', error);
      }
    }
  }, []);

  // Save transactions to localStorage whenever transactions change
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('budgy-transactions', JSON.stringify(transactions));
    }
  }, [transactions]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  const handleAddTransaction = (transactionData) => {
    setTransactions([
      ...transactions,
      {
        id: Date.now(),
        ...transactionData,
      },
    ]);
  };

  const handleUpdateTransaction = (id, updatedData) => {
    setTransactions(transactions.map(t => 
      t.id === id ? { ...t, ...updatedData } : t
    ));
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // Memoized calculations for better performance
  const financialData = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpense;

    return { totalIncome, totalExpense, balance };
  }, [transactions]);

  // Chart data
  const chartData = useMemo(() => {
    const { totalIncome, totalExpense } = financialData;

    const barData = {
      labels: ['Income', 'Expense'],
      datasets: [{
        label: 'Amount',
        data: [totalIncome, totalExpense],
        backgroundColor: ['#22c55e', '#ef4444'],
        borderRadius: 6,
      }],
    };

    // Expense by category data
    const expensesByCategory = transactions
      .filter(t => t.type === 'Expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    const categoryColors = [
      '#ef4444', '#f97316', '#eab308', '#22c55e', 
      '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'
    ];

    const doughnutData = {
      labels: Object.keys(expensesByCategory),
      datasets: [{
        data: Object.values(expensesByCategory),
        backgroundColor: categoryColors.slice(0, Object.keys(expensesByCategory).length),
        borderColor: '#1f2937',
        borderWidth: 2,
      }],
    };

    return { barData, doughnutData };
  }, [transactions, financialData]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      
      <TransactionForm
        onAddTransaction={handleAddTransaction}
        onUpdateTransaction={handleUpdateTransaction}
        editingTransaction={editingTransaction}
        setEditingTransaction={setEditingTransaction}
      />

      <div className="charts-grid">
        <ChartCard
          title="Income vs Expense"
          type="bar"
          data={chartData.barData}
          options={chartOptions}
        />
        <ChartCard
          title="Expenses by Category"
          type="doughnut"
          data={chartData.doughnutData}
          options={{...chartOptions, plugins: { legend: { position: 'bottom' }}}}
        />
      </div>

      <div className="summary">
        <h2>Financial Summary</h2>
        <p><strong>Balance:</strong> {currencyFormatter.format(financialData.balance)}</p>
        <p className="income-text">Total Income: {currencyFormatter.format(financialData.totalIncome)}</p>
        <p className="expense-text">Total Expenses: {currencyFormatter.format(financialData.totalExpense)}</p>
      </div>

      <TransactionList
        transactions={transactions}
        onDeleteTransaction={handleDelete}
        onEditTransaction={handleEditTransaction}
        currencyFormatter={currencyFormatter}
      />

      <style jsx>{`
        .dashboard-container {
          max-width: 900px;
          margin: 40px auto;
          padding: 30px 20px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .dashboard-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 30px;
          color: #2563EB;
        }
        .charts-grid {
          display: flex;
          gap: 2rem;
          margin-bottom: 40px;
          flex-wrap: wrap;
          min-height: 350px;
        }
        .summary {
          background: #f1f5f9;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 32px;
          box-shadow: 0 2px 8px rgba(37,99,235,0.04);
        }
        .summary h2 {
          margin-bottom: 10px;
          color: #2563EB;
        }
        .income-text {
          color: #22c55e;
        }
        .expense-text {
          color: #ef4444;
        }
        @media (max-width: 768px) {
          .dashboard-container {
            padding: 15px 5px;
          }
          .charts-grid {
            flex-direction: column;
            gap: 1rem;
            min-height: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;