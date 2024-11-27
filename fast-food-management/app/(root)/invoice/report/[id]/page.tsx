"use client";
import ButtonFunction from "@/components/shared/button/ButtonFunction";
import InputEdit from "@/components/shared/input/InputEdit";
import TitleSession from "@/components/shared/orther/TitleSession";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { InvoiceData } from "@/constants/data";
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
  status: string; // Trạng thái (0: mới, 1: xử lý, 2: hoàn tất)
  storeId: string; // Mã cửa hàng
  staffId: "S101" | "S102" | "S103" | "S104" | "S105"; // Mã nhân viên
  typeOfProblem: string; // Loại vấn đề gặp phải
}

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

  const handleChange = () => {};

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="bg-white w-full h-full flex flex-col rounded-lg p-4 gap-2">
      <div className="flex w-full justify-between">
        <p className="text-[24px] font-semibold text-text-dark-500">
          Report Invoice
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

          <InputEdit
            titleInput="Order Id"
            width="w-full"
            value={updatedItem?.orderId ?? ""}
            onChange={handleChange}
            name="orderId"
            placeholder="Staff Order Id"
          />

          <InputEdit
            titleInput="Store Id"
            width="w-full"
            value={updatedItem?.storeId ?? ""}
            onChange={handleChange}
            name="storedId"
            placeholder="Staff Store Id"
          />

          <InputEdit
            titleInput="Store name"
            width="w-full"
            value={updatedItem?.storeName ?? ""}
            onChange={handleChange}
            name="staffName"
            placeholder="Staff Name"
          />
          <InputEdit
            titleInput="Create At"
            width="w-full"
            value={
              updatedItem?.createAt ? format(updatedItem?.createAt, "PPP") : ""
            }
            onChange={handleChange}
          />
        </div>

        <TitleSession icon="mdi:food-outline" title="Invoice information" />

        <div className="w-full grid grid-cols-2 gap-2 gap-x-28">
          <InputEdit
            titleInput="Store name"
            width="w-full"
            value={updatedItem?.orderId ?? ""}
            onChange={handleChange}
            name="orderId"
            placeholder="ID"
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

          <InputEdit
            titleInput="Create At"
            width="w-full"
            value={
              updatedItem?.createAt ? format(updatedItem?.createAt, "PPP") : ""
            }
            onChange={handleChange}
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

        <InputEdit
          titleInput="Type of problem"
          width="w-full"
          value={updatedItem?.typeOfProblem || ""}
          onChange={handleChange}
          name="typeOfProblem"
          placeholder="Enter Type Of Problem "
        />

        <div className="w-full flex flex-col gap-[8px] text-text-dark-500 pt-2">
          <p className="text-text-dark-400">Specific problem:</p>
          <textarea
            className="h-[428px] border border-border-color shadow-md rounded-lg px-2 focus:outline-none focus:ring-0"
            value={""} // Allow dynamic value binding
            onChange={() => handleChange} // Allow handling value changes
            placeholder="Enter Specific Problem:" // Optional placeholder
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
        </div>
      </div>
    </div>
  );
};

export default Page;
