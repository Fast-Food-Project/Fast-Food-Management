import React from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="w-full h-20 flex justify-between border-b border-border-color p-4">
      <div>
        <div className="flex gap-2 font-semibold text-primary-100 text-[18px]">
          Hi <p>Juni</p>
        </div>
        <div className="text-text-color font-normal text-[14px]">
          Good Morning!
        </div>
      </div>
      <div className="self-center flex gap-4">
        <div className="w-12 h-12 rounded-lg bg-light-bg flex justify-center items-center">
          <Icon
            icon="solar:bell-outline"
            className={` text-2xl text-text-color`}
          />
        </div>
        <div className="w-12 h-12 rounded-lg bg-light-bg flex justify-center items-center">
          <Icon
            icon="basil:search-outline"
            className={` text-2xl text-text-color`}
          />
        </div>
        <div className="w-32 h-12 bg-custom-bg flex p-1 items-center shadow-md rounded-lg gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src="/assets/images/ava.png"
              alt="avatar"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>

          <div className="flex-1 flex flex-col">
            <p className="text-[12px] font-semibold text-text-color">Juni</p>
            <p className="text-[10px]  text-light-text">Management</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
