import React from "react";

interface TableProps {
  data: {
    date: string;
    revenue: number;
    netIncome: number;
    grossProfit: number;
    eps: number;
    operatingIncome: number;
  }[];
  sortField: string | null;
  sortOrder: "asc" | "desc";
  handleSort: (field: keyof TableProps["data"][0]) => void;
}

const Table: React.FC<TableProps> = ({ data, sortField, sortOrder, handleSort }) => {
  return (
    <div className="overflow-x-auto px-4 sm:px-8">
      <table className="w-full text-xs sm:text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-4 py-2 sm:px-6 sm:py-3 cursor-pointer"
              onClick={() => handleSort("date")}
            >
              <div className="flex items-center">
                Date {sortField === "date" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
              </div>
            </th>
            <th
              scope="col"
              className="px-4 py-2 sm:px-6 sm:py-3 cursor-pointer"
              onClick={() => handleSort("revenue")}
            >
              <div className="flex items-center">
                Revenue {sortField === "revenue" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
              </div>
            </th>
            <th
              scope="col"
              className="px-4 py-2 sm:px-6 sm:py-3 cursor-pointer"
              onClick={() => handleSort("netIncome")}
            >
              <div className="flex items-center">
                Net Income {sortField === "netIncome" ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
              </div>
            </th>
            <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">Gross Profit</th>
            <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">EPS</th>
            <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3">Operating Income</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.date} className="bg-white border-b">
              <td className="px-4 py-2 sm:px-6 sm:py-3">{item.date}</td>
              <td className="px-4 py-2 sm:px-6 sm:py-3">{item.revenue.toFixed(2)}</td>
              <td className="px-4 py-2 sm:px-6 sm:py-3">{item.netIncome.toFixed(2)}</td>
              <td className="px-4 py-2 sm:px-6 sm:py-3">{item.grossProfit.toFixed(2)}</td>
              <td className="px-4 py-2 sm:px-6 sm:py-3">{item.eps.toFixed(2)}</td>
              <td className="px-4 py-2 sm:px-6 sm:py-3">{item.operatingIncome.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
