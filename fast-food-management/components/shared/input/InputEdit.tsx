import React from "react";
import classNames from "classnames";

const InputEdit = ({
  titleInput,
  width,
}: {
  titleInput: string;
  width: string;
}) => {
  return (
    <div className={classNames("flex flex-col gap-[8px]", width)}>
      <p>{titleInput}:</p>
      <input
        type="text"
        className="h-[34px] border border-border-color rounded-lg px-2 focus:outline-none focus:ring-0"
      />
    </div>
  );
};

export default InputEdit;
