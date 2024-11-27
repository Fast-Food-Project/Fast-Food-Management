"use client";
import EditOrderForm from "@/components/order-form/EditOrderForm";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter(); // Initialize the router

  const handleCloseClick = () => {
    router.back(); // Navigate back to the previous Page
  };
  return (
    <div className="w-full flex flex-col gap-4 p-2">
      <div className="flex w-full justify-between">
        <p className="text-[24px] font-semibold text-text-dark-500">
          Edit Order Form
        </p>
        <Icon
          icon="iconoir:cancel"
          className="text-[24px] text-text-color cursor-pointer"
          onClick={handleCloseClick}
        />
      </div>
      <EditOrderForm />
    </div>
  );
};

export default Page;
