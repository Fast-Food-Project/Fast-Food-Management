"use client";
import React, { useEffect, useState } from "react";

import { InvoiceData } from "@/constants/data";

import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { PaginationProps } from "@/types/pagination";
import FilterButton from "../shared/button/FilterButton";
import PaginationUI from "../shared/orther/Pagination";
import SearchBar from "../shared/orther/SearchBar";
import Table from "../shared/orther/Table";
import DetailInvoice from "./DetailInvoice";
import EditInvoice from "./EditInvoice";

interface DetailImport {
  name: string; // Tên sản phẩm
  level: number; // Số lượng nhập
  unit: string; // Đơn vị (Pieces, Kgs, etc.)
  unitPrice: number; // Giá mỗi đơn vị
}

interface Invoice {
  id: string; // Mã hóa đơn
  createAt: Date; // Ngày tạo hóa đơn
  supplier: string; // Nhà cung cấp
  total: number; // Tổng số tiền
  phone: string; // Số điện thoại liên hệ
  location: string; // Địa chỉ
  detailImport: DetailImport[]; // Chi tiết nhập hàng
  createBy: string; // Tên nhân viên tạo hóa đơn
  orderId: string; // Mã đơn hàng liên quan
  storeName: string; // Tên cửa hàng
  status: number; // Trạng thái (0: mới, 1: xử lý, 2: hoàn tất)
  storeId: string; // Mã cửa hàng
  staffId: "S101" | "S102" | "S103" | "S104" | "S105"; // Mã nhân viên
  typeOfProblem: string; // Loại vấn đề gặp phải
}

const columns = [
  { header: "ID", accessor: "id" },
  { header: "Created At", accessor: "createAt" },
  { header: "Supplier", accessor: "supplier" },
  { header: "Total", accessor: "total" },
  { header: "Action", accessor: "action" },
];

const ImportInventoryTableList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exportList, setExportList] = useState(InvoiceData); // Track the filtered/export list
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

  const [isDetailInvoiceOverlayOpen, setIsDetailInvoiceOverlayOpen] =
    useState(false);
  const [isEditInvoiceOverlayOpen, setIsEditInvoiceOverlayOpen] =
    useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const handleEdit = (product: Invoice) => {
    setSelectedInvoice(product); // Lưu thông tin sản phẩm cần chỉnh sửa
    setIsEditInvoiceOverlayOpen(true); // Mở modal
  };

  const handleDetail = (product: Invoice) => {
    setSelectedInvoice(product); // Lưu thông tin sản phẩm cần chỉnh sửa
    setIsDetailInvoiceOverlayOpen(true); // Mở modal
  };

  const filterStatus = ["Date", "Name", "Id"];

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm("Confirm delete this item?");

    if (!confirmDelete) {
      return;
    }

    const updatedList = exportList.filter((item) => item.id !== id);

    setExportList(updatedList);
  };

  const handleExport = () => {};

  const handleSearch = (searchTerm: string) => {
    const filteredData = InvoiceData.filter(
      (item) =>
        item.id.includes(searchTerm) || item.createBy.includes(searchTerm)
    );
    setExportList(filteredData);
  };

  const handleSetFilter = (filter: string) => {
    let filteredList = [...InvoiceData];
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

  const renderRow = (item: Invoice) => (
    <tr key={item.id} className="my-4 border-t border-gray-300 text-sm">
      <td className="px-4 py-2">
        <div
          onClick={() => handleDetail(item)}
          className="hover:cursor-pointer"
        >
          <h3 className="text-base">{item.id}</h3>
        </div>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">
          {format(new Date(item.createAt), "PPP")}
        </p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">{item.supplier}</p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">{`${item.total.toLocaleString()} VND`}</p>
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
          <Icon
            icon="hugeicons:file-export"
            className="text-[18px] hover:cursor-pointer"
            onClick={() => handleExport()} // Pass the id to handleDelete
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
      </div>
      <div className="w-full px-4">
        <Table columns={columns} renderRow={renderRow} data={currentData} />
      </div>
      <div className="mt-4 flex items-center justify-center p-4 text-sm text-text-dark-500 md:justify-between">
        <PaginationUI paginationUI={paginationUI} />
      </div>

      <DetailInvoice
        isDetailInvoiceOverlayOpen={isDetailInvoiceOverlayOpen}
        selectedInvoice={selectedInvoice}
        setIsDetailInvoiceOverlayOpen={setIsDetailInvoiceOverlayOpen}
      />

      <EditInvoice
        isEditInvoiceOverlayOpen={isEditInvoiceOverlayOpen}
        selectedInvoice={selectedInvoice}
        setIsEditInvoiceOverlayOpen={setIsEditInvoiceOverlayOpen}
      />
    </div>
  );
};

export default ImportInventoryTableList;
