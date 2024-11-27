"use client";
import React, { useEffect, useState } from "react";
import Title from "../shared/orther/Title";
import { Icon } from "@iconify/react/dist/iconify.js";
import LabelStatus from "../shared/label/LabelStatus";
import { format } from "date-fns";
import { OrderFormData } from "@/constants/data";
import { PaginationProps } from "@/types/pagination";
import FilterButton from "../shared/button/FilterButton";
import PaginationUI from "../shared/orther/Pagination";
import SearchBar from "../shared/orther/SearchBar";
import Table from "../shared/orther/Table";
import { useRouter } from "next/navigation";
import LabelDashboard from "../shared/label/LabelDashboard";

interface OrderItem {
  name: string;
  level: number; // Số lượng item trong đơn hàng
  unit: string; // Đơn vị (e.g., "Pieces", "Box")
  unitPrice: number; // Giá tiền trên mỗi đơn vị
}

interface Order {
  id: string; // Mã đơn hàng
  createAt: Date; // Ngày tạo đơn
  storeName: string; // Tên cửa hàng
  total: number; // Tổng số tiền của đơn hàng
  status: 0 | 1 | 2; // Trạng thái đơn hàng: 0 - Pending, 1 - Confirmed, 2 - Delivered
  createBy: string; // Người tạo đơn (ID của người tạo)
  numberOfItem: OrderItem[]; // Danh sách các item trong đơn hàng
  quantity: number; // Tổng số lượng item
  paymentMethod: 0 | 1; // Phương thức thanh toán: 0 - Cash, 1 - Online
}

const columns = [
  { header: "ID", accessor: "id" },
  {
    header: "Created At",
    accessor: "createAt",
  },
  {
    header: "Store Name",
    accessor: "storeName",
  },
  { header: "Total", accessor: "total" },
  { header: "Status", accessor: "status" },
  { header: "Action", accessor: "action" },
];

const OrderFormList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exportList, setExportList] = useState(OrderFormData); // Track the filtered/export list
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

  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/order-form/edit/${id}`);
  };

  const handleDetail = (id: string) => {
    router.push(`/order-form/${id}`);
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

    const updatedList = OrderFormData.filter((item) => item.id !== id);

    setExportList(updatedList);
  };

  const renderRow = (item: Order) => (
    <tr key={item.id} className="my-4 border-t border-gray-300 text-sm  ">
      <td className="px-4 py-2 hover:cursor-pointer">
        <div onClick={() => handleDetail(item.id)}>
          <h3 className="text-base">{item.id}</h3>
        </div>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">
          {format(item.createAt, "PPP")}
        </p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">{item.storeName}</p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">
          {`${item.total.toLocaleString("vi-VN")} VND`}
        </p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <div className="text-base text-text-dark-500">
          {item.status === 0 ? (
            <LabelStatus
              background="bg-light-red"
              text_color="text-dark-red"
              title="Pending"
            />
          ) : item.status === 1 ? (
            <LabelStatus
              background="bg-light-yellow"
              text_color="text-dark-yellow"
              title="In progress"
            />
          ) : (
            <LabelStatus
              background="bg-light-green"
              text_color="text-dark-green"
              title="Delivered"
            />
          )}
        </div>
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

  const handleSearch = (searchTerm: string) => {
    console.log("Search term:", searchTerm); // Add logic for handling search
  };

  const handleSetFilter = (filter: string) => {
    console.log("Selected filter:", filter); // Update state or trigger API calls based on filter
  };

  const filterStatus = ["Date", "Name", "Id"];

  return (
    <div className="w-full flex flex-col gap-4">
      <Title title="Order Form"></Title>
      <div className="w-full grid grid-cols-4 gap-x-20">
        <LabelDashboard
          title="Total forms"
          icon="solar:sale-outline"
          value={OrderFormData.length}
          type={1}
          width="w-full"
        />
        <LabelDashboard
          title="Delivered"
          icon="hugeicons:star"
          value={OrderFormData.filter((order) => order.status === 2).length}
          type={1}
          width="w-full"
        />
        <LabelDashboard
          title="In Progress"
          icon="tabler:progress-check"
          value={OrderFormData.filter((order) => order.status === 1).length}
          type={1}
          width="w-full"
        />
        <LabelDashboard
          title="Pending"
          icon="material-symbols-light:pending-actions-rounded"
          value={OrderFormData.filter((order) => order.status === 0).length}
          type={1}
          width="w-full"
        />
      </div>
      <div className="flex gap-2 pt-4 pb-2">
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
    </div>
  );
};

export default OrderFormList;
