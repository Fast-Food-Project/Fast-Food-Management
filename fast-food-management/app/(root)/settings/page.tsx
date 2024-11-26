import Overview from "@/components/settings/Overview";
import Title from "@/components/shared/orther/Title";
import React from "react";
import { UserData } from "@/constants/data";
const page = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 pt-2">
      <Title title="Setting"></Title>
      <Overview user={UserData} />
    </div>
  );
};

export default page;
