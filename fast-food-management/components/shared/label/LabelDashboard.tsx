"use client";
import React from "react";
import { Icon } from "@iconify/react";
import classNames from "classnames";

type LabelAnalyticsProps = {
  icon?: string;
  title: string; // Title text
  value: number; // Numeric value
  width: string;
  type: number; // 0: VND, 1: number only, 2: percentage
};

const LabelDashboard: React.FC<LabelAnalyticsProps> = ({
  icon = "solar:sale-outline",
  title,
  value,
  width,
  type,
}) => {
  // Xử lý hiển thị giá trị dựa trên `type`
  const formattedValue = () => {
    switch (type) {
      case 0: // Hiển thị VND
        return `${value.toLocaleString("en-US")} VND`;
      case 1: // Chỉ hiển thị số
        return value.toLocaleString("en-US");
      case 2: // Hiển thị phần trăm
        return `${value}%`;
      default:
        return value.toString();
    }
  };

  return (
    <div
      className={classNames(
        "flex flex-col justify-between h-[106px] w-auto border border-gray-300 rounded-lg drop-shadow p-4",
        width
      )}
      style={{
        borderWidth: "0.5px", // Adjust border width
      }}
    >
      {/* Icon and Title */}
      <div className="flex items-center gap-2">
        <div className="w-[28px] h-[28px] flex justify-center items-center rounded-md bg-active-background">
          <Icon icon={icon} className="text-[16px] text-primary-100" />
        </div>
        <h3 className="text-[16px]">{title}</h3>
      </div>

      {/* Value and Status */}
      <div className="mt-4">
        <p className="text-[24px] font-semibold">{formattedValue()}</p>
      </div>
    </div>
  );
};

export default LabelDashboard;
