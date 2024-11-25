import React, { useEffect, useState } from "react";
import { InventoryListData } from "@/constants/data";
import { useParams, useRouter } from "next/navigation";
import SearchBar from "../../shared/orther/SearchBar";
import SelectionProductCard from "../import/SelectionProductCard";
import ExportInformation from "./ExportInformation";
import FilterButton from "@/components/shared/button/FilterButton";
import ButtonFunction from "@/components/shared/button/ButtonFunction";

type UserTable = {
  id: string;
  name: string;
  stockLevel: number;
  unit: string;
  supplier: string;
  status: number;
};

const DetailExport = () => {
  const { id } = useParams<{ id: string }>(); // Ensure id is a string
  const [item, setItem] = useState<UserTable | null>(null);
  const filterStatus = ["Unit", "Name", "Id"];
  const router = useRouter(); // Initialize the router

  const handleSetFilter = () => {};
  useEffect(() => {
    if (id) {
      const foundItem = InventoryListData.find((item) => item.id === id);
      setItem(foundItem || null); // Update the item data
    }
  }, [id]);

  if (!item) {
    return <p>No product found for the given ID.</p>; // Display message if no item found
  }

  const handleSearch = () => {};

  const handleCancel = () => {
    router.back(); // Navigate back to the previous page
  };

  const handleExport = () => {};

  return (
    <div className="w-full flex flex-col gap-4">
      <ExportInformation itemId={item.id} />
      <div className="flex-col w-full py-4">
        <p className="text-[20px] text-text-dark-500 pb-4">
          Your selected products:
        </p>
        <div className="flex gap-2">
          <SearchBar onSearch={handleSearch} />
          <FilterButton
            status_title={filterStatus}
            SetFilter={handleSetFilter}
          />
        </div>

        {/* Displaying the selected product */}
        <div className="flex flex-wrap gap-4 pt-4">
          <SelectionProductCard
            key={item.id}
            item={item}
            background="bg-white" // Adjust background if needed
            readOnly={true}
          />
        </div>
        <div className="w-full p-4 flex items-end justify-end gap-4 mt-14">
          <ButtonFunction
            event={handleCancel}
            title="Cancel"
            width="w-[86px]"
            background="bg-white"
            border_radius="rounded-[8px]"
            height="h-[36px]"
            text_color="text-text-dark-500"
            border_color="border-gray-400"
          />
          <ButtonFunction
            event={handleExport}
            title="Export"
            width="w-[86px]"
            background="bg-white"
            border_radius="rounded-[8px]"
            height="h-[36px]"
            text_color="text-text-dark-500"
            border_color="border-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailExport;
