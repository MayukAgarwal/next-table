"use client";
import React, { useEffect, useState } from "react";
import { COL_DATA } from "./constants";
import { getPortsData, PortData, QueryParams } from "../apis/Ports/getPorts";
import SearchComponent from "../components/Search";
import Table, { PaginationProps } from "../components/Table";
import Modal from "../components/Modal";
import PortForm from "./components/Form";

export default function Ports() {
  const [filter, setFilter] = useState<Record<string, string>>();
  const [loading, setLoading] = useState(false);
  const [ports, setPorts] = useState<PortData[]>([]);
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState<string>("");
  const [pagination, setPagination] = useState<PaginationProps>({
    currentPage: 1,
    totalPages: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPort, setSelectedPort] = useState<PortData | null>(null);

  const fetchPorts = async (queryParams: QueryParams) => {
    setLoading(true);
    try {
      const response = await getPortsData(queryParams);
      setPorts(response.data);
      setPagination((page) => {
        return {
          ...page,
          totalPages: response.lastPage,
        };
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = (text: string) => {
    setSearchText(text);
  };

  const handleCreate = (data: PortData) => {
    const NewData = { ...data, id: Date.now().toString() };
    setPorts((prev) => [...prev, NewData]);
    setIsModalOpen(false); // Close modal after creation
    // TODO: Handle Create API call
  };

  const handleUpdate = (data: PortData) => {
    setPorts((prev) => prev.map((port) => (port.id === data.id ? data : port)));
    setIsModalOpen(false); // Close modal after update
    // TODO: Handle Update API call
  };

  const handleDelete = (data: PortData) => {
    setPorts((prev) => prev.filter((port) => port.id !== data.id));
    // TODO: Handle Delete API call
  };

  const openModalForCreate = () => {
    setSelectedPort(null);
    setIsModalOpen(true);
  };

  const openModalForUpdate = (port: PortData) => {
    setSelectedPort(port);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const queryParams: QueryParams = {
      _page: pagination.currentPage,
      _limit: 10,
      ...filter,
    };
    if (searchText) queryParams.q = searchText;
    if (sort) queryParams._sort = sort;
    fetchPorts(queryParams);
  }, [searchText, sort, filter, pagination.currentPage]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col justify-between items-center w-full px-10 py-5">
        <h1 className="text-3xl bold text-white">Ports</h1>
        <div className="flex justify-between items-center w-full py-5">
          <SearchComponent onChange={(e) => onSearch(e.target.value)} />

          <button
            type="button"
            onClick={openModalForCreate}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add New Port
          </button>
        </div>
      </div>
      <Table
        columns={COL_DATA}
        rowData={ports}
        onSort={setSort}
        onFilter={setFilter}
        loading={loading}
        pagination={pagination}
        onPageChange={(page) =>
          setPagination((pageData) => {
            return {
              ...pageData,
              currentPage: page,
            };
          })
        }
        onEdit={openModalForUpdate}
        onDelete={handleDelete}
      />

      {/* Modal for creating/updating a port */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PortForm
          initialData={selectedPort || undefined}
          onSubmit={selectedPort ? handleUpdate : handleCreate}
          onDelete={selectedPort ? () => handleDelete(selectedPort) : undefined}
        />
      </Modal>
    </div>
  );
}
