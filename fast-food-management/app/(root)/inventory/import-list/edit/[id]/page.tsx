"use client";
import EditImportList from "@/components/inventory/EditImportList";
import EditInformation from "@/components/inventory/EditInformation";
import Title from "@/components/shared/orther/Title";
import { Icon } from "@iconify/react"; // Ensure the correct import
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter(); // Initialize the router

  const handleCloseClick = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 pt-2">
      <Title title="Edit Import Item">
        <div onClick={handleCloseClick}>
          <Icon
            icon="material-symbols:close"
            className="text-2xl text-dark-500"
          />
        </div>
      </Title>
      <EditInformation />
      <EditImportList nameAction="Save" />
    </div>
  );
};

export default page;
