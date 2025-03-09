"use client";
import React, { useCallback, useEffect, useState } from "react";
import { COL_DATA } from "./constants";
import { createPort } from "../apis/Ports/createPort";
import { deletePort } from "../apis/Ports/deletePort";
import { getPortsData, QueryParams } from "../apis/Ports/getPorts";
import { PaginationProps } from "../components/Table/types";
import { PortData } from "../types/ports";
import { updatePort } from "../apis/Ports/updatePort";
import Modal from "../components/Modal";
import PortForm from "./components/Form";
import SearchComponent from "../components/Search";
import Table from "../components/Table";

export default function Ports() {
  const [filter, setFilter] = useState<Record<string, string>>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationProps>({
    currentPage: 1,
    totalPages: 0,
  });
  const [ports, setPorts] = useState<PortData[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedPort, setSelectedPort] = useState<PortData | null>(null);
  const [sort, setSort] = useState<string>("");

  const fetchPorts = useCallback(async () => {
    const queryParams: QueryParams = {
      _page: pagination.currentPage,
      _limit: 10,
      ...filter,
    };
    if (searchText) queryParams.q = searchText;
    if (sort) queryParams._sort = sort;
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
  }, [filter, pagination.currentPage, searchText, sort]);

  const onSearch = (text: string) => {
    setSearchText(text);
  };

  const handleCreate = (data: PortData) => {
    const NewData = { ...data, id: Date.now().toString() };
    createPort(NewData);
    setIsModalOpen(false); // Close modal after creation
    fetchPorts();
  };

  const handleUpdate = (data: PortData) => {
    updatePort(data);
    setIsModalOpen(false);
    fetchPorts();
  };

  const handleDelete = (data: PortData) => {
    deletePort(data.id);
    fetchPorts();
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
    fetchPorts();
  }, [searchText, sort, filter, pagination.currentPage, fetchPorts]);

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
