"use client";
import React, { useState } from "react";
import OverviewAccount from "../shared/label/OverviewAccount";
import { format } from "date-fns";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import ButtonFunction from "../shared/button/ButtonFunction";
import EditOverview from "./EditOverview";
import EditAccount from "./EditAccount";

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

const Overview = ({ user }: { user: UserProps }) => {
  const [isOverviewOverlayOpen, setIsOverviewOverlayOpen] = useState(false);
  const [isAccountOverlayOpen, setIsAccountOverlayOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);

  const handleLogout = () => {};

  const handleOverview = (user: UserProps) => {
    setSelectedUser(user); // Lưu thông tin sản phẩm cần chỉnh sửa
    setIsOverviewOverlayOpen(true); // Mở modal
  };

  const handleAccount = (user: UserProps) => {
    setSelectedUser(user); // Lưu thông tin sản phẩm cần chỉnh sửa
    setIsAccountOverlayOpen(true); // Mở modal
  };
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="w-full shadow-lg flex flex-col p-4 gap-2 rounded-md ">
        <div className="w-full flex justify-between   border-b border-border-color pb-3 items-center">
          <p className="text-[22px] text-text-dark-500 font-semibold">
            Overview
          </p>
          <Icon
            icon="fluent:edit-16-regular"
            className="text-2xl text-dark-500 hover:cursor-pointer"
            onClick={() => handleOverview(user)}
          />
        </div>

        <div className="w-full grid grid-cols-3 pt-2">
          <OverviewAccount content={user.fullname} title="Full name" />
          <OverviewAccount content={user.email} title="Email" />
          <OverviewAccount content={user.cardId} title="Card ID" />
        </div>
        <div className="w-full grid grid-cols-2">
          <OverviewAccount
            content={format(user.dob, "PPP")}
            title="Date of birth"
          />
          <OverviewAccount content={user.phoneNumber} title="Phone number" />
        </div>
        <div className="w-full grid grid-cols-2">
          <OverviewAccount content={`#${user.id}`} title="ID" />

          <OverviewAccount content={user.position} title="Position" />
        </div>
        <div className="w-full grid grid-cols-3">
          <OverviewAccount content={user.address} title="Address" />
          <OverviewAccount content={user.city} title="City" />
          <OverviewAccount content={user.country} title="Country" />
        </div>
      </div>
      <div className="w-full shadow-lg flex flex-col p-4 gap-2 rounded-md ">
        <div className="w-full flex justify-between   border-b border-border-color pb-3 items-center">
          <p className="text-[22px] text-text-dark-500 font-semibold">
            Overview
          </p>
          <Icon
            icon="fluent:edit-16-regular"
            className="text-2xl text-dark-500 hover:cursor-pointer"
            onClick={() => handleAccount(user)}
          />
        </div>

        <div className="w-full flex  gap-4 pt-2">
          <div className="w-[120px] h-[120px] relative  overflow-hidden rounded-full">
            <Image
              src={user.avatar}
              alt="avatar"
              className="object-cover"
              fill
            />
          </div>
          <div className="w-full grid grid-rows-3">
            <OverviewAccount content={user.acountName} title="Account name" />
            <OverviewAccount content={user.password} title="Password" />
            <OverviewAccount content={user.status} title="Status" />
            <OverviewAccount
              content={format(user.enrolledDate, "PPP")}
              title="Enrolling Date"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <ButtonFunction
          event={handleLogout}
          width="w-[151px]"
          border_color="border-red-600"
          text_color="text-red-600"
          title="Log out"
          border_radius="rounded-md"
          icon="material-symbols:logout"
        />
      </div>

      <EditOverview
        isOverviewOverlayOpen={isOverviewOverlayOpen}
        selectedUser={selectedUser}
        setIsOverviewOverlayOpen={setIsOverviewOverlayOpen}
      />
      <EditAccount
        isAccountOverlayOpen={isAccountOverlayOpen}
        selectedUser={selectedUser}
        setIsAccountOverlayOpen={setIsAccountOverlayOpen}
      />
    </div>
  );
};

export default Overview;
