"use client";

import ProductFrame from "@/components/shared/orther/ProductFrame";
import React from "react";

const page = () => {
  // Sample product data
  const productData = {
    id: "1",
    image: "/assets/images/product.png",
    name: "Sample Product Sample Product",
    price: "100,000",
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Product Frame Test</h1>
      <ProductFrame param={productData} />
    </div>
  );
};

export default page;
