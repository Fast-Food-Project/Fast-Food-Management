"use client";
import React from "react";
import { Icon } from "@iconify/react";
import classNames from "classnames";

type LabelAnalyticsProps = {
  icon: string;
  title: string; // Title text
  value: number; // Numeric value
  status: boolean; // `true` for rise, `false` for fall
  percent: number; // Percentage change
  time: boolean; // `true` for 6 months, `false` for year
  width: string;
};

const LabelAnalytics: React.FC<LabelAnalyticsProps> = ({
  icon,
  title,
  value,
  status,
  percent,
  time,
  width,
}) => {
  return (
    <div
      className={classNames(
        "flex flex-col justify-between h-[153px] w-auto border border-gray-300 rounded-lg drop-shadow p-4",
        width
      )}
      style={{
        borderWidth: "0.5px", // Adjust border width
      }}
    >
      {/* Icon and Title */}
      <div className="flex items-center gap-2">
        <Icon icon={icon} className="text-2xl text-primary-100" />
        <h3 className="text-[16px]">{title}</h3>
      </div>

      {/* Value and Status */}
      <div className="mt-4">
        <p className="text-[24px] font-semibold">
          {value.toLocaleString("en-US")} {/* Explicit locale */}
        </p>
        <div className={classNames("flex items-center gap-2 mt-2")}>
          <div
            className={classNames(
              "flex items-center gap-1 rounded-lg px-2 p-1",
              status ? "text-green-500 bg-light-green" : "text-red-500"
            )}
          >
            <Icon
              icon={status ? "mdi:arrow-up-bold" : "mdi:arrow-down-bold"}
              className={classNames(
                "text-xl",
                status ? "text-green-500" : "text-red-500"
              )}
            />
            <span
              className={classNames(
                "text-sm font-semibold",
                status ? "text-green-500" : "text-red-500"
              )}
            >
              {percent}%
            </span>
          </div>

          <div className="mt-auto pl-2 text-sm text-gray-500">
            {time ? "(more than 6 months)" : "year"}
          </div>
        </div>
      </div>

      {/* Time Period */}
    </div>
  );
};

export default LabelAnalytics;
