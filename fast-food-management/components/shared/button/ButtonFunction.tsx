"use client";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import classNames from "classnames";

type ButtonFunctionProps = {
  event: () => void; // onClick event handler
  title?: string; // Button title text
  icon?: string; // Icon to display with the button
  text_color?: string; // Text color
  border_color?: string; // Border color
  border_radius?: string; // Border radius for rounded corners
  background?: string; // Button background color
  width: string;
  height?: string;
  px?: string;
  py?: string;
  text?: string;
};

const ButtonFunction: React.FC<ButtonFunctionProps> = ({
  event,
  title,
  icon,
  text_color = "text-primary-100",
  border_color = "border-primary-100",
  border_radius = "rounded-md",
  background = "bg-white",
  width,
  height = "h-9",
  px = "px-[12px]",
  py = "py-[8px]",
  text = "text-[16px]",
}) => {
  return (
    <div
      className={classNames(
        "flex justify-center items-center border",
        border_color, // Border color
        background, // Background color
        border_radius,
        width,
        height,
        px,
        py // Padding
      )}
      style={{
        borderWidth: "0.5px", // Set border width if necessary
      }}
    >
      <button
        className={classNames(
          "flex items-center gap-[4px] rounded-lg",
          text,
          text_color // Apply dynamic text color class
        )}
        onClick={event}
      >
        {/* Conditionally render icon if it's provided */}
        {icon && <Icon icon={icon} className="text-[18px]" />}
        {title}
      </button>
    </div>
  );
};

export default ButtonFunction;
