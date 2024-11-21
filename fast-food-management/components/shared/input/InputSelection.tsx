"use client";
import React, { useState } from "react";
import classNames from "classnames";
import { Icon } from "@iconify/react";

interface InputSelectionProps {
  titleInput: string;
  options: string[]; // Các tùy chọn có sẵn cho người dùng chọn
  width: string;
}

const InputSelection: React.FC<InputSelectionProps> = ({
  titleInput,
  options,
  width,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // Trạng thái lưu lựa chọn
  const [showOptions, setShowOptions] = useState(false); // Trạng thái để hiển thị danh sách lựa chọn

  // Hàm để toggle hiển thị dropdown
  const handleDropdownClick = () => {
    setShowOptions((prev) => !prev); // Đảo trạng thái hiển thị của dropdown
  };

  // Hàm chọn giá trị từ dropdown
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option); // Cập nhật giá trị đã chọn
    setShowOptions(false); // Đóng dropdown sau khi chọn
  };

  return (
    <div className={classNames("flex flex-col gap-[8px]", width)}>
      <p>{titleInput}:</p>
      <div className="relative">
        {/* Input field */}
        <input
          type="text"
          value={selectedOption || ""}
          placeholder="Select an option"
          className="h-[34px] w-full border border-gray-300 rounded-lg px-3 text-gray-700 bg-white focus:outline-none cursor-pointer"
          onClick={handleDropdownClick} // Mở dropdown khi nhấp vào input
          readOnly // Đảm bảo input chỉ hiển thị giá trị đã chọn
        />

        {/* Icon để mở dropdown */}
        <span
          onClick={handleDropdownClick} // Thêm sự kiện nhấn vào icon để toggle dropdown
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
        >
          <Icon icon="uil:angle-down" className="text-2xl text-text-color" />
        </span>

        {/* Dropdown hiển thị khi showOptions là true */}
        {showOptions && (
          <div className="absolute right-0 top-full mt-2 w-full rounded-lg border border-gray-300 bg-white shadow-lg z-50">
            <ul>
              {options.map((option, index) => (
                <li
                  key={index}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleOptionSelect(option)} // Chọn giá trị từ dropdown
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputSelection;
