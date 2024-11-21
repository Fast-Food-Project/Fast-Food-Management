//import InputEdit from "@/components/shared/input/InputEdit";
//import InputDate from "@/components/shared/input/InputDate";
import InputSelection from "@/components/shared/input/InputSelection";
//import InputNumber from "@/components/shared/input/InputNumber";
//import InputPassword from "@/components/shared/input/InputPassword";
import React from "react";

const page = () => {
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  return (
    <div>
      <InputSelection
        titleInput="Choose an option"
        options={options}
        width="w-1/2"
      />
    </div>
  );
};

export default page;
