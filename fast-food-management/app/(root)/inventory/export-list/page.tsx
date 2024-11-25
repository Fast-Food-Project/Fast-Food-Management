import ExportList from "@/components/inventory/export/ExportList";
import Title from "@/components/shared/orther/Title";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 pt-2">
      <Title title="Inventory / Export List" />
      <ExportList />
    </div>
  );
};

export default page;
