"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import InputEdit from "../shared/input/InputEdit";
import ButtonFunction from "../shared/button/ButtonFunction";
import { useState } from "react";
import InputDate from "../shared/input/InputDate";
import InputSelection from "../shared/input/InputSelection";
import TitleSession from "../shared/orther/TitleSession";

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

const staffMapping: Record<"S101" | "S102" | "S103" | "S104" | "S105", string> =
  {
    S101: "John",
    S102: "Jane",
    S103: "Alice",
    S104: "Bob",
    S105: "Emma",
  }; // Map staffId to staffName

const storeMapping: Record<
  "001" | "002" | "003" | "004" | "005" | "006" | "007" | "008" | "009" | "010",
  string
> = {
  "001": "Store A",
  "002": "Store B",
  "003": "Store C",
  "004": "Store D",
  "005": "Store E",
  "006": "Store F",
  "007": "Store G",
  "008": "Store H",
  "009": "Store I",
  "010": "Store J",
};

type EditStoreProps = {
  isAddInvoiceOverlayOpen: boolean;
  setIsAddInvoiceOverlayOpen: (isOpen: boolean) => void;
};

const AddOrdering: React.FC<EditStoreProps> = ({
  isAddInvoiceOverlayOpen,
  setIsAddInvoiceOverlayOpen,
}) => {
  const [updatedItem, setUpdatedItem] = useState<Invoice>({
    id: "", // Mã hóa đơn
    createAt: new Date(), // Ngày tạo hóa đơn
    supplier: "", // Nhà cung cấp
    total: 0, // Tổng số tiền
    phone: "", // Số điện thoại liên hệ
    location: "", // Địa chỉ
    detailImport: [], // Chi tiết nhập hàng
    createBy: "", // Tên nhân viên tạo hóa đơn
    orderId: "", // Mã đơn hàng liên quan
    storeName: "", // Tên cửa hàng
    status: 0, // Trạng thái (0: mới, 1: xử lý, 2: hoàn tất)
    storeId: "", // Mã cửa hàng
    staffId: "S101", // Mã nhân viên (có giá trị mặc định là "S101")
    typeOfProblem: "", // Loại vấn đề gặp phải
  });

  const handleStaffChange = (selectedId: keyof typeof staffMapping) => {
    if (updatedItem) {
      // Update both staffId and staffName
      setUpdatedItem({
        ...updatedItem,
        staffId: selectedId,
        createBy: staffMapping[selectedId], // Automatically set the staffName
      });
    }
  };

  const handleStoreChange = (selectedId: keyof typeof storeMapping) => {
    if (updatedItem) {
      // Update both staffId and staffName
      setUpdatedItem({
        ...updatedItem,
        storeId: selectedId,
        storeName: storeMapping[selectedId], // Automatically set the staffName
      });
    }
  };

  const handleSave = () => {
    if (updatedItem) {
      console.log("Saved product: ", updatedItem);
      // Lưu item đã chỉnh sửa
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updatedItem) {
      setUpdatedItem({
        ...updatedItem,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleDateChange = (date: string) => {
    if (updatedItem) {
      setUpdatedItem({
        ...updatedItem,
        createAt: new Date(date),
      });
    }
  };

  // Calculate the total amount
  const calculateTotal = (items: DetailImport[]): number => {
    return items.reduce(
      (total, item) => total + item.unitPrice * item.level,
      0
    );
  };

  const handleDeleteItemOrder = (index: number) => {
    if (updatedItem) {
      const updatedIngredients = updatedItem.detailImport.filter(
        (_, i) => i !== index
      );
      setUpdatedItem({
        ...updatedItem,
        detailImport: updatedIngredients,
        total: calculateTotal(updatedIngredients), // Recalculate total after item deletion
      });
    }
  };

  const handleInvoiceChange = (index: number, field: string, value: string) => {
    if (updatedItem) {
      const updatedOrders = updatedItem.detailImport.map((order, i) => {
        if (i === index) {
          return { ...order, [field]: value };
        }
        return order;
      });
      setUpdatedItem({
        ...updatedItem,
        detailImport: updatedOrders,
        total: calculateTotal(updatedOrders), // Recalculate total after item change
      });
    }
  };

  return (
    <>
      {isAddInvoiceOverlayOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[658px] h-[700px] flex flex-col rounded-lg p-4 gap-2">
            <div className="flex w-full justify-between">
              <p className="text-[24px] font-semibold text-text-dark-500">
                Add Store Ordering Invoice
              </p>
              <Icon
                icon="iconoir:cancel"
                className="text-[24px] text-text-color cursor-pointer"
                onClick={() => setIsAddInvoiceOverlayOpen(false)}
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
                  onChange={handleChange}
                  name="id"
                  placeholder="Enter ID"
                />
                <InputDate
                  titleInput="Create At"
                  width="w-full"
                  onChange={handleDateChange}
                  value={updatedItem?.createAt?.toISOString() || ""}
                />
                <InputSelection
                  options={Object.keys(staffMapping)}
                  titleInput="Create By"
                  width="w-full"
                  value={updatedItem.staffId} // Bind the value to staffId
                  onChange={
                    (value) =>
                      handleStaffChange(value as keyof typeof staffMapping) // Update staffId and staffName
                  }
                />
                <InputEdit
                  titleInput="Staff name"
                  width="w-full"
                  value={updatedItem.createBy} // Display the staffName based on staffId
                  onChange={handleChange}
                  name="createBy"
                  placeholder="Staff Name"
                />
                <InputSelection
                  options={Object.keys(storeMapping)}
                  titleInput="Store Id"
                  width="w-full"
                  value={updatedItem.storeId} // Bind the value to staffId
                  onChange={
                    (value) =>
                      handleStoreChange(value as keyof typeof storeMapping) // Update staffId and staffName
                  }
                />
                <InputEdit
                  titleInput="Store name"
                  width="w-full"
                  value={updatedItem.storeName} // Display the staffName based on staffId
                  onChange={handleChange}
                  name="storeName"
                  placeholder="Store Name"
                />
              </div>
              <InputEdit
                titleInput="Order Id"
                width="w-full"
                value={updatedItem?.orderId || ""}
                onChange={handleChange}
                name="orderId"
                placeholder="Enter Order Id"
              />

              <TitleSession icon="mingcute:information-line" title="Detail" />

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
                    {updatedItem?.detailImport?.map((order, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-2 text-sm text-gray-800">
                          <input
                            type="text"
                            value={order.name}
                            onChange={(e) =>
                              handleInvoiceChange(index, "name", e.target.value)
                            }
                            className="w-full"
                          />
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          <input
                            type="number"
                            value={order.level}
                            onChange={(e) =>
                              handleInvoiceChange(
                                index,
                                "level",
                                e.target.value
                              )
                            }
                            className="w-full"
                          />
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          <input
                            type="text"
                            value={order.unit}
                            onChange={(e) =>
                              handleInvoiceChange(index, "unit", e.target.value)
                            }
                            className="w-full"
                          />
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          <input
                            type="number"
                            value={order.unitPrice}
                            onChange={(e) =>
                              handleInvoiceChange(
                                index,
                                "unitPrice",
                                e.target.value
                              )
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

              <div className="w-full flex justify-end gap-4">
                <ButtonFunction
                  event={() => setIsAddInvoiceOverlayOpen(false)}
                  title="Cancel"
                  width="w-[85px]"
                  border_radius="rounded-xl"
                  text_color="text-text-dark-500"
                  border_color="border-border-color"
                />
                <ButtonFunction
                  event={handleSave}
                  icon="ic:round-add"
                  title="Add"
                  width="w-[71px]"
                  background="bg-active-background"
                  border_radius="rounded-xl"
                  text_color="text-primary-100"
                  border_color="border-active-background"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddOrdering;
