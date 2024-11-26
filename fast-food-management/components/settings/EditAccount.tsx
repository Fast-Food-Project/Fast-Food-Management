import React, { useEffect, useState } from "react";
import InputEdit from "../shared/input/InputEdit";
import { Icon } from "@iconify/react/dist/iconify.js";
import ButtonFunction from "../shared/button/ButtonFunction";
import InputPassword from "../shared/input/InputPassword";

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

type EditProductProps = {
  isAccountOverlayOpen: boolean;
  selectedUser: UserProps | null;
  setIsAccountOverlayOpen: (isOpen: boolean) => void;
};

const EditAccount: React.FC<EditProductProps> = ({
  isAccountOverlayOpen,
  selectedUser,
  setIsAccountOverlayOpen,
}) => {
  const [updatedItem, setUpdatedItem] = useState<UserProps | null>(null); // Store the edited item

  useEffect(() => {
    if (selectedUser) {
      setUpdatedItem({ ...selectedUser });
    }
  }, [selectedUser]);

  const handleSave = () => {
    if (updatedItem) {
      // Here you would save the updated item, typically sending to an API or context
      console.log("Saved product: ", updatedItem);
    }
  };

  return (
    <>
      {isAccountOverlayOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-1/2 h-3/5 flex flex-col rounded-lg  gap-2  p-4">
            <div className="flex justify-between items-center h-[40px]">
              <div className="flex w-[480px] gap-8">
                <p className="text-[20px] w-[480px] text-text-dark-500 font-semibold">
                  Edit Account
                </p>
              </div>
              <Icon
                icon="iconoir:cancel"
                className="text-[24px] text-text-color cursor-pointer"
                onClick={() => setIsAccountOverlayOpen(false)}
              />
            </div>

            <div className="w-full grid grid-rows-3 gap-2">
              <InputEdit titleInput="Username" width="174px" />
              <InputPassword titleInput="Current password" width="174px" />
              <InputPassword titleInput="New password" width="174px" />
              <InputPassword
                titleInput="Confirmed new password"
                width="174px"
              />
            </div>

            <div className="w-full flex justify-end gap-4 py-6">
              <ButtonFunction
                event={() => setIsAccountOverlayOpen(false)}
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

export default EditAccount;
