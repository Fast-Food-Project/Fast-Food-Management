import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const TitleSession = ({ icon, title }: { icon: string; title: string }) => {
  return (
    <div className="w-full h-14 flex items-center text-text-dark-500 font-semibold gap-4 border-b border-border-color">
      <Icon
        icon={icon}
        className="text-[18px] text-primary-100" // Biểu tượng filter
      />
      <p className="text-[16px] text-primary-100">{title}:</p>
    </div>
  );
};

export default TitleSession;
