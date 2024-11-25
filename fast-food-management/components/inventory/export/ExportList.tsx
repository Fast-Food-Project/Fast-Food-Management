"use client";
import React, { useState } from "react";
import PagingBar from "@/components/shared/orther/PagingBar";
import ExportTableList from "./ExportTableList";
import RequestList from "./RequestList";

const ExportList = () => {
  const [activeTitle, setActiveTitle] = useState("All"); // Track the active title
  const title = ["All", "Request"];

  const handleTitleClick = (selectedTitle: string) => {
    setActiveTitle(selectedTitle);
    console.log(`Selected Title: ${selectedTitle}`);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Pass titles and the event handler to PagingBar */}
      <div className="w-full flex justify-start">
        <PagingBar title={title} event={handleTitleClick} />
      </div>

      {/* Conditionally render ImportList only for "All" */}
      {activeTitle === "All" && <ExportTableList pageEndPoint="export-list" />}

      {/* Placeholder or logic for "Request" */}
      {activeTitle === "Request" && <RequestList />}
    </div>
  );
};

export default ExportList;
