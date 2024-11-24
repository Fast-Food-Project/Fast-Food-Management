"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../shared/orther/SearchBar";
import FilterButton from "../shared/button/FilterButton";
import AddPageButton from "../shared/button/AddPageButton";
import { InventoryListData } from "@/constants/data";
import { PaginationProps } from "@/types/pagination";
import Table from "../shared/orther/Table";
import PaginationUI from "../shared/orther/Pagination";
import LabelStatus from "../shared/label/LabelStatus";
import Overlay from "../shared/orther/Overlay";
import TitleSession from "../shared/orther/TitleSession";
import InputEdit from "../shared/input/InputEdit";
import InputSelection from "../shared/input/InputSelection";
import ButtonFunction from "../shared/button/ButtonFunction";
import Link from "next/link";

type UserTable = {
  id: string;
  name: string;
  stockLevel: number;
  unit: string;
  supplier: string;
  status: number;
};

const columns = [
  { header: "ID", accessor: "id" },
  {
    header: "Name",
    accessor: "name",
  },
  {
    header: "Stock Level",
    accessor: "stockLevel",
  },
  { header: "Unit", accessor: "unit" },
  { header: "Supplier", accessor: "supplier" },
  { header: "Status", accessor: "status" },
];

const InventoryList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = InventoryListData.slice(startIndex, endIndex);
  const [isMounted, setIsMounted] = useState(false);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginationUI: PaginationProps = {
    currentPage,
    setCurrentPage,
    indexOfLastItem,
    indexOfFirstItem,
    totalPages: Math.ceil(InventoryListData.length / itemsPerPage),
    dataLength: InventoryListData.length,
  };

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const renderRow = (item: UserTable) => (
    <tr key={item.id} className="my-4 border-t border-gray-300 text-sm ">
      <td className="px-4 py-2">
        <Link href={`/inventory/import-list/${item.id}`}>
          <h3 className="text-base">{item.id}</h3>
        </Link>
      </td>

      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">{item.name}</p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">{item.stockLevel}</p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">{item.unit}</p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">{item.supplier}</p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <div className="text-base text-text-dark-500">
          {item.status === 0 ? (
            <LabelStatus
              background="bg-light-red"
              text_color="text-dark-red"
              title="Out of stock"
            />
          ) : item.status === 1 ? (
            <LabelStatus
              background="bg-light-yellow"
              text_color="text-dark-yellow"
              title="Expired"
            />
          ) : (
            <LabelStatus
              background="bg-light-green"
              text_color="text-dark-green"
              title="In stock"
            />
          )}
        </div>
      </td>
    </tr>
  );

  const handleSearch = (searchTerm: string) => {
    console.log("Search term:", searchTerm); // Add logic for handling search
  };

  const handleSetFilter = (filter: string) => {
    console.log("Selected filter:", filter); // Update state or trigger API calls based on filter
  };

  const filterStatus = ["Date", "Name", "Id"];
  const unitList = ["kg", "g"];

  const handleCreate = () => {};

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Search and Filter Section */}
      <div className="flex gap-2">
        <SearchBar onSearch={handleSearch} />
        <FilterButton status_title={filterStatus} SetFilter={handleSetFilter} />
        <AddPageButton onClick={toggleOverlay} />
      </div>
      <div className="w-full px-4">
        <Table columns={columns} renderRow={renderRow} data={currentData} />
      </div>
      {/* PAGINATION */}
      <div className=" mt-4 flex items-center justify-center p-4 text-sm text-text-dark-500 md:justify-between">
        <PaginationUI paginationUI={paginationUI} />
      </div>
      <Overlay
        isOpen={isOverlayOpen}
        onClose={toggleOverlay}
        header="Add New Material"
        width="w-1/2"
      >
        <div className="w-full flex flex-col gap-4">
          <TitleSession
            icon="mingcute:information-line"
            title="Material Information"
          />
          <div className="w-full grid grid-cols-2 gap-4">
            <InputEdit titleInput="ID" width="w-[276px]" />
            <InputEdit titleInput="Material name" width="w-[276px]" />
            <InputEdit titleInput="Quantity" width="w-[276px]" />
            <InputSelection
              options={unitList}
              titleInput="Unit"
              width="w-[276px]"
            />
          </div>
          <TitleSession
            icon="solar:user-bold-duotone"
            title="Supplier information"
          />
          <div className="w-full grid grid-cols-2 gap-4">
            <InputEdit titleInput="Supplier name" width="w-[276px]" />
            <InputEdit titleInput="Phone" width="w-[276px]" />
          </div>
          <div className="w-full p-4 flex items-center justify-end gap-4">
            <ButtonFunction
              event={toggleOverlay}
              title="Cancel"
              width="w-[86px]"
              background="bg-white"
              border_radius="rounded-[8px]"
              height="h-[36px]"
              text_color="text-text-dark-500"
              border_color="border-gray-400"
            />
            <ButtonFunction
              event={handleCreate}
              title="Add"
              width="w-[86px]"
              background="bg-active-background"
              border_radius="rounded-[8px]"
              height="h-[36px]"
              icon="ic:round-add"
              text_color="text-primary-100"
              border_color="border-active-background"
            />
          </div>
        </div>
      </Overlay>
    </div>
  );
};

export default InventoryList;
