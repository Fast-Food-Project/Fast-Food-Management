"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../shared/orther/SearchBar";
import FilterButton from "../shared/button/FilterButton";
import AddPageButton from "../shared/button/AddPageButton";
import { RequestExportList } from "@/constants/data";
import { PaginationProps } from "@/types/pagination";
import Table from "../shared/orther/Table";
import PaginationUI from "../shared/orther/Pagination";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

type UserTable = {
  id: string;
  createAt: Date;
  createBy: string;
  quantity: number;
};

const columns = [
  { header: "ID", accessor: "id" },
  { header: "Created At", accessor: "createAt" },
  { header: "Created By", accessor: "createBy" },
  { header: "Quantity", accessor: "quantity" },
  { header: "Action", accessor: "action" },
];

const ImportList = () => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [exportList, setExportList] = useState(RequestExportList); // Track the filtered/export list
  const rowsPerPage = 8;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = exportList.slice(startIndex, endIndex);
  const [isMounted, setIsMounted] = useState(false);

  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const paginationUI: PaginationProps = {
    currentPage,
    setCurrentPage,
    indexOfLastItem,
    indexOfFirstItem,
    totalPages: Math.ceil(exportList.length / itemsPerPage),
    dataLength: exportList.length,
  };

  const filterStatus = ["Date", "Name", "Id"];

  const handleEdit = (id: string) => {
    router.push(`/inventory/import-list/edit/${id}`);
  };

  const handleAdd = () => {
    router.push(`/inventory/import-list/add-page`);
  };

  const handleDelete = (id: string) => {
    const updatedList = exportList.filter((item) => item.id !== id);
    setExportList(updatedList);
  };

  const handleSearch = (searchTerm: string) => {
    const filteredData = RequestExportList.filter(
      (item) =>
        item.id.includes(searchTerm) || item.createBy.includes(searchTerm)
    );
    setExportList(filteredData);
  };

  const handleSetFilter = (filter: string) => {
    let filteredList = [...RequestExportList];
    if (filter === "Date") {
      filteredList = filteredList.sort((a, b) =>
        a.createAt > b.createAt ? 1 : -1
      );
    } else if (filter === "Name") {
      filteredList = filteredList.sort((a, b) =>
        a.createBy.localeCompare(b.createBy)
      );
    }
    setExportList(filteredList);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const renderRow = (item: UserTable) => (
    <tr key={item.id} className="my-4 border-t border-gray-300 text-sm">
      <td className="px-4 py-2">
        <h3 className="text-base">{item.id}</h3>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">
          {format(new Date(item.createAt), "PPP")}
        </p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">{item.createBy}</p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">{item.quantity}</p>
      </td>
      <td>
        <div className="flex gap-4 items-start justify-start px-4">
          <Icon
            icon="fluent:edit-16-regular"
            className="text-[18px] hover:cursor-pointer"
            onClick={() => handleEdit(item.id)}
          />
          <Icon
            icon="gg:trash"
            className="text-[18px] hover:cursor-pointer"
            onClick={() => handleDelete(item.id)} // Pass the id to handleDelete
          />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex gap-2">
        <SearchBar onSearch={handleSearch} />
        <FilterButton status_title={filterStatus} SetFilter={handleSetFilter} />
        <AddPageButton onClick={handleAdd} />
      </div>
      <div className="w-full px-4">
        <Table columns={columns} renderRow={renderRow} data={currentData} />
      </div>
      <div className="mt-4 flex items-center justify-center p-4 text-sm text-text-dark-500 md:justify-between">
        <PaginationUI paginationUI={paginationUI} />
      </div>
    </div>
  );
};

export default ImportList;
