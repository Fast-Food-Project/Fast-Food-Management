import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React from "react";

interface GradientProps {
  name: string;
  quantity: number;
  unit: string;
}

interface ProductProps {
  id: string;
  image: string;
  productName: string;
  price: number;
  ingredients: GradientProps[];
  createAt: Date;
}

const ProductFrame = ({
  param,
  onDelete,
  onEdit,
  onDetail,
}: {
  param: ProductProps;
  onDelete: (id: string) => void;
  onEdit: (product: ProductProps) => void; // Nhận toàn bộ sản phẩm
  onDetail: (product: ProductProps) => void; // Nhận toàn bộ sản phẩm
}) => {
  return (
    <div className="flex flex-col w-[152px] h-[276px] bg-active-background rounded-md px-4 py-2 gap-2 shadow-lg">
      <p className="">#{param.id}</p>
      <div className="flex items-center justify-center pb-2">
        <div
          className="w-[120px] h-[120px] relative  hover:cursor-pointer"
          onClick={() => onDetail(param)}
        >
          <Image
            alt="product-img"
            src={param.image}
            fill
            className="object-cover rounded-md"
          />
        </div>
      </div>
      <p className="font-semibold text-[14px] truncate overflow-hidden whitespace-nowrap">
        {param.productName}
      </p>
      <p className="font-semibold text-[14px] text-text-dark-400 truncate overflow-hidden whitespace-nowrap">
        {param.price} VND
      </p>
      <div className="flex justify-end items-center">
        <Icon
          icon="fluent:edit-16-regular"
          className="text-[16px] text-text-color cursor-pointer"
          onClick={() => onEdit(param)}
        />
        <p className="px-2">|</p>
        <Icon
          icon="gg:trash"
          className="text-[16px] text-text-color cursor-pointer"
          onClick={() => onDelete(param.id)} // Trigger the delete action
        />
      </div>
    </div>
  );
};

export default ProductFrame;
