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
}

type EditStoreProps = {
  isEditInvoiceOverlayOpen: boolean;
  selectedInvoice: Invoice | null;
  setIsEditInvoiceOverlayOpen: (isOpen: boolean) => void;
};

const EditInvoice: React.FC<EditStoreProps> = ({
  isEditInvoiceOverlayOpen,
  selectedInvoice,
  setIsEditInvoiceOverlayOpen,
}) => {
  const [updatedItem, setUpdatedItem] = useState<Invoice | null>(null); // Store the edited item

  const [selectedSupplierValue, setSelectedSupplierValue] =
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
      });

      setSelectedSupplierValue(selectedInvoice.supplier);
    }
  }, [selectedInvoice]);

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
                Edit Store
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
                <InputSelection
                  width="w-full"
                  titleInput="Supplier"
                  options={["Nessan", "Nesschan", "Nesskun"]}
                  value={selectedSupplierValue}
                  onChange={(value) => {
                    setSelectedSupplierValue(value);
                    setUpdatedItem((prev) => ({
                      ...prev!,
                      nation: value,
                    }));
                  }}
                />
                <InputEdit
                  titleInput="Phone"
                  width="w-full"
                  value={updatedItem?.phone || ""}
                  onChange={handleChange}
                  name="phone"
                  placeholder="Enter Phone"
                />
              </div>

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

export default EditInvoice;
