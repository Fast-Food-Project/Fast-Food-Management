"use client";
import StoresList from "@/components/stores/StoresList";
import React from "react";

const Page = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 pt-2">
      <StoresList />
    </div>
  );
};

export default Page;
