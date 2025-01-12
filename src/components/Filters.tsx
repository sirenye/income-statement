import React from "react";

interface FiltersProps {
  validYears: number[];
  startYear: number | null;
  endYear: number | null;
  setStartYear: (year: number) => void;
  setEndYear: (year: number) => void;
  revenueFilterOptions: [number, number][];
  setSelectedRevenueRange: (range: [number, number] | null) => void;
  netIncomeFilterOptions: [number, number][];
  setSelectedNetIncomeRange: (range: [number, number] | null) => void;
}

const Filters: React.FC<FiltersProps> = ({
  validYears,
  startYear,
  endYear,
  setStartYear,
  setEndYear,
  revenueFilterOptions,
  setSelectedRevenueRange,
  netIncomeFilterOptions,
  setSelectedNetIncomeRange,
}) => {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center mb-4 px-4 sm:px-8">
      {/* Start Year Filter */}
      <div className="w-full sm:w-auto">
        <label className="font-medium text-gray-700">Start Year:</label>
        <select
          value={startYear || ""}
          onChange={(e) => setStartYear(Number(e.target.value))}
          className="block w-full p-2 mt-1 border border-gray-300 rounded-lg"
        >
          {validYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* End Year Filter */}
      <div className="w-full sm:w-auto">
        <label className="font-medium text-gray-700">End Year:</label>
        <select
          value={endYear || ""}
          onChange={(e) => setEndYear(Number(e.target.value))}
          className="block w-full p-2 mt-1 border border-gray-300 rounded-lg"
        >
          {validYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Revenue Filter */}
      <div className="w-full sm:w-auto">
        <label className="font-medium text-gray-700">
          Revenue Range (in billions):
        </label>
        <select
          onChange={(e) => {
            const value = e.target.value;
            if (value === "all") setSelectedRevenueRange(null);
            else {
              const [min, max] = value.split("-").map(Number);
              setSelectedRevenueRange([min, max]);
            }
          }}
          className="block w-full p-2 mt-1 border border-gray-300 rounded-lg"
        >
          <option value="all">All</option>
          {revenueFilterOptions.map(([min, max]) => (
            <option key={`${min}-${max}`} value={`${min}-${max}`}>
              {min} - {max}
            </option>
          ))}
        </select>
      </div>

      {/* Net Income Filter */}
      <div className="w-full sm:w-auto">
        <label className="font-medium text-gray-700">
          Net Income Range (in billions):
        </label>
        <select
          onChange={(e) => {
            const value = e.target.value;
            if (value === "all") setSelectedNetIncomeRange(null);
            else {
              const [min, max] = value.split("-").map(Number);
              setSelectedNetIncomeRange([min, max]);
            }
          }}
          className="block w-full p-2 mt-1 border border-gray-300 rounded-lg"
        >
          <option value="all">All</option>
          {netIncomeFilterOptions.map(([min, max]) => (
            <option key={`${min}-${max}`} value={`${min}-${max}`}>
              {min} - {max}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;