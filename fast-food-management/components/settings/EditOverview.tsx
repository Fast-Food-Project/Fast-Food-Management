import React, { useEffect, useState } from "react";
import ButtonFunction from "../shared/button/ButtonFunction";
import { Icon } from "@iconify/react/dist/iconify.js";
import InputEdit from "../shared/input/InputEdit";
import InputDate from "../shared/input/InputDate";
import InputSelection from "../shared/input/InputSelection";

interface UserProps {
  id: string;
  fullname: string;
  dob: Date; // Correct type for dob
  email: string;
  avatar: string;
  phoneNumber: string; // Match the property name in UserData
  position: string;
  address: string;
  cardId: string;
  city: string;
  country: string;
  acountName: string;
  status: string;
  password: string;
  enrolledDate: Date; // Correct the typo
}

type EditUserProps = {
  isOverviewOverlayOpen: boolean;
  selectedUser: UserProps | null;
  setIsOverviewOverlayOpen: (isOpen: boolean) => void;
};

const EditOverview: React.FC<EditUserProps> = ({
  isOverviewOverlayOpen,
  selectedUser,
  setIsOverviewOverlayOpen,
}) => {
  const [updatedItem, setUpdatedItem] = useState<UserProps | null>(null); // Store the edited item
  const [selectedNationValue, setSelectedNationValue] = useState<
    string | null
  >();
  const [selectedCityValue, setSelectedCityValue] = useState<string | null>(
    null
  );
  const [selectedDistrictValue, setSelectedDistrictValue] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (selectedUser) {
      setUpdatedItem({ ...selectedUser });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      setUpdatedItem({ ...selectedUser });
      setSelectedNationValue(selectedUser.country || "");
      setSelectedCityValue(selectedUser.city || "");
      setSelectedDistrictValue(selectedUser.city || ""); // Hoặc district nếu có
    }
  }, [selectedUser]);

  const handleSave = () => {
    if (updatedItem) {
      // Here you would save the updated item, typically sending to an API or context
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

  const formatDate = (date: Date | string): string => {
    const parsedDate = new Date(date);
    return parsedDate instanceof Date && !isNaN(parsedDate.getTime())
      ? parsedDate.toISOString()
      : "";
  };

  return (
    <>
      {isOverviewOverlayOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-1/2 h-2/3 flex flex-col rounded-lg  gap-2  p-4">
            <div className="flex justify-between items-center h-[40px]">
              <div className="flex w-[480px] gap-8">
                <p className="text-[20px] w-[480px] text-text-dark-500 font-semibold">
                  Edit Overview
                </p>
              </div>
              <Icon
                icon="iconoir:cancel"
                className="text-[24px] text-text-color cursor-pointer"
                onClick={() => setIsOverviewOverlayOpen(false)}
              />
            </div>
            <div className="w-full grid grid-cols-2 gap-2">
              <InputEdit
                titleInput="First name"
                width="174px"
                value={updatedItem?.fullname || ""}
                onChange={handleChange}
                name="fullname"
                placeholder="Enter fullname"
              />
              <InputEdit
                titleInput="Nickname"
                width="174px"
                value={updatedItem?.acountName || ""}
                onChange={handleChange}
                name="fullname"
                placeholder="Enter fullname"
              />
              <InputDate
                titleInput="Added date"
                width="174px"
                value={updatedItem ? formatDate(updatedItem.dob) : ""}
                onChange={() => {}}
              />
              <InputEdit
                titleInput="Card ID"
                width="174px"
                value={updatedItem?.cardId || ""}
                onChange={handleChange}
                name="cardID"
                placeholder="Enter CardID"
              />
              <InputEdit
                titleInput="Email"
                width="174px"
                value={updatedItem?.email || ""}
                onChange={handleChange}
                name="email"
                placeholder="Enter Email"
              />
              <InputEdit
                titleInput="Phone"
                width="174px"
                value={updatedItem?.phoneNumber || ""}
                onChange={handleChange}
                name="phone"
                placeholder="Enter Phone"
              />
              <InputSelection
                titleInput="Nation"
                options={["VietNam", "US", "UK", "Japan", "ThaiLan"]}
                width="w-full"
                value={selectedNationValue}
                onChange={(value) => {
                  setSelectedNationValue(value);
                  setUpdatedItem((prev) =>
                    prev ? { ...prev, country: value } : null
                  );
                }}
              />
              <InputSelection
                titleInput="City"
                options={["TP.HCM", "HN", "DN", "BT", "BD"]}
                width="w-full"
                value={selectedCityValue}
                onChange={(value) => {
                  setSelectedCityValue(value);
                  setUpdatedItem((prev) =>
                    prev ? { ...prev, city: value } : null
                  );
                }}
              />
              <InputSelection
                titleInput="District"
                options={[
                  "TanPhu",
                  "LinhTrung",
                  "LinhXuan",
                  "TanBinh",
                  "BinhChanh",
                ]}
                width="w-full"
                value={selectedDistrictValue}
                onChange={(value) => {
                  setSelectedDistrictValue(value);
                  setUpdatedItem((prev) =>
                    prev ? { ...prev, city: value } : null
                  );
                }}
              />
              <InputEdit
                titleInput="Address"
                width="174px"
                value={updatedItem?.address || ""}
                onChange={handleChange}
                name="address"
                placeholder="Enter Address"
              />
            </div>

            <div className="w-full flex justify-end gap-4 py-3">
              <ButtonFunction
                event={() => setIsOverviewOverlayOpen(false)}
                title="Cancel"
                width="w-[67px]"
                border_radius="rounded-md"
                text_color="text-text-dark-500"
                border_color="border-border-color"
              />
              <ButtonFunction
                event={handleSave}
                title="Save"
                width="w-[67px]"
                background="bg-dark-green"
                border_radius="rounded-md"
                text_color="text-white"
                border_color="bg-dark-green"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditOverview;
