"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import InputEdit from "../shared/input/InputEdit";
import ButtonFunction from "../shared/button/ButtonFunction";
import { useState, useEffect } from "react";
import TitleSession from "../shared/orther/TitleSession";
import { format } from "date-fns";

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

type EditStoreProps = {
  isDetailInvoiceOverlayOpen: boolean;
  selectedInvoice: Invoice | null;
  setIsDetailInvoiceOverlayOpen: (isOpen: boolean) => void;
};

const DetailOrdering: React.FC<EditStoreProps> = ({
  isDetailInvoiceOverlayOpen,
  selectedInvoice,
  setIsDetailInvoiceOverlayOpen,
}) => {
  const [updatedItem, setUpdatedItem] = useState<Invoice | null>(null); // Store the edited item

  useEffect(() => {
    if (selectedInvoice) {
      setUpdatedItem({ ...selectedInvoice });
    }
  }, [selectedInvoice]);
  const handleChange = () => {};

  return (
    <>
      {isDetailInvoiceOverlayOpen && selectedInvoice && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[798px] h-[700px] flex flex-col rounded-lg p-4 gap-2">
            <div className="flex w-full justify-between">
              <p className="text-[24px] font-semibold text-text-dark-500">
                Detail Store
              </p>
              <Icon
                icon="iconoir:cancel"
                className="text-[24px] text-text-color cursor-pointer"
                onClick={() => setIsDetailInvoiceOverlayOpen(false)}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <TitleSession
                icon="mingcute:information-line"
                title="Information"
              />
              <div className="w-full grid grid-cols-2 gap-2 gap-x-10">
                <InputEdit
                  titleInput="ID"
                  width="w-full"
                  value={updatedItem?.id || ""}
                  onChange={() => {}}
                  name="id"
                  placeholder="Enter ID"
                />

                <InputEdit
                  titleInput="Create At"
                  width="w-full"
                  value={
                    updatedItem?.createAt
                      ? format(updatedItem.createAt, "PPP")
                      : ""
                  }
                  onChange={() => {}}
                  name="createAt"
                />

                <InputEdit
                  titleInput="Supplier"
                  width="w-full"
                  value={updatedItem?.supplier || ""}
                  onChange={() => {}}
                  name="supplier"
                />

                <InputEdit
                  titleInput="Phone"
                  width="w-full"
                  value={updatedItem?.phone || ""}
                  onChange={() => {}}
                  name="phone"
                  placeholder="Enter Phone"
                />
              </div>
              <InputEdit
                width="w-full"
                titleInput="Location"
                value={updatedItem?.location || ""}
                onChange={() => {}}
              />

              <TitleSession
                icon="mingcute:information-line"
                title="Store Account"
              />

              <div className="w-full">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left text-sm font-semibold text-primary-100">
                        Name
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-primary-100">
                        Level
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-primary-100">
                        Unit
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-primary-100">
                        Unit Price
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-primary-100">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {updatedItem?.detailImport?.map((order, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-2 text-sm text-gray-800">
                          <input
                            type="text"
                            value={order.name || ""}
                            className="w-full"
                            onChange={handleChange}
                          />
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          <input
                            type="number"
                            value={order.level || 0}
                            className="w-full"
                            onChange={handleChange}
                          />
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          <input
                            type="text"
                            value={order.unit || ""}
                            className="w-full"
                            onChange={handleChange}
                          />
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          <input
                            type="number"
                            value={order.unitPrice || 0}
                            className="w-full"
                            onChange={handleChange}
                          />
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {order.unitPrice * order.level || 0}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="text-right p-4 font-semibold">
                  <p className="text-[20px] font-semibold">
                    Total: {updatedItem?.total}
                  </p>
                </div>
              </div>

              <div className="w-full flex justify-end p-2 gap-4">
                <ButtonFunction
                  event={() => setIsDetailInvoiceOverlayOpen(false)}
                  title="Cancel"
                  width="w-[85px]"
                  border_radius="rounded-xl"
                  text_color="text-text-dark-500"
                  border_color="border-border-color"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailOrdering;
