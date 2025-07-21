"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/Authcontext';
import { useRouter } from 'next/navigation';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const Dashboard = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const [transactions, setTransactions] = useState([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Income");

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!desc.trim() || isNaN(numericAmount) || numericAmount <= 0) return;

    setTransactions([
      ...transactions,
      {
        id: Date.now(),
        desc: desc.trim(),
        amount: numericAmount,
        type,
      },
    ]);
    setDesc("");
    setAmount("");
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const barData = {
    labels: ['Income', 'Expense'],
    datasets: [{
      label: 'Amount',
      data: [totalIncome, totalExpense],
      backgroundColor: ['#22c55e', '#ef4444'],
      borderRadius: 6,
    }],
  };

  const doughnutData = {
    labels: ['Income', 'Expense'],
    datasets: [{
      data: [totalIncome > 0 || totalExpense > 0 ? totalIncome : 1, totalExpense],
      backgroundColor: ['#22c55e', '#ef4444'],
      borderColor: '#1f2937',
      borderWidth: 2,
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="charts-grid">
        <div className="chart-card">
          <h2>Income vs Expense (Bar)</h2>
          <Bar data={barData} options={chartOptions} />
        </div>
        <div className="chart-card">
          <h2>Income vs Expense (Doughnut)</h2>
          <Doughnut data={doughnutData} options={{...chartOptions, plugins: { legend: { position: 'bottom' }}}} />
        </div>
      </div>
      <form onSubmit={handleAddTransaction} className="dashboard-form">
        <h2>Add Transaction</h2>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          placeholder="e.g., Salary, Groceries"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="0.01"
          step="0.01"
        />
        <label htmlFor="type">Transaction Type</label>
        <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <button type="submit" className="add-btn">Add Transaction</button>
      </form>
      <div className="summary">
        <h2>Financial Summary</h2>
        <p><strong>Balance:</strong> {currencyFormatter.format(balance)}</p>
        <p className="income-text">Total Income: {currencyFormatter.format(totalIncome)}</p>
        <p className="expense-text">Total Expenses: {currencyFormatter.format(totalExpense)}</p>
      </div>
      <div className="history">
        <h2>Transaction History</h2>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <ul className="transaction-list">
            {transactions.map((t) => (
              <li key={t.id} className={t.type === 'Income' ? 'income-item' : 'expense-item'}>
                <div className="transaction-details">
                  <strong>{t.desc}</strong>
                  <span>{currencyFormatter.format(t.amount)}</span>
                </div>
                <button onClick={() => handleDelete(t.id)} className="delete-btn">X</button>
              </li>
            ))}
          </ul>
        )}
      </div>
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
        }
        .chart-card {
          flex: 1 1 300px;
          background: #f1f5f9;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(37,99,235,0.05);
        }
        .dashboard-form {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          background: #f8fafc;
          padding: 24px;
          border-radius: 10px;
          margin-bottom: 32px;
          box-shadow: 0 2px 8px rgba(37,99,235,0.04);
        }
        .dashboard-form label {
          font-weight: 500;
          color: #2563EB;
        }
        .dashboard-form input, .dashboard-form select {
          padding: 0.7rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 1rem;
        }
        .dashboard-form input:focus, .dashboard-form select:focus {
          outline: none;
          border-color: #2563EB;
        }
        .add-btn {
          background: linear-gradient(135deg, #3B82F6, #2563EB);
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.8rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
          transition: background 0.2s;
        }
        .add-btn:hover {
          background: #2563EB;
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
        .history {
          background: #f8fafc;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(37,99,235,0.04);
        }
        .history h2 {
          margin-bottom: 10px;
          color: #2563EB;
        }
        .transaction-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .transaction-list li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .transaction-list li:last-child {
          border-bottom: none;
        }
        .income-item {
          background: #e7fbe9;
        }
        .expense-item {
          background: #fde7e7;
        }
        .transaction-details {
          display: flex;
          flex-direction: column;
        }
        .delete-btn {
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 4px 10px;
          font-size: 1rem;
          cursor: pointer;
          margin-left: 16px;
          transition: background 0.2s;
        }
        .delete-btn:hover {
          background: #b91c1c;
        }
        @media (max-width: 768px) {
          .dashboard-container {
            padding: 15px 5px;
          }
          .charts-grid {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;