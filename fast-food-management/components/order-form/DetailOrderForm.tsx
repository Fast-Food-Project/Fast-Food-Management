import React, { useEffect, useState } from "react";
import TitleSession from "../shared/orther/TitleSession";
import { useParams, useRouter } from "next/navigation";
import { OrderFormData } from "@/constants/data";
import InputEdit from "../shared/input/InputEdit";
import ButtonFunction from "../shared/button/ButtonFunction";
import { Icon } from "@iconify/react/dist/iconify.js";
import { format } from "date-fns";

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

const DetailOrderForm = () => {
  const { id } = useParams<{ id: string }>(); // Ensure id is a string

  // Remove the 'edit-' prefix if present
  const cleanId = typeof id === "string" ? id.replace("edit-", "") : "";

  const [updatedItem, setUpdatedItem] = useState<Order | null>(null); // Store the edited item
  const router = useRouter(); // Initialize the router

  const handleCloseClick = () => {
    router.back(); // Navigate back to the previous page
  };

  const sanitizeStatus = (status: number): 0 | 1 | 2 => {
    return [0, 1, 2].includes(status) ? (status as 0 | 1 | 2) : 0;
  };

  const sanitizePaymentMethod = (paymentMethod: number): 0 | 1 => {
    return paymentMethod === 0 || paymentMethod === 1 ? paymentMethod : 0;
  };

  useEffect(() => {
    if (cleanId) {
      const foundItem = OrderFormData.find((item) => item.id === cleanId);
      if (foundItem) {
        const sanitizedItem = {
          ...foundItem,
          status: sanitizeStatus(foundItem.status), // Chuyển đổi status
          paymentMethod: sanitizePaymentMethod(foundItem.paymentMethod), // Chuyển đổi paymentMethod
        };
        setUpdatedItem(sanitizedItem);
      }
    }
  }, [cleanId]);

  // Handle input field changes
  const handleChange = () => {};

  return (
    <div className="w-full flex flex-col gap-4">
      <TitleSession icon="mingcute:information-line" title="Information" />

      <div className="w-full grid grid-cols-2 gap-4 gap-x-16 ">
        <InputEdit
          titleInput="ID"
          width="w-full"
          value={updatedItem?.id ?? ""}
          onChange={handleChange}
          name="id"
          placeholder="Enter ID"
        />

        <InputEdit
          titleInput="Created at"
          width="w-full"
          value={
            updatedItem?.createAt ? format(updatedItem.createAt, "PPP") : ""
          } // Fallback nếu createAt là undefined
          onChange={handleChange}
          name="createAt"
          placeholder="Enter Create Date"
        />
        <InputEdit
          titleInput="Created by"
          width="w-full" // Chiều rộng custom (có thể thay bằng lớp Tailwind CSS)
          value={updatedItem?.createBy ?? ""}
          onChange={handleChange}
          name="createBy"
          placeholder="Enter Creater"
        />

        <InputEdit
          titleInput="Store Name"
          width="w-full"
          value={updatedItem?.storeName ?? ""}
          onChange={handleChange}
          name="storeName"
          placeholder="Enter Store Name"
        />
      </div>

      <TitleSession icon="fluent:food-chicken-leg-20-regular" title="Detail" />
      <div className="w-full grid grid-cols-2 gap-x-10">
        <InputEdit
          titleInput="Number of items"
          width="w-full" // Chiều rộng custom (có thể thay bằng lớp Tailwind CSS)
          value={updatedItem?.numberOfItem.length.toString() ?? ""}
          onChange={handleChange}
          name="numberOfItem"
        />

        <InputEdit
          titleInput="Quantity"
          width="w-full"
          value={updatedItem?.quantity.toString() ?? ""}
          onChange={handleChange}
          name="quatity"
        />
      </div>
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
            {updatedItem?.numberOfItem?.map((order, index) => (
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

      <TitleSession icon="fluent:payment-32-regular" title="Payment Method" />
      <div className="w-full flex items-center pt-4">
        {updatedItem?.paymentMethod === 0 ? (
          <div
            className={`flex w-1/2 justify-center text-[16px] gap-2 ${
              updatedItem?.paymentMethod === 0
                ? "text-primary-500"
                : "text-gray-500"
            }`}
          >
            <input
              type="radio"
              checked={updatedItem?.paymentMethod === 0}
              onChange={handleChange}
            />
            <Icon icon="heroicons-outline:cash" className="text-[24px]" />
            <p>Cash</p>
          </div>
        ) : (
          <div
            className={`flex w-1/2 justify-start px-8 text-[16px] gap-2 ${
              updatedItem?.paymentMethod === 1
                ? "text-primary-500"
                : "text-gray-500"
            }`}
          >
            <input
              type="radio"
              checked={updatedItem?.paymentMethod === 1}
              onChange={handleChange}
            />
            <Icon icon="logos:visaelectron" />
            <p>Visa ending in 6622</p>
          </div>
        )}
      </div>
      <div className="w-full py-4 flex items-center justify-end gap-4">
        <ButtonFunction
          event={handleCloseClick}
          title="Cancel"
          width="w-[86px]"
          background="bg-white"
          border_radius="rounded-[8px]"
          height="h-[36px]"
          text_color="text-text-dark-500"
          border_color="border-gray-400"
        />
      </div>
    </div>
  );
};

export default DetailOrderForm;
