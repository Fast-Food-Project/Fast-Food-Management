"use client";
import React, { useEffect, useState } from "react";
import { StoresData } from "@/constants/data";
import { PaginationProps } from "@/types/pagination";
import ButtonFunction from "../shared/button/ButtonFunction";
import FilterButton from "../shared/button/FilterButton";
import LabelStatus from "../shared/label/LabelStatus";
import PaginationUI from "../shared/orther/Pagination";
import SearchBar from "../shared/orther/SearchBar";
import { format } from "date-fns";
import Table from "../shared/orther/Table";
import { Icon } from "@iconify/react/dist/iconify.js";
import Title from "../shared/orther/Title";
import AddStore from "./AddStore";
import DetailStore from "./DetailStore";
import EditStore from "./EditStore";

type StoreTable = {
  id: string;
  storeName: string;
  email: string;
  phone: string;
  signUpDate: Date;
  status: number;
  nation: string;
  city: string;
  district: string;
  location: string;
  orderQuantity: number;
  accountName: string;
};

const columns = [
  { header: "ID", accessor: "id" },
  {
    header: "Store  Name",
    accessor: "storeName",
  },
  {
    header: "Email",
    accessor: "email",
  },
  { header: "Phone", accessor: "phone" },
  { header: "Sign-up date", accessor: "signUpDate" },
  { header: "Status", accessor: "status" },
  { header: "Action", accessor: "action" },
];

const StoresList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exportList, setExportList] = useState(StoresData); // Track the filtered/export list
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

  const [isDetailStoreOverlayOpen, setIsDetailStoreOverlayOpen] =
    useState(false);
  const [isEditStoreOverlayOpen, setIsEditStoreOverlayOpen] = useState(false);
  const [isAddStoreOverlayOpen, setIsAddStoreOverlayOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreTable | null>(null);

  const handleAdd = () => {
    setIsAddStoreOverlayOpen(!isAddStoreOverlayOpen);
  };

  const handleEdit = (product: StoreTable) => {
    setSelectedStore(product); // Lưu thông tin sản phẩm cần chỉnh sửa
    setIsEditStoreOverlayOpen(true); // Mở modal
  };

  const handleDetail = (product: StoreTable) => {
    setSelectedStore(product); // Lưu thông tin sản phẩm cần chỉnh sửa
    setIsDetailStoreOverlayOpen(true); // Mở modal
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm("Confirm delete this item?");

    if (!confirmDelete) {
      return;
    }

    const updatedList = StoresData.filter((item) => item.id !== id);

    setExportList(updatedList);
  };

  const renderRow = (item: StoreTable) => (
    <tr key={item.id} className="my-4 border-t border-gray-300 text-sm  ">
      <td className="px-4 py-2 hover:cursor-pointer">
        <div onClick={() => handleDetail(item)}>
          <h3 className="text-base">{item.id}</h3>
        </div>
      </td>

      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">{item.storeName}</p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">{item.email}</p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">{item.phone}</p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">
          {format(item.signUpDate, "PPP")}
        </p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <div className="text-base text-text-dark-500">
          {item.status === 0 ? (
            <LabelStatus
              background="bg-light-yellow"
              text_color="text-dark-yellow"
              title="Inactive"
            />
          ) : (
            <LabelStatus
              background="bg-light-green"
              text_color="text-dark-green"
              title="Active"
            />
          )}
        </div>
      </td>
      <td>
        <div className="flex gap-4 items-start justify-start px-4">
          <Icon
            icon="fluent:edit-16-regular"
            className="text-[18px] hover:cursor-pointer"
            onClick={() => handleEdit(item)}
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

  const handleSearch = (searchTerm: string) => {
    console.log("Search term:", searchTerm); // Add logic for handling search
  };

  const handleSetFilter = (filter: string) => {
    console.log("Selected filter:", filter); // Update state or trigger API calls based on filter
  };

  const filterStatus = ["Date", "Name", "Id"];

  return (
    <div className="w-full flex flex-col gap-2">
      <Title title="Products">
        <ButtonFunction
          event={handleAdd}
          width="w-[135px]"
          height="h-[36px]"
          border_color="border-primary-100"
          text_color="text-primary-100"
          icon="ic:round-add"
          title="Add store"
        />
      </Title>
      {/* Search and Filter Section */}
      <div className="flex gap-2">
        <SearchBar onSearch={handleSearch} />
        <FilterButton status_title={filterStatus} SetFilter={handleSetFilter} />
      </div>
      <div className="w-full px-4">
        <Table columns={columns} renderRow={renderRow} data={currentData} />
      </div>
      {/* PAGINATION */}
      <div className=" mt-4 flex items-center justify-center p-4 text-sm text-text-dark-500 md:justify-between">
        <PaginationUI paginationUI={paginationUI} />
      </div>
      <DetailStore
        isDetailStoreOverlayOpen={isDetailStoreOverlayOpen}
        selectedStore={selectedStore}
        setIsDetailStoreOverlayOpen={setIsDetailStoreOverlayOpen}
      />

      <EditStore
        isEditStoreOverlayOpen={isEditStoreOverlayOpen}
        selectedStore={selectedStore}
        setIsEditStoreOverlayOpen={setIsEditStoreOverlayOpen}
      />

      <AddStore
        isAddStoreOverlayOpen={isAddStoreOverlayOpen}
        setIsAddStoreOverlayOpen={setIsAddStoreOverlayOpen}
      />
    </div>
  );
};

export default StoresList;
