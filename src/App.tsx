//import React from 'react';
//import logo from './logo.svg';
import "./App.css";
import React, { useEffect, useState } from "react";

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
  const [filteredData, setFilteredData] = useState<IncomeStatement[]>([]);
 
  const [revenueFilterOptions, setRevenueFilterOptions] = useState<[number, number][]>([]); 
  const [selectedRevenueRange, setSelectedRevenueRange] = useState<[number, number] | null>(null);

  const [netIncomeFilterOptions, setNetIncomeFilterOptions] = useState<[number, number][]>([]); // Options for Net Income dropdown
  const [selectedNetIncomeRange, setSelectedNetIncomeRange] = useState<[number, number] | null>(null); // User-selected Net Income range

  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=jOz8KSdiXywEq5SMlJNREg4BXP7fuA1H"
        );
        const jsonData = await response.json();

        // Sort Data by date (latest to earliest)
        const sortedData = [...jsonData].sort((a, b) =>
          b.date.localeCompare(a.date)
        );

        // Extract unique years from the data
        const years = Array.from(
          new Set(sortedData.map((item) => parseInt(item.date.split("-")[0])))
        ).sort((a, b) => a - b); // Sort years in ascending order

        // Convert revenue and net income to billions
        const convertedData = sortedData.map((item: any) => ({
          ...item,
          revenue: item.revenue / 1e9, // Convert to billions
          netIncome: item.netIncome / 1e9, 
          grossProfit: item.grossProfit / 1e9,
          operatingIncome: item.operatingIncome / 1e9,
        }));

        // Calculate dynamic revenue ranges
        const minRevenue = Math.floor(
          Math.min(...convertedData.map((item) => item.revenue))
        );
        const maxRevenue = Math.ceil(
          Math.max(...convertedData.map((item) => item.revenue))
        );

        const revenueOptions: [number, number][] = [];
        for (let i = minRevenue; i < maxRevenue; i += 10) {
          revenueOptions.push([i, i + 10]);
        }

        // Calculate dynamic net income ranges
        const minNetIncome = Math.floor(
          Math.min(...convertedData.map((item) => item.netIncome))
        );
        const maxNetIncome = Math.ceil(
          Math.max(...convertedData.map((item) => item.netIncome))
        );

        const netIncomeOptions: [number, number][] = [];
        for (let i = minNetIncome; i < maxNetIncome; i += 10) {
          netIncomeOptions.push([i, i + 10]);
        }

        setValidYears(years);
        setStartYear(years[0]);
        setEndYear(years[years.length - 1]);
        setData(convertedData); // Save the data in state
        setFilteredData(convertedData); //Initialize filtered data with all rows
        setRevenueFilterOptions(revenueOptions); // Set dynamic revenue ranges
        setNetIncomeFilterOptions(netIncomeOptions); // Set dynamic net income ranges
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filtering logic
  useEffect(() => {
    let filtered = data;

    // Filter by year range
    if (startYear != null && endYear != null) {
      filtered = filtered.filter((item) => {
        const year = parseInt(item.date.split("-")[0]);
        return year >= startYear && year <= endYear;
      });
    }

    // Filter by revenue range
    if (selectedRevenueRange) {
      const [min, max] = selectedRevenueRange;
      filtered = filtered.filter(
        (item) => item.revenue >= min && item.revenue <= max
      );
    }

    // Filter by net income range
    if (selectedNetIncomeRange) {
      const [min, max] = selectedNetIncomeRange;
      filtered = filtered.filter(
        (item) => item.netIncome >= min && item.netIncome <= max
      );
    }

    setFilteredData(filtered);

  }, [data, startYear, endYear, selectedRevenueRange, selectedNetIncomeRange]);

  // Sorting Logic
  const handleSort = (field : keyof IncomeStatement) => {
    // Toggle between ascending and descending
    const newOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);

    // Sort filtered data
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[field] < b[field]) return newOrder === "asc" ? -1 : 1;
      if (a[field] > b[field]) return newOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredData(sortedData);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        Income Statement Viewer
      </h1>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSort("date")}
            >
              <div className="flex items-center">
                Date
                {sortField === "date" && (sortOrder === "asc" ? "↑" : "↓")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSort("revenue")}
            >
              <div className="flex items-center">
                Revenue
                {sortField === "revenue" && (sortOrder === "asc" ? "↑" : "↓")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSort("netIncome")}
            >
              <div className="flex items-center">
                Net Income
                {sortField === "netIncome" && (sortOrder === "asc" ? "↑" : "↓")}
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Gross Profit
            </th>
            <th scope="col" className="px-6 py-3">
              EPS
            </th>
            <th scope="col" className="px-6 py-3">
              Operating Income
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr
              key={item.date}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.date}
              </th>
              <td className="px-6 py-4">{item.revenue.toFixed(2)}</td>
              <td className="px-6 py-4">{item.netIncome.toFixed(2)}</td>
              <td className="px-6 py-4">{item.grossProfit.toFixed(2)}</td>
              <td className="px-6 py-4">{item.eps.toFixed(2)}</td>
              <td className="px-6 py-4">{item.operatingIncome.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

