import React from "react";
import classNames from "classnames";

const InputNumber = ({
  titleInput,
  width,
}: {
  titleInput: string;
  width: string;
}) => {
  return (
    <div className={classNames("flex flex-col gap-[8px]", width)}>
      <p className="text-text-dark-400">{titleInput}:</p>
      <input
        type="number"
        style={{
          appearance: "textfield",
          MozAppearance: "textfield",
          WebkitAppearance: "none",
        }}
        className="h-[34px] border border-border-color rounded-lg px-2 focus:outline-none focus:ring-0"
      />
    </div>
  );
};

export default InputNumber;
