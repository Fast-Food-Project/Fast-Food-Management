"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import InputEdit from "../shared/input/InputEdit";
import ButtonFunction from "../shared/button/ButtonFunction";
import { useState, useEffect } from "react";
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
  isEditInvoiceOverlayOpen: boolean;
  selectedInvoice: Invoice | null;
  setIsEditInvoiceOverlayOpen: (isOpen: boolean) => void;
};

const EditOrdering: React.FC<EditStoreProps> = ({
  isEditInvoiceOverlayOpen,
  selectedInvoice,
  setIsEditInvoiceOverlayOpen,
}) => {
  const [updatedItem, setUpdatedItem] = useState<Invoice | null>(null); // Store the edited item

  const [selectedOrderIdValue, setSelectedOrderIdValue] =
    useState<string>("Nessan");

  // Cập nhật các state khi selectedInvoice thay đổi
  useEffect(() => {
    if (selectedInvoice) {
      setUpdatedItem({
        id: selectedInvoice.id,
        createAt: selectedInvoice.createAt,
        supplier: selectedInvoice.supplier,
        total: selectedInvoice.total,
        phone: selectedInvoice.phone,
        location: selectedInvoice.location,
        detailImport: selectedInvoice.detailImport,
        createBy: selectedInvoice.createBy,
        orderId: selectedInvoice.orderId,
        storeName: selectedInvoice.storeName,
        status: selectedInvoice.status,
        storeId: selectedInvoice.storeId,
        staffId: selectedInvoice.staffId,
        typeOfProblem: selectedInvoice.typeOfProblem,
      });

      setSelectedOrderIdValue(selectedInvoice.supplier);
    }
  }, [selectedInvoice]);

  const handleStaffChange = (selectedId: keyof typeof staffMapping) => {
    if (updatedItem) {
      // Cập nhật cả staffId và staffName
      setUpdatedItem({
        ...updatedItem,
        staffId: selectedId,
        createBy: staffMapping[selectedId], // staffName sẽ tự động thay đổi khi chọn staffId
      });
    }
  };

  const handleStoreChange = (selectedId: keyof typeof storeMapping) => {
    if (updatedItem) {
      // Cập nhật cả staffId và staffName
      setUpdatedItem({
        ...updatedItem,
        storeId: selectedId,
        storeName: storeMapping[selectedId], // staffName sẽ tự động thay đổi khi chọn staffId
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
      {isEditInvoiceOverlayOpen && selectedInvoice && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[658px] h-[700px] flex flex-col rounded-lg p-4 gap-2">
            <div className="flex w-full justify-between">
              <p className="text-[24px] font-semibold text-text-dark-500">
                Edit Store Ordering Invoice
              </p>
              <Icon
                icon="iconoir:cancel"
                className="text-[24px] text-text-color cursor-pointer"
                onClick={() => setIsEditInvoiceOverlayOpen(false)}
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
                {/* Chuyển options thành mảng các chuỗi */}
                <InputSelection
                  options={Object.keys(staffMapping)}
                  titleInput="Staff id"
                  width="w-full"
                  value={updatedItem?.staffId ?? ""} // Chỉ dùng staffId ở đây
                  onChange={(value) =>
                    handleStaffChange(value as keyof typeof staffMapping)
                  } // Cập nhật staffId và staffName
                />

                <InputEdit
                  titleInput="Staff name"
                  width="w-full"
                  value={updatedItem?.createBy ?? ""}
                  onChange={handleChange}
                  name="staffName"
                  placeholder="Staff Name"
                />

                <InputSelection
                  options={Object.keys(storeMapping)}
                  titleInput="Store id"
                  width="w-full"
                  value={updatedItem?.storeId ?? ""} // Chỉ dùng staffId ở đây
                  onChange={(value) =>
                    handleStoreChange(value as keyof typeof storeMapping)
                  } // Cập nhật staffId và staffName
                />

                <InputEdit
                  titleInput="Store name"
                  width="w-full"
                  value={updatedItem?.storeName ?? ""}
                  onChange={handleChange}
                  name="staffName"
                  placeholder="Staff Name"
                />
              </div>
              <InputSelection
                width="w-full"
                titleInput="Order Id"
                options={[
                  "001",
                  "002",
                  "003",
                  "004",
                  "005",
                  "006",
                  "007",
                  "008",
                  "009",
                  "010",
                ]}
                value={selectedOrderIdValue}
                onChange={(value) => {
                  setSelectedOrderIdValue(value);
                  setUpdatedItem((prev) => ({
                    ...prev!,
                    orderId: value,
                  }));
                }}
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

              <div className="w-full flex justify-end p-2 gap-4">
                <ButtonFunction
                  event={() => setIsEditInvoiceOverlayOpen(false)}
                  title="Cancel"
                  width="w-[85px]"
                  border_radius="rounded-xl"
                  text_color="text-text-dark-500"
                  border_color="border-border-color"
                />
                <ButtonFunction
                  event={handleSave}
                  title="Save"
                  width="w-[71px]"
                  background="bg-dark-green"
                  border_radius="rounded-xl"
                  text_color="text-white"
                  border_color="border-dark-green"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditOrdering;
