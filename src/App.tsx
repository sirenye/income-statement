import "./App.css";
import React, { useEffect, useState } from "react";
import Filters from "./components/Filters";
import Table from "./components/Table";

// Define the structure of an income statement record
interface IncomeStatement {
  date: string;
  revenue: number;
  netIncome: number;
  grossProfit: number;
  eps: number;
  operatingIncome: number;
}

function App() {
  // State to hold teh fetched data and filtered data
  const [data, setData] = useState<IncomeStatement[]>([]);
  const [filteredData, setFilteredData] = useState<IncomeStatement[]>([]);

  // Filter-related state
  const [validYears, setValidYears] = useState<number[]>([]);
  const [startYear, setStartYear] = useState<number | null>(null);
  const [endYear, setEndYear] = useState<number | null>(null);
  const [selectedRevenueRange, setSelectedRevenueRange] = useState<[number, number] | null>([0, Infinity]);
  const [selectedNetIncomeRange, setSelectedNetIncomeRange] = useState<[number, number] | null>([0, Infinity]);

  // Sorting-related state
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Fetch data on initial load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=jOz8KSdiXywEq5SMlJNREg4BXP7fuA1H"
        );
        const jsonData = await response.json();

        // Sort data by date (latest to earliest)
        const sortedData = [...jsonData].sort((a, b) => b.date.localeCompare(a.date));

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

        // Update state with fetched and processed data
        setValidYears(years);
        setStartYear(years[0]);
        setEndYear(years[years.length - 1]);
        setData(convertedData); 
        setFilteredData(convertedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filtering logic: Applies Filters to the data whenever filter values change
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
      filtered = filtered.filter((item) => item.revenue >= min && item.revenue <= max);
    }

    // Filter by net income range
    if (selectedNetIncomeRange) {
      const [min, max] = selectedNetIncomeRange;
      filtered = filtered.filter((item) => item.netIncome >= min && item.netIncome <= max);
    }

    // Update the filtered data state
    setFilteredData(filtered);
  }, [data, startYear, endYear, selectedRevenueRange, selectedNetIncomeRange]);

  // Sorting logic: Sort the filtered data based on the selected field and order
  const handleSort = (field: keyof IncomeStatement) => {
    // Toggle the sort order between ascending and descending
    const newOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);

    // Perform the sorting
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[field] < b[field]) return newOrder === "asc" ? -1 : 1;
      if (a[field] > b[field]) return newOrder === "asc" ? 1 : -1;
      return 0;
    });

    // Update  the filtered data state with sorted data
    setFilteredData(sortedData); 
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-600 mb-6 pt-6">
        Apple Income Statement Viewer
      </h1>
      {/* Filters Component */}
      <Filters
        validYears={validYears}
        startYear={startYear}
        endYear={endYear}
        setStartYear={setStartYear}
        setEndYear={setEndYear}
        selectedRevenueRange={selectedRevenueRange}
        setSelectedRevenueRange={setSelectedRevenueRange}
        selectedNetIncomeRange={selectedNetIncomeRange} 
        setSelectedNetIncomeRange={setSelectedNetIncomeRange}
      />
      {/* Table Component */}
      <Table
        data={filteredData}
        sortField={sortField}
        sortOrder={sortOrder}
        handleSort={handleSort}
      />
    </div>
  );
}

export default App;

