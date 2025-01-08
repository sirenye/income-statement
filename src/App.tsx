//import React from 'react';
//import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

interface IncomeStatement {
  date: string;
  revenue: number;
  netIncome: number;
  grossProfit: number;
  eps: number;
  operatingIncome: number;
}

function App() {
  const [data, setData] = useState<IncomeStatement[]>([]);
  const [validYears, setValidYears] = useState<number[]>([]);
  const [startYear, setStartYear] = useState<number | null>(null);
  const [endYear, setEndYear] = useState<number | null>(null);
  // Filter data based on the date
  const[filteredData, setFilteredData] = useState<IncomeStatement[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=jOz8KSdiXywEq5SMlJNREg4BXP7fuA1H'
        );
        const jsonData = await response.json();

        // Sort Data by date (latest to earliest)
        const sortedData = [...jsonData].sort((a, b) => b.date.localeCompare(a.date));

        // Extract unique years from the data
        const years = Array.from(
          new Set(sortedData.map((item) => parseInt(item.date.split('-')[0])))
        ).sort((a, b) => a - b); // Sort years in ascending order

        setValidYears(years);
        setStartYear(years[0]);
        setEndYear(years[years.length - 1]);
        setData(sortedData); // Save the data in state
        setFilteredData(sortedData);//Initialize filtered data with all rows

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filtering according to date logic
  useEffect(() => {
    if (startYear != null && endYear != null) {
      setFilteredData(
        data.filter((item) => {
          const year = parseInt(item.date.split('-')[0]);
          return year >= startYear && year <= endYear;
        })
      );
    }
  }, [data, startYear, endYear]);

  return (
    <div>
      <h1>Income Statement Viewer</h1>
      {/* Dropdowns for filtering */}
      <div>
        <label>Start Year:</label>
        <select
          value={startYear || ''}
          onChange={(e) => setStartYear(Number(e.target.value))}
          >
          {validYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
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