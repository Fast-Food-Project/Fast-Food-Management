"use client";
import React from "react";
import { Icon } from "@iconify/react";
import classNames from "classnames";

type LabelAnalyticsProps = {
  icon?: string;
  title: string; // Title text
  value: number; // Numeric value
  width: string;
};

const LabelDashboard: React.FC<LabelAnalyticsProps> = ({
  icon = "solar:sale-outline",
  title,
  value,
  width,
}) => {
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
        <p className="text-[24px] font-semibold">
          {value.toLocaleString("en-US")} VND {/* Explicit locale */}
        </p>
      </div>

      {/* Time Period */}
    </div>
  );
};

export default LabelDashboard;
