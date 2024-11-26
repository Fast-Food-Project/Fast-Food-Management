import { Icon } from "@iconify/react/dist/iconify.js";
import InputEdit from "../shared/input/InputEdit";
import ButtonFunction from "../shared/button/ButtonFunction";
import { useState, useEffect } from "react";
import TitleSession from "../shared/orther/TitleSession";
import { format } from "date-fns";

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
  isDetailStoreOverlayOpen: boolean;
  selectedStore: StoreTable | null;
  setIsDetailStoreOverlayOpen: (isOpen: boolean) => void;
};

const DetailStore: React.FC<EditStoreProps> = ({
  isDetailStoreOverlayOpen,
  selectedStore,
  setIsDetailStoreOverlayOpen,
}) => {
  const [updatedItem, setUpdatedItem] = useState<StoreTable | null>(null); // Store the edited item

  useEffect(() => {
    if (selectedStore) {
      setUpdatedItem({ ...selectedStore });
    }
  }, [selectedStore]);

  const handleSave = () => {
    if (updatedItem) {
      // Here you would save the updated item, typically sending to an API or context
      console.log("Saved product: ", updatedItem);
    }
  };

  return (
    <>
      {isDetailStoreOverlayOpen && selectedStore && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-[798px] h-[700px] flex flex-col rounded-lg p-4 gap-2">
            <div className="flex w-full justify-between">
              <p className="text-[24px] font-semibold text-text-dark-500">
                Detail Store
              </p>
              <Icon
                icon="iconoir:cancel"
                className="text-[24px] text-text-color cursor-pointer"
                onClick={() => setIsDetailStoreOverlayOpen(false)}
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
                  onChange={() => {}}
                  name="id"
                  placeholder="Enter ID"
                />

                <InputEdit
                  titleInput="Store name"
                  width="w-full"
                  value={updatedItem?.storeName || ""}
                  onChange={() => {}}
                  name="storeName"
                  placeholder="Enter Store Name"
                />

                <InputEdit
                  titleInput="Email"
                  width="w-full"
                  value={updatedItem?.email || ""}
                  onChange={() => {}}
                  name="email"
                  placeholder="Enter Email"
                />

                <InputEdit
                  titleInput="Phone"
                  width="w-full"
                  value={updatedItem?.phone || ""}
                  onChange={() => {}}
                  name="phone"
                  placeholder="Enter Phone"
                />

                <InputEdit
                  width="w-full"
                  titleInput="Nation"
                  value={updatedItem?.nation || ""}
                  onChange={() => {}}
                />
                <InputEdit
                  width="w-full"
                  titleInput="City"
                  value={updatedItem?.city || ""}
                  onChange={() => {}}
                />
                <InputEdit
                  width="w-full"
                  titleInput="District"
                  value={updatedItem?.district || ""}
                  onChange={() => {}}
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
                  onChange={() => {}}
                  name="accountName"
                  placeholder="Enter Account Name"
                />

                <InputEdit
                  width="w-full"
                  titleInput="Status"
                  value={updatedItem?.status === 0 ? "Inactive" : "Active"}
                  onChange={() => {}}
                />
                <InputEdit
                  titleInput="Sign-up Date"
                  width="w-full"
                  onChange={() => {}}
                  value={
                    updatedItem?.signUpDate
                      ? format(updatedItem.signUpDate, "PPP")
                      : ""
                  }
                />

                <InputEdit
                  titleInput="Order"
                  width="w-full"
                  value={updatedItem?.orderQuantity.toString() || ""}
                  onChange={() => {}}
                  name="orderQuantity"
                  placeholder="Enter Order Quantity"
                />
              </div>

              <div className="w-full flex justify-end p-2 gap-4">
                <ButtonFunction
                  event={() => setIsDetailStoreOverlayOpen(false)}
                  title="Cancel"
                  width="w-[85px]"
                  border_radius="rounded-xl"
                  text_color="text-text-dark-500"
                  border_color="border-border-color"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailStore;
