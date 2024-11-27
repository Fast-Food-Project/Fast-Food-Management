import OrderFormList from "@/components/order-form/OrderFormList";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 pt-2">
      <OrderFormList />
    </div>
  );
};

export default page;
