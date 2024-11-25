"use client";
import DetailImport from "@/components/inventory/import/DetailImport";
import Title from "@/components/shared/orther/Title";
import { Icon } from "@iconify/react"; // Ensure the correct import
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter(); // Initialize the router

  const handleCloseClick = () => {
    router.back(); // Navigate back to the previous Page
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 pt-2">
      <Title title="Detail Import Item">
        <div onClick={handleCloseClick}>
          <Icon
            icon="material-symbols:close"
            className="text-2xl text-dark-500"
          />
        </div>
      </Title>
      <DetailImport />
    </div>
  );
};

export default Page;
