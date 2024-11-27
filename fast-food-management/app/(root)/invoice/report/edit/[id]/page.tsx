"use client";
import ButtonFunction from "@/components/shared/button/ButtonFunction";
import InputEdit from "@/components/shared/input/InputEdit";
import InputSelection from "@/components/shared/input/InputSelection";
import TitleSession from "@/components/shared/orther/TitleSession";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { InvoiceData } from "@/constants/data";
import InputDate from "@/components/shared/input/InputDate";

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
  status: string; // Trạng thái (0: mới, 1: xử lý, 2: hoàn tất)
  storeId: string; // Mã cửa hàng
  staffId: "S101" | "S102" | "S103" | "S104" | "S105"; // Mã nhân viên
  typeOfProblem: string; // Loại vấn đề gặp phải
}

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

const Page = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>(); // Ensure id is a string
  const cleanId = typeof id === "string" ? id.replace("edit-", "") : "";

  const [updatedItem, setUpdatedItem] = useState<Invoice | null>(null);

  useEffect(() => {
    if (cleanId) {
      const foundItem = InvoiceData.find((item) => item.id === cleanId);
      setUpdatedItem(foundItem || null);
    }
  }, [cleanId]);

  const [selectedStatusValue, setSelectedStatusValue] =
    useState<string>("Pending");

  const [selectedOrderIdValue, setSelectedOrderIdValue] =
    useState<string>("001");

  const [selectedProblemValue, setSelectedProblenValue] =
    useState<string>("Labor issues");

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

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="bg-white w-full h-full flex flex-col rounded-lg p-4 gap-2">
      <div className="flex w-full justify-between">
        <p className="text-[24px] font-semibold text-text-dark-500">
          Edit Report Invoice
        </p>
        <Icon
          icon="iconoir:cancel"
          className="text-[24px] text-text-color cursor-pointer"
          onClick={handleBack}
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <TitleSession icon="mingcute:information-line" title="Information" />

        <div className="w-full grid grid-cols-2 gap-2 gap-x-28">
          <InputEdit
            titleInput="ID"
            width="w-full"
            value={updatedItem?.id || ""}
            onChange={handleChange}
            name="id"
            placeholder="Enter ID"
          />
          <InputSelection
            width="w-full"
            titleInput="Order Id"
            options={["Pending", "Rejected", "Resolved"]}
            value={selectedStatusValue}
            onChange={(value) => {
              setSelectedStatusValue(value);
              setUpdatedItem((prev) => ({
                ...prev!,
                status: value,
              }));
            }}
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
          <InputDate
            titleInput="Create At"
            width="w-full"
            onChange={handleDateChange}
            value={updatedItem?.createAt?.toISOString() || ""}
          />
        </div>

        <TitleSession icon="mdi:food-outline" title="Invoice information" />

        <div className="w-full grid grid-cols-2 gap-2 gap-x-28">
          <InputSelection
            width="w-full"
            titleInput="ID"
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
          <InputEdit
            titleInput="Total"
            width="w-full"
            value={`${updatedItem?.total.toLocaleString()} VND` || ""}
            onChange={handleChange}
            name="total"
            placeholder="Enter Total"
          />
          <InputEdit
            titleInput="Number of products"
            width="w-full"
            value={updatedItem?.detailImport.length.toString() || ""}
            onChange={handleChange}
            name="numberOfProduct"
            placeholder="Enter Number Of Products"
          />
          <InputEdit
            titleInput="Number of products"
            width="w-full"
            value={"Pieces"}
            onChange={handleChange}
            name="Unit"
            placeholder="Enter Unit"
          />
          <InputDate
            titleInput="Create At"
            width="w-full"
            onChange={handleDateChange}
            value={updatedItem?.createAt?.toISOString() || ""}
          />
          <InputEdit
            titleInput="Create By"
            width="w-full"
            value={updatedItem?.createBy || ""}
            onChange={handleChange}
            name="createBy"
            placeholder="Enter Create By "
          />
        </div>

        <TitleSession icon="mdi:git-issue" title="Problem Detail" />

        <InputSelection
          width="w-full"
          titleInput="Type of problem"
          options={["Labor issues", "Broken", "Failed"]}
          value={selectedProblemValue}
          onChange={(value) => {
            setSelectedProblenValue(value);
            setUpdatedItem((prev) => ({
              ...prev!,
              typeOfProblem: value,
            }));
          }}
        />

        <div className="w-full flex flex-col gap-[8px] text-text-dark-500 pt-2">
          <p className="text-text-dark-400">Specific problem:</p>
          <textarea
            className="h-[135px] border border-border-color shadow-md rounded-lg px-2 focus:outline-none focus:ring-0"
            value={""} // Allow dynamic value binding
            onChange={() => handleChange} // Allow handling value changes
            placeholder="Enter Specific Problem:" // Optional placeholder
          />
        </div>

        <TitleSession icon="fluent-mdl2:responses-menu" title="Response" />
        <div className="w-full flex flex-col gap-[8px] text-text-dark-500 pt-2">
          <p className="text-text-dark-400">Specific response:</p>
          <textarea
            className="h-[135px] border border-border-color shadow-md rounded-lg px-2 focus:outline-none focus:ring-0"
            value={""} // Allow dynamic value binding
            onChange={() => handleChange} // Allow handling value changes
            placeholder="Enter Specific Reponse:" // Optional placeholder
          />
        </div>
        <div className="w-full flex justify-end p-2 gap-4 pt-6">
          <ButtonFunction
            event={handleBack}
            title="Cancel"
            width="w-[85px]"
            border_radius="rounded-xl"
            text_color="text-text-dark-500"
            border_color="border-border-color"
          />
          <ButtonFunction
            event={handleSave}
            title="Save and Send"
            width="w-[148px]"
            background="bg-dark-green"
            border_radius="rounded-xl"
            text_color="text-white"
            border_color="border-dark-green"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
