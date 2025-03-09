/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import FilterPopover from "./components/Filter";
import Pagination from "./components/PaginationButtons";
import { TableProps } from "./types";

function Table({
  rowData,
  columns,
  onSort,
  onFilter,
  onPageChange,
  loading = false,
  pagination,
  onDelete,
  onEdit,
}: TableProps<any>) {
  const [sort, setSort] = useState<string>("");
  const [filter, setFilter] = useState<Record<string, string>>();

  const toggleSort = (key: string) => {
    if (sort === key) {
      setSort("");
    } else {
      setSort(key);
    }
  };

  const filterHandler = (key: string, value: string) => {
    if (value === "") {
      return setFilter((prev) => {
        const newFilter = { ...prev };
        delete newFilter[key];
        return newFilter;
      });
    }
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const handlePageChange = (page: number) => {
    onPageChange?.(page);
  };

  useEffect(() => {
    onSort?.(sort);
  }, [sort, onSort]);

  useEffect(() => {
    onFilter?.(filter || {});
  }, [filter, onFilter]);

  return (
    <div className="relative overflow-x-auto h-140 w-full flex flex-col justify-center items-center">
      <div className="w-full bg-blue-600 h-2 dark:bg-gray-900">
        {loading ? (
          <div className="bg-blue-600 h-2 w-full animate-pulse" />
        ) : null}
      </div>
      <div className="w-full h-130 overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((column) => (
                <th scope="col" className="px-6 py-3" key={column.key}>
                  <div className="flex items-center gap-1">
                    {column.label}
                    {column.sortable ? (
                      <svg
                        className="w-3 h-3 ms-1.5 cursor-pointer"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill={sort === column.key ? "#406fff" : "currentColor"}
                        viewBox="0 0 24 24"
                        onClick={() => toggleSort(column.key)}
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    ) : null}
                    {column.filter && column.filter.type ? (
                      <FilterPopover
                        filterType={column.filter.type}
                        options={column.filter.options}
                        onFilterChange={(value) =>
                          filterHandler(column.key, value)
                        }
                      />
                    ) : null}
                  </div>
                </th>
              ))}
              {onEdit || onDelete ? (
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {rowData.map((eachRow: any, index: number) => (
              <tr
                key={eachRow.id || index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                {columns.map((column) => (
                  <td
                    scope="row"
                    className="px-6 py-4"
                    key={`${column.key}-${eachRow.id}`}
                  >
                    {eachRow[column.key]}
                  </td>
                ))}
                {onEdit || onDelete ? (
                  <td className="px-6 py-4">
                    {onEdit ? (
                      <button
                        onClick={() => onEdit?.(eachRow)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Edit
                      </button>
                    ) : null}
                    {onDelete ? (
                      <button
                        onClick={() => onDelete?.(eachRow)}
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                      >
                        Delete
                      </button>
                    ) : null}
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination && pagination.totalPages > 1 ? (
        <div className="py-6 ">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Table;
