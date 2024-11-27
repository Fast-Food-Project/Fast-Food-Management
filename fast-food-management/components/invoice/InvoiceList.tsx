"use client";

import React, { useState } from "react";
import PagingBar from "../shared/orther/PagingBar";
import ImportInventoryTableList from "./ImportInventoryTableList";
import StoresOrderingTableList from "./StoresOrderingTableList";

const InvoiceList = () => {
  const [activeTitle, setActiveTitle] = useState("Import Inventory"); // Track the active title
  const title = ["Import Inventory", "Store Ordering"];

  const handleTitleClick = (selectedTitle: string) => {
    setActiveTitle(selectedTitle);
    console.log(`Selected Title: ${selectedTitle}`);
  };
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full flex justify-start">
        <PagingBar title={title} event={handleTitleClick} />
      </div>

      {/* Conditionally render ImportList only for "All" */}
      {activeTitle === "Import Inventory" && <ImportInventoryTableList />}

      {/* Placeholder or logic for "Request" */}
      {activeTitle === "Store Ordering" && <StoresOrderingTableList />}
    </div>
  );
};

export default InvoiceList;
