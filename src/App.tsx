//import React from 'react';
//import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

interface IncomeStatement {
  data: string;
  revenue: number;
  netIncome: number;
  grossProfit: number;
  eps: number;
  operatingIncome: number;
}

function App() {
  const [data, setData] = useState<IncomeStatement[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=jOz8KSdiXywEq5SMlJNREg4BXP7fuA1H'
        );
        const jsonData = await response.json();
        setData(jsonData); // Save the data in state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Income Statement Viewer</h1>
      <table className="table-auto border-collapse border-gray-400">
        <thead>
          <tr>
            <th>Date</th>
            <th>Revenue</th>
            <th>Net Income</th>
            <th>Gross Profit</th>
            <th>EPS</th>
            <th>Operating Income</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.date}>
              <td>{item.date}</td>
              <td>{item.revenue}</td>
              <td>{item.netIncome}</td>
              <td>{item.grossProfit}</td>
              <td>{item.eps}</td>
              <td>{item.operatingIncome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;