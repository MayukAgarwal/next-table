import React, { useEffect, useRef, useState } from "react";

type FilterOption = {
  label: string;
  value: string;
};

type FilterPopoverProps = {
  filterType: "text" | "select";
  options?: FilterOption[];
  onFilterChange: (value: string) => void;
};

const FilterPopover: React.FC<FilterPopoverProps> = ({
  filterType,
  options,
  onFilterChange,
}) => {
  const [filterValue, setFilterValue] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
    onFilterChange(value);
  };

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    };

    if (isPopoverOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopoverOpen]);

  return (
    <div className="relative" ref={popoverRef}>
      {/* Popover Trigger Button */}
      <button
        type="button"
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={filterValue ? "#406fff" : "currentColor"}
          className="w-4 h-4"
          aria-hidden="true"
          viewBox="0 0 24 24"
        >
          <path
            d="M3 4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H19.4C19.9601 3 20.2401 3 20.454 3.10899C20.6422 3.20487 20.7951 3.35785 20.891 3.54601C21 3.75992 21 4.03995 21 4.6V6.33726C21 6.58185 21 6.70414 20.9724 6.81923C20.9479 6.92127 20.9075 7.01881 20.8526 7.10828C20.7908 7.2092 20.7043 7.29568 20.5314 7.46863L14.4686 13.5314C14.2957 13.7043 14.2092 13.7908 14.1474 13.8917C14.0925 13.9812 14.0521 14.0787 14.0276 14.1808C14 14.2959 14 14.4182 14 14.6627V17L10 21V14.6627C10 14.4182 10 14.2959 9.97237 14.1808C9.94787 14.0787 9.90747 13.9812 9.85264 13.8917C9.7908 13.7908 9.70432 13.7043 9.53137 13.5314L3.46863 7.46863C3.29568 7.29568 3.2092 7.2092 3.14736 7.10828C3.09253 7.01881 3.05213 6.92127 3.02763 6.81923C3 6.70414 3 6.58185 3 6.33726V4.6Z"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      {/* Popover Content */}
      <div
        className="absolute z-10 w-64 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-xs dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
        style={{
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          display: isPopoverOpen ? "" : "none",
        }}
      >
        <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Filter
          </h3>
        </div>
        <div className="px-3 py-2">
          {filterType === "select" && options && (
            <select
              onChange={(e) => handleFilterChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Select an option</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPopover;
