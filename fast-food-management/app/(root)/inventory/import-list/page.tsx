import ImportList from "@/components/inventory/ImportList";
import Title from "@/components/shared/orther/Title";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 pt-2">
      <Title title="Inventory  /  Import List" />
      <ImportList />
    </div>
  );
};

export default page;
