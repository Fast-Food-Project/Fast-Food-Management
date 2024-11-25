"use client";
import EditExportInformation from "@/components/inventory/export/EditExportInformation";
import EditImportList from "@/components/inventory/import/EditImportList";
import Title from "@/components/shared/orther/Title";
import { useRouter } from "next/navigation";
import React from "react";
import { Icon } from "@iconify/react"; // Ensure the correct import

const Page = () => {
  // Renamed from 'page' to 'Page'
  const router = useRouter(); // Initialize the router

  const handleCloseClick = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 pt-2">
      <Title title="Edit Export Item">
        <div onClick={handleCloseClick}>
          <Icon
            icon="material-symbols:close"
            className="text-2xl text-dark-500"
          />
        </div>
      </Title>
      <EditExportInformation />
      <EditImportList nameAction="Save" />
    </div>
  );
};

export default Page; // Exported as 'Page' now
