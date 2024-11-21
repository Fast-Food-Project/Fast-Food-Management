import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React from "react";

interface ProductProps {
  id: string;
  image: string;
  name: string;
  price: string;
}

const ProductFrame = ({ param }: { param: ProductProps }) => {
  return (
    <div className="flex flex-col w-[152px] h-[276px] bg-active-background rounded-md px-4 py-2 gap-2">
      <p className="ml-2">#{param.id}</p>
      <div className="flex items-center justify-center pb-2">
        <Image
          alt="product-img"
          src="/assets/images/product.png"
          height={120}
          width={120}
          className="rounded-md"
        />
      </div>
      {/* Name - Truncate if too long */}
      <p className="font-semibold text-[14px] truncate overflow-hidden whitespace-nowrap">
        {param.name}
      </p>
      {/* Price - Truncate if too long */}
      <p className="font-semibold text-[14px] truncate overflow-hidden whitespace-nowrap">
        {param.price} VND
      </p>
      <div className="flex justify-end items-center">
        <Icon
          icon="fluent:edit-16-regular"
          className="text-[16px] text-text-color"
        />
        <p className="px-2">|</p>
        <Icon icon="gg:trash" className="text-[16px] text-text-color" />
      </div>
    </div>
  );
};

export default ProductFrame;
