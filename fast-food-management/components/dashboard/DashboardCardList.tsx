import React from "react";
import LabelDashboard from "../shared/label/LabelDashboard";

const DashboardCardList = () => {
  return (
    <div className="w-4/5 grid grid-cols-2 gap-4">
      {/* Hiển thị giá trị theo kiểu VND */}
      <LabelDashboard
        icon="solar:sale-outline"
        title="Total Sales Revenue"
        value={5500000}
        width="w-[200px]"
        type={0}
      />

      {/* Hiển thị chỉ số đơn thuần */}
      <LabelDashboard
        icon="hugeicons:delivery-truck-01"
        title="Total Products"
        value={120}
        width="w-[200px]"
        type={1}
      />

      {/* Hiển thị phần trăm */}
      <LabelDashboard
        icon="hugeicons:trolley-02"
        title="Customer Order"
        value={25}
        width="w-[200px]"
        type={1}
      />
      <LabelDashboard
        icon="lineicons:revenue"
        title="Total Requests"
        value={5000000}
        width="w-[200px]"
        type={1}
      />

      {/* Hiển thị chỉ số đơn thuần */}
      <LabelDashboard
        icon="solar:box-outline"
        title="Total Inventory"
        value={120}
        width="w-[200px]"
        type={1}
      />

      {/* Hiển thị phần trăm */}
      <LabelDashboard
        icon="lucide:chart-gantt"
        title="Total Stores"
        value={25}
        width="w-[200px]"
        type={2}
      />
    </div>
  );
};

export default DashboardCardList;
