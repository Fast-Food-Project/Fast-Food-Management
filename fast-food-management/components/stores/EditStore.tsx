import { Icon } from "@iconify/react/dist/iconify.js";
import InputEdit from "../shared/input/InputEdit";
import ButtonFunction from "../shared/button/ButtonFunction";
import { useState, useEffect } from "react";
import InputDate from "../shared/input/InputDate";
import InputSelection from "../shared/input/InputSelection";
import TitleSession from "../shared/orther/TitleSession";

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

type EditStoreProps = {
  isEditStoreOverlayOpen: boolean;
  selectedStore: StoreTable | null;
  setIsEditStoreOverlayOpen: (isOpen: boolean) => void;
};

const EditStore: React.FC<EditStoreProps> = ({
  isEditStoreOverlayOpen,
  selectedStore,
  setIsEditStoreOverlayOpen,
}) => {
  const [updatedItem, setUpdatedItem] = useState<StoreTable | null>(null); // Store the edited item

  // Các state cho input selection
  const [selectedStatusValue, setSelectedStatusValue] =
    useState<string>("Active");
  const [selectedNationValue, setSelectedNationValue] =
    useState<string>("Vietnam");
  const [selectedCityValue, setSelectedCityValue] = useState<string>("HCM");
  const [selectedDistrictValue, setSelectedDistrictValue] =
    useState<string>("Tan Phu");

  // Cập nhật các state khi selectedStore thay đổi
  useEffect(() => {
    if (selectedStore) {
      setUpdatedItem({
        id: selectedStore.id, // ensure required fields are set
        storeName: selectedStore.storeName,
        email: selectedStore.email,
        phone: selectedStore.phone,
        signUpDate: selectedStore.signUpDate,
        status: selectedStore.status,
        nation: selectedStore.nation,
        city: selectedStore.city,
        district: selectedStore.district,
        location: selectedStore.location,
        orderQuantity: selectedStore.orderQuantity,
        accountName: selectedStore.accountName,
      });
      setSelectedStatusValue(
        selectedStore.status === 1 ? "Active" : "Inactive"
      );
      setSelectedNationValue(selectedStore.nation);
      setSelectedCityValue(selectedStore.city);
      setSelectedDistrictValue(selectedStore.district);
    }
  }, [selectedStore]);

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
        signUpDate: new Date(date),
      });
    }
  };

  return (
    <>
      {isEditStoreOverlayOpen && selectedStore && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[658px] h-[700px] flex flex-col rounded-lg p-4 gap-2">
            <div className="flex w-full justify-between">
              <p className="text-[24px] font-semibold text-text-dark-500">
                Edit Store
              </p>
              <Icon
                icon="iconoir:cancel"
                className="text-[24px] text-text-color cursor-pointer"
                onClick={() => setIsEditStoreOverlayOpen(false)}
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
                <InputEdit
                  titleInput="Store name"
                  width="w-full"
                  value={updatedItem?.storeName || ""}
                  onChange={handleChange}
                  name="storeName"
                  placeholder="Enter Store Name"
                />
                <InputEdit
                  titleInput="Email"
                  width="w-full"
                  value={updatedItem?.email || ""}
                  onChange={handleChange}
                  name="email"
                  placeholder="Enter Email"
                />
                <InputEdit
                  titleInput="Phone"
                  width="w-full"
                  value={updatedItem?.phone || ""}
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
                      ...prev!,
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
                      ...prev!,
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
                      ...prev!,
                      district: value,
                    }));
                  }}
                />
              </div>

              <TitleSession
                icon="mingcute:information-line"
                title="Store Account"
              />

              <div className="w-full grid grid-cols-2 gap-2 gap-x-10 ">
                <InputEdit
                  titleInput="Account name"
                  width="w-full"
                  value={updatedItem?.accountName || ""}
                  onChange={handleChange}
                  name="accountName"
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
                      ...prev!,
                      status: value === "Active" ? 1 : 0,
                    }));
                  }}
                />
                <InputDate
                  titleInput="Sign-up Date"
                  width="w-full"
                  onChange={handleDateChange}
                  value={updatedItem?.signUpDate?.toISOString() || ""}
                  position={1}
                />

                <InputEdit
                  titleInput="Order"
                  width="w-full"
                  value={updatedItem?.orderQuantity.toString() || ""}
                  onChange={handleChange}
                  name="orderQuantity"
                  placeholder="Enter Order Quantity"
                />
              </div>

              <div className="w-full flex justify-end p-2 gap-4">
                <ButtonFunction
                  event={() => setIsEditStoreOverlayOpen(false)}
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

export default EditStore;
