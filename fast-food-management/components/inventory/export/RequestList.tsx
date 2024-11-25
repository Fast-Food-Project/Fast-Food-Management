import DashboardRequestExportList from "@/components/dashboard/DashboardRequestExportList";
import FilterButton from "@/components/shared/button/FilterButton";
import SearchBar from "@/components/shared/orther/SearchBar";
import React from "react";

const RequestList = () => {
  const filterStatus = ["Unit", "Name", "Id"];

  const handleSetFilter = () => {};

  const handleSearch = () => {};

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex gap-2">
        <SearchBar onSearch={handleSearch} />
        <FilterButton status_title={filterStatus} SetFilter={handleSetFilter} />
      </div>
      <DashboardRequestExportList haveHeader={false} />
    </div>
  );
};

export default RequestList;
