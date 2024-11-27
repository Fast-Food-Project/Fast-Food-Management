import React from "react";
import classNames from "classnames";

interface InputEditProps {
  titleInput: string;
  width: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  name?: string;
}

const InputNumber = ({
  titleInput,
  width,
  value,
  onChange,
  placeholder,
  name,
}: InputEditProps) => {
  return (
    <div className={classNames("flex flex-col gap-[8px]", width)}>
      <p className="text-text-dark-400">{titleInput}:</p>
      <input
        type="number"
        name={name} // Ensure each input has a unique name attribute
        value={value} // Allow dynamic value binding
        onChange={onChange} // Allow handling value changes
        placeholder={placeholder} // Optional placeholder
        style={{
          appearance: "textfield",
          MozAppearance: "textfield",
          WebkitAppearance: "none",
        }}
        className="h-[34px] border border-border-color rounded-lg px-2 focus:outline-none focus:ring-0"
      />
    </div>
  );
};

export default InputNumber;
