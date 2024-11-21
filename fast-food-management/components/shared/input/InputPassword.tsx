import React from "react";
import classNames from "classnames";
import { Icon } from "@iconify/react/dist/iconify.js";

const InputPassword = ({
  titleInput,
  width,
}: {
  titleInput: string;
  width: string;
}) => {
  return (
    <div className={classNames("flex flex-col gap-[8px]", width)}>
      <p>{titleInput}:</p>
      <div className="flex w-full gap-2 border border-border-color rounded-lg px-2 justify-between items-center">
        <input
          type="text"
          className="h-[34px] flex-1 focus:outline-none focus:ring-0 "
        />
        <Icon
          icon="fluent:eye-off-16-regular"
          className={` text-2xl text-dark-500`}
        />
      </div>
    </div>
  );
};

export default InputPassword;
