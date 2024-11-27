import React, { useEffect, useState } from "react";
import TitleSession from "../shared/orther/TitleSession";
import { useParams, useRouter } from "next/navigation";
import { OrderFormData } from "@/constants/data";
import InputDate from "../shared/input/InputDate";
import InputEdit from "../shared/input/InputEdit";
import InputSelection from "../shared/input/InputSelection";
import ButtonFunction from "../shared/button/ButtonFunction";
import { Icon } from "@iconify/react/dist/iconify.js";

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

const EditOrderForm = () => {
  const { id } = useParams<{ id: string }>(); // Ensure id is a string

  // Remove the 'edit-' prefix if present
  const cleanId = typeof id === "string" ? id.replace("edit-", "") : "";

  const [updatedItem, setUpdatedItem] = useState<Order | null>(null); // Store the edited item
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
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
        setSelectedValue(sanitizedItem.createBy); // Đặt giá trị ban đầu cho CreateBy
      }
    }
  }, [cleanId]);

  // Calculate the total amount
  const calculateTotal = (items: OrderItem[]): number => {
    return items.reduce(
      (total, item) => total + item.unitPrice * item.level,
      0
    );
  };

  // Handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updatedItem) {
      setUpdatedItem({
        ...updatedItem,
        [e.target.name]: e.target.value, // Dynamically update the value
        total: calculateTotal(updatedItem.numberOfItem), // Update total on any change
      });
    }
  };

  // Handle date changes from the DatePicker
  const handleDateChange = (date: string) => {
    if (updatedItem) {
      setUpdatedItem({
        ...updatedItem,
        createAt: new Date(date),
        total: calculateTotal(updatedItem.numberOfItem), // Update total on date change
      });
    }
  };

  // Handle selection change
  const handleSelectionChange = (value: string) => {
    setSelectedValue(value);
    if (updatedItem) {
      setUpdatedItem({
        ...updatedItem,
        createBy: value, // Cập nhật giá trị createBy
        total: calculateTotal(updatedItem.numberOfItem), // Update total
      });
    }
  };

  const handleOrderChange = (index: number, field: string, value: string) => {
    if (updatedItem) {
      const updatedOrders = updatedItem.numberOfItem.map((order, i) => {
        if (i === index) {
          return { ...order, [field]: value };
        }
        return order;
      });
      setUpdatedItem({
        ...updatedItem,
        numberOfItem: updatedOrders,
        total: calculateTotal(updatedOrders), // Recalculate total after item change
      });
    }
  };

  const handleDeleteItemOrder = (index: number) => {
    if (updatedItem) {
      const updatedIngredients = updatedItem.numberOfItem.filter(
        (_, i) => i !== index
      );
      setUpdatedItem({
        ...updatedItem,
        numberOfItem: updatedIngredients,
        total: calculateTotal(updatedIngredients), // Recalculate total after item deletion
      });
    }
  };

  const handleSave = () => {
    if (updatedItem) {
      // Here you would save the updated item, typically sending to an API or context
      console.log("Saved product: ", updatedItem);
    }
  };

  const handlePaymentMethodChange = (method: 0 | 1) => {
    if (updatedItem) {
      setUpdatedItem({
        ...updatedItem,
        paymentMethod: method, // Update the payment method
        total: calculateTotal(updatedItem.numberOfItem), // Recalculate total
      });
    }
  };

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

        <InputDate
          titleInput="Created at"
          width="w-full"
          value={updatedItem ? updatedItem.createAt.toISOString() : ""}
          onChange={handleDateChange}
        />

        <InputSelection
          titleInput="Created by"
          options={["S101", "S102", "S103", "S104", "S105"]}
          width="w-full" // Chiều rộng custom (có thể thay bằng lớp Tailwind CSS)
          value={selectedValue}
          onChange={handleSelectionChange}
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
              <th className="px-4 py-2 text-left text-sm font-semibold text-primary-100">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {updatedItem?.numberOfItem?.map((order, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 text-sm text-gray-800">
                  <input
                    type="text"
                    value={order.name}
                    onChange={(e) =>
                      handleOrderChange(index, "name", e.target.value)
                    }
                    className="w-full"
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  <input
                    type="number"
                    value={order.level}
                    onChange={(e) =>
                      handleOrderChange(index, "level", e.target.value)
                    }
                    className="w-full"
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  <input
                    type="text"
                    value={order.unit}
                    onChange={(e) =>
                      handleOrderChange(index, "unit", e.target.value)
                    }
                    className="w-full"
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  <input
                    type="number"
                    value={order.unitPrice}
                    onChange={(e) =>
                      handleOrderChange(index, "unitPrice", e.target.value)
                    }
                    className="w-full"
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {order.unitPrice * order.level}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  <Icon
                    icon="gg:trash"
                    className="text-[15px] text-text-color cursor-pointer"
                    onClick={() => handleDeleteItemOrder(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-full flex justify-end p-3">
          <ButtonFunction
            icon="ic:round-add"
            event={handleSave}
            title="Add"
            width="w-[67px]"
            background="bg-active-background"
            border_radius="rounded-xl"
            text_color="text-primary-100"
            border_color="bg-active-background"
          />
        </div>
        <div className="text-right p-4 font-semibold">
          <p className="text-[20px] font-semibold">
            Total: {updatedItem?.total}
          </p>
        </div>
      </div>

      <TitleSession icon="fluent:payment-32-regular" title="Payment Method" />
      <div className="w-full flex items-center pt-4">
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
            onChange={() => handlePaymentMethodChange(1)} // Visa
          />
          <Icon icon="logos:visaelectron" />
          <p>Visa ending in 6622</p>
        </div>
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
            onChange={() => handlePaymentMethodChange(0)} // Cash
          />
          <Icon icon="heroicons-outline:cash" className="text-[24px]" />
          <p>Cash</p>
        </div>
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
        <ButtonFunction
          event={handleSave}
          title="Save"
          width="w-[86px]"
          background="bg-dark-green"
          border_radius="rounded-[8px]"
          height="h-[36px]"
          text_color="text-white"
          border_color="border-active-background"
        />
      </div>
    </div>
  );
};

export default EditOrderForm;
