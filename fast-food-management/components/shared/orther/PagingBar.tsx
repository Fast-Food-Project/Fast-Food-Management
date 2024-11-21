"use client";

import React from "react";
import classNames from "classnames";

type PagingBarProps = {
  title: string[]; // Array of titles to display
  event: (selectedTitle: string) => void; // Event handler for title click
};

const PagingBar: React.FC<PagingBarProps> = ({ title, event }) => {
  return (
    <div className="flex items-center justify-center space-x-[68px]">
      {title.map((item, index) => (
        <button
          key={index}
          onClick={() => event(item)}
          className={classNames(
            "text-base font-medium hover:underline focus:underline focus:text-primary-100 focus:font-semibold focus:outline-none",
            "transition-all duration-150 ease-in-out"
          )}
          style={{
            marginTop: "16px", // Title to bar spacing
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default PagingBar;
