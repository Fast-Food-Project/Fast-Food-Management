import React, { useEffect, useState } from "react";
import ImportInformation from "./InportInformation";
import { InventoryListData } from "@/constants/data";
import SelectionProductCard from "./SelectionProductCard";
import { useParams } from "next/navigation";
import SearchBar from "../shared/orther/SearchBar";

type UserTable = {
  id: string;
  name: string;
  stockLevel: number;
  unit: string;
  supplier: string;
  status: number;
};

const DetailImport = () => {
  const { id } = useParams<{ id: string }>(); // Ensure id is a string
  const [item, setItem] = useState<UserTable | null>(null);

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

  return (
    <div className="w-full flex flex-col gap-4">
      <ImportInformation itemId={item.id} />
      <div className="flex-col w-full py-4">
        <p className="text-[20px] text-text-dark-500 pb-4">
          Your selected products:
        </p>
        <SearchBar onSearch={handleSearch} />

        {/* Displaying the selected product */}
        <div className="flex flex-wrap gap-4 pt-4">
          <SelectionProductCard
            key={item.id}
            item={item}
            background="bg-white" // Adjust background if needed
            readOnly={true}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailImport;
