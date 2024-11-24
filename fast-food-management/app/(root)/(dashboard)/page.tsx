"use client";
import Chart from "@/components/dashboard/Chart";
import DashboardCardList from "@/components/dashboard/DashboardCardList";
import DashboardRequestExportList from "@/components/dashboard/DashboardRequestExportList";
import SelectionButton from "@/components/shared/button/SelectionButton";
import Title from "@/components/shared/orther/Title";
import React, { useState } from "react";

const Page = () => {
  const title = ["This Week", "Last Week", "Last Day"];

  const [selectedOption, setSelectedOption] = useState("This Week");

  const handleSelect = (selection: string) => {
    setSelectedOption(selection);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 pt-2">
      <Title title="Overview">
        <div>
          <SelectionButton
            selection_title={title}
            SetSelection={selectedOption}
            onSelect={handleSelect}
            width="w-[135px]"
          />
        </div>
      </Title>
      <div className="flex gap-4">
        <DashboardCardList />
        <Chart />
      </div>
      <DashboardRequestExportList />
    </div>
  );
};

export default Page;
