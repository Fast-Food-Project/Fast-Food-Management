"use client";
import LabelDashboard from "@/components/shared/label/LabelDashboard";

const Page = () => {
  return (
    <div className="p-4 space-y-4">
      <LabelDashboard
        icon="mdi:chart-line"
        title="Revenue"
        value={125000}
        width="w-[330px]"
      />
      <LabelDashboard title="Expenses" value={89000} width="w-[330px]" />
    </div>
  );
};

export default Page;
