import React from "react";

interface FiltersProps {
  validYears: number[];
  startYear: number | null;
  endYear: number | null;
  setStartYear: (year: number) => void;
  setEndYear: (year: number) => void;
  selectedRevenueRange: [number, number] | null;
  setSelectedRevenueRange: (range: [number, number] | null) => void;
  selectedNetIncomeRange: [number, number] | null;
  setSelectedNetIncomeRange: (range: [number, number] | null) => void;
}

const Filters: React.FC<FiltersProps> = ({
  validYears,
  startYear,
  endYear,
  setStartYear,
  setEndYear,
  selectedRevenueRange,
  setSelectedRevenueRange,
  selectedNetIncomeRange,
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

        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={selectedRevenueRange ? selectedRevenueRange[0] : ""}
            onChange={(e) => {
              const min = parseFloat(e.target.value);
              setSelectedRevenueRange([
                min,
                selectedRevenueRange ? selectedRevenueRange[1] : Infinity,
              ]);
            }}
            className="block w-full p-2 mt-1 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Max"
            value={selectedRevenueRange ? selectedRevenueRange[1] : ""}
            onChange={(e) => {
              const max = parseFloat(e.target.value);
              setSelectedRevenueRange([
                selectedRevenueRange ? selectedRevenueRange[0] : 0,
                max,
              ]);
            }}
            className="block w-full p-2 mt-1 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Net Income Filter */}
      <div className="w-full sm:w-auto">
        <label className="font-medium text-gray-700">
          Net Income Range (in billions):
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={selectedNetIncomeRange ? selectedNetIncomeRange[0] : ""}
            onChange={(e) => {
              const min = parseFloat(e.target.value);
              setSelectedNetIncomeRange([
                min,
                selectedNetIncomeRange ? selectedNetIncomeRange[1] : Infinity,
              ]);
            }}
            className="block w-full p-2 mt-1 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Max"
            value={selectedNetIncomeRange ? selectedNetIncomeRange[1] : ""}
            onChange={(e) => {
              const max = parseFloat(e.target.value);
              setSelectedNetIncomeRange([
                selectedNetIncomeRange ? selectedNetIncomeRange[0] : 0,
                max,
              ]);
            }}
            className="block w-full p-2 mt-1 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;