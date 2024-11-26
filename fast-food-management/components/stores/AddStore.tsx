import { Icon } from "@iconify/react/dist/iconify.js";
import InputEdit from "../shared/input/InputEdit";
import ButtonFunction from "../shared/button/ButtonFunction";
import { useState } from "react";
import InputDate from "../shared/input/InputDate";
import TitleSession from "../shared/orther/TitleSession";
import InputSelection from "../shared/input/InputSelection";

type StoreTable = {
  id: string;
  storeName: string;
  email: string;
  phone: string;
  signUpDate: Date;
  status: number;
  nation: string;
  city: string;
  district: string;
  location: string;
  orderQuantity: number;
  accountName: string;
};

type EditProductProps = {
  isAddStoreOverlayOpen: boolean;
  setIsAddStoreOverlayOpen: (isOpen: boolean) => void;
};

const AddStore: React.FC<EditProductProps> = ({
  isAddStoreOverlayOpen,
  setIsAddStoreOverlayOpen,
}) => {
  const [updatedItem, setUpdatedItem] = useState<StoreTable>({
    id: "",
    storeName: "",
    email: "",
    phone: "",
    signUpDate: new Date(),
    status: 0,
    nation: "",
    city: "",
    district: "",
    location: "",
    orderQuantity: 0,
    accountName: "",
  }); // Khởi tạo sản phẩm mới với dữ liệu rỗng

  const [selectedNationValue, setSelectedNationValue] = useState("");
  const [selectedCityValue, setSelectedCityValue] = useState("");
  const [selectedDistrictValue, setSelectedDistrictValue] = useState("");
  const [selectedStatusValue, setSelectedStatusValue] = useState("");

  const handleSave = () => {
    if (updatedItem) {
      // Ở đây bạn có thể gọi API để lưu thông tin sản phẩm
      console.log("Saved product: ", updatedItem);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updatedItem) {
      setUpdatedItem({
        ...updatedItem,
        [e.target.name]: e.target.value, // Dynamically update the value
      });
    }
  };

  const handleDateChange = (date: string) => {
    setUpdatedItem((prev) => ({
      ...prev,
      signUpDate: date ? new Date(date) : new Date(), // Fallback to the current date
    }));
  };

  return (
    <>
      {isAddStoreOverlayOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[658px] h-[700px] flex flex-col rounded-lg p-4 gap-2">
            <div className="flex w-full justify-between">
              <p className="text-[24px] font-semibold text-text-dark-500">
                Add New Store
              </p>
              <Icon
                icon="iconoir:cancel"
                className="text-[24px] text-text-color cursor-pointer"
                onClick={() => setIsAddStoreOverlayOpen(false)}
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
                  value={updatedItem.id || ""}
                  onChange={handleChange}
                  name="id"
                  placeholder="Enter ID"
                />
                <InputEdit
                  titleInput="Store name"
                  width="w-full"
                  value={updatedItem.storeName || ""}
                  onChange={handleChange}
                  name="storeName"
                  placeholder="Enter Store Name"
                />
                <InputEdit
                  titleInput="Email"
                  width="w-full"
                  value={updatedItem.email || ""}
                  onChange={handleChange}
                  name="email"
                  placeholder="Enter Email"
                />
                <InputEdit
                  titleInput="Phone"
                  width="w-full"
                  value={updatedItem.phone || ""}
                  onChange={handleChange}
                  name="phone"
                  placeholder="Enter Phone"
                />

                <InputSelection
                  width="w-full"
                  titleInput="Nation"
                  options={["Vietnam", "US", "UK"]}
                  value={selectedNationValue}
                  onChange={(value) => {
                    setSelectedNationValue(value);
                    setUpdatedItem((prev) => ({
                      ...prev,
                      nation: value,
                    }));
                  }}
                />
                <InputSelection
                  width="w-full"
                  titleInput="City"
                  options={["HCM", "HN", "DN"]}
                  value={selectedCityValue}
                  onChange={(value) => {
                    setSelectedCityValue(value);
                    setUpdatedItem((prev) => ({
                      ...prev,
                      city: value,
                    }));
                  }}
                />
                <InputSelection
                  width="w-full"
                  titleInput="District"
                  options={["Tan Phu", "Linh Trung"]}
                  value={selectedDistrictValue}
                  onChange={(value) => {
                    setSelectedDistrictValue(value);
                    setUpdatedItem((prev) => ({
                      ...prev,
                      district: value,
                    }));
                  }}
                />
              </div>

              <TitleSession
                icon="mingcute:information-line"
                title="Store Account"
              />

              <div className="w-full grid grid-cols-2 gap-2 gap-x-10">
                <InputEdit
                  titleInput="Account name"
                  width="w-full"
                  value={updatedItem.accountName || ""}
                  onChange={handleChange}
                  name="aacountName"
                  placeholder="Enter Account Name"
                />

                <InputSelection
                  width="w-full"
                  titleInput="Status"
                  options={["Active", "Inactive"]}
                  value={selectedStatusValue}
                  onChange={(value) => {
                    setSelectedStatusValue(value);
                    setUpdatedItem((prev) => ({
                      ...prev,
                      nation: value,
                    }));
                  }}
                />
                <InputDate
                  titleInput="Sign-up Date"
                  width="w-full"
                  onChange={handleDateChange}
                  value={
                    updatedItem.signUpDate &&
                    !isNaN(new Date(updatedItem.signUpDate).getTime())
                      ? updatedItem.signUpDate.toISOString()
                      : "" // Fallback to an empty string if invalid
                  }
                  position={1}
                />

                <InputEdit
                  titleInput="Order"
                  width="w-full"
                  value={updatedItem.orderQuantity.toString() || ""}
                  onChange={handleChange}
                  name="orderQuantity"
                  placeholder="Enter Order Quantity"
                />
              </div>

              <div className="w-full flex justify-end p-2 gap-4">
                <ButtonFunction
                  event={() => setIsAddStoreOverlayOpen(false)}
                  title="Cancel"
                  width="w-[85px]"
                  border_radius="rounded-xl"
                  text_color="text-text-dark-500"
                  border_color="border-border-color"
                />
                <ButtonFunction
                  event={handleSave}
                  title="Add"
                  icon="ic:round-add"
                  width="w-[71px]"
                  background="bg-active-background"
                  border_radius="rounded-xl"
                  text_color="text-primary-100"
                  border_color="border-primary-100"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddStore;
