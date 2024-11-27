import InvoiceList from "@/components/invoice/InvoiceList";
import Title from "@/components/shared/orther/Title";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 pt-2">
      <Title title="Invoice"></Title>
      <InvoiceList />
    </div>
  );
};

export default page;
