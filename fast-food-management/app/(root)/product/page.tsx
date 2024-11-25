import ProductList from "@/components/product/ProductList";
import Title from "@/components/shared/orther/Title";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 pt-2">
      <Title title="Products">
        <p className="mr-[1020px] text-[24px] font-light">(72 items)</p>
      </Title>
      <ProductList />
    </div>
  );
};

export default page;
