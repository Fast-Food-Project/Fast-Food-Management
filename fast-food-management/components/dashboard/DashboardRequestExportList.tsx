"use client";
import React, { useEffect, useState } from "react";
import { RequestExportList } from "../../constants/data";
import { format } from "date-fns";
import LabelStatus from "../shared/label/LabelStatus";
import { PaginationProps } from "@/types/pagination";
import PaginationUI from "../shared/orther/Pagination";
import Table from "../shared/orther/Table";
import { Icon } from "@iconify/react";

type UserTable = {
  id: string;
  createAt: Date;
  createBy: string;
  orderId: string;
  status: number;
};

const columns = [
  { header: "ID", accessor: "id" },
  {
    header: "Created At",
    accessor: "createAt",
  },
  {
    header: "Created By",
    accessor: "createBy",
  },
  { header: "Order Id", accessor: "orderId" },
  { header: "Status", accessor: "status" },
  { header: "Action", accessor: "action" },
];

const DashboardRequestExportList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = RequestExportList.slice(startIndex, endIndex);
  const [isMounted, setIsMounted] = useState(false);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginationUI: PaginationProps = {
    currentPage,
    setCurrentPage,
    indexOfLastItem,
    indexOfFirstItem,
    totalPages: Math.ceil(RequestExportList.length / itemsPerPage),
    dataLength: RequestExportList.length,
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
          {format(item.createAt, "PPP")}
        </p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">{item.createBy}</p>
      </td>
      <td className="hidden px-4 py-2 lg:table-cell">
        <p className="text-base text-text-dark-500">{item.orderId}</p>
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
              title="Confirmed"
            />
          )}
        </div>
      </td>
      <td>
        <div className="flex gap-4 items-start justify-start px-4">
          <Icon
            icon="fluent:edit-16-regular"
            className="text-[18px] hover:cursor-pointer"
            onClick={handleEdit}
          />
          <Icon
            icon="gg:trash"
            className="text-[18px] hover:cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      </td>
    </tr>
  );

  const handleEdit = () => {};

  const handleDelete = () => {};

  return (
    <div className="flex size-full flex-col text-base">
      <div className=" mt-4 w-full rounded-md shadow-md">
        {/* TOP */}
        <p className="text-[22px] font-bold text-text-dark-500 p-3">
          Requests Exportation List
        </p>

        {/* LIST */}
        <div className="w-full px-4">
          <Table columns={columns} renderRow={renderRow} data={currentData} />
        </div>
        {/* PAGINATION */}
        <div className=" mt-4 flex items-center justify-center p-4 text-sm text-text-dark-500 md:justify-between">
          <PaginationUI paginationUI={paginationUI} />
        </div>
      </div>
    </div>
  );
};

export default DashboardRequestExportList;
