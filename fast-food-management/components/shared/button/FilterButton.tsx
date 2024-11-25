"use client";
import React, { useState } from "react";
import classNames from "classnames";
import { Icon } from "@iconify/react/dist/iconify.js";

type FilterProps = {
  status_title: string[]; // Danh sách các trạng thái
  SetFilter: (filter: string) => void; // Hàm callback để cập nhật trạng thái lọc
};

const FilterButton = ({ status_title, SetFilter }: FilterProps) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("Filter"); // Giá trị ban đầu
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // Trạng thái mở/đóng dropdown

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter); // Cập nhật trạng thái đã chọn
    SetFilter(filter); // Gọi hàm callback để truyền giá trị ra ngoài
    setIsDropdownOpen(false); // Đóng dropdown sau khi chọn
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Đổi trạng thái mở/đóng dropdown
  };

  return (
    <div className="relative">
      {/* Nút chính hiển thị giá trị hiện tại */}
      <button
        className="h-[38px] w-[87px] border border-gray-300 flex justify-center items-center rounded-lg bg-white gap-2"
        style={{
          borderWidth: "0.5px", // Độ dày đường viền
        }}
        onClick={toggleDropdown} // Mở/đóng dropdown
      >
        {selectedFilter === "Filter" ? (
          // Hiển thị icon filter khi giá trị là "Filter"
          <>
            <Icon
              icon="mi:filter"
              className="text-[14px] text-gray-700" // Biểu tượng filter
            />
            <span className="text-[14px]">{selectedFilter}</span>{" "}
            {/* Hiển thị chữ Filter */}
          </>
        ) : (
          <span>{selectedFilter}</span> // Hiển thị chữ khi không phải "Filter"
        )}
      </button>

      {/* Dropdown các tùy chọn */}
      {isDropdownOpen && (
        <ul className="absolute top-full  w-[100px] mt-1 bg-white border border-gray-300 rounded-lg shadow-md z-10">
          {status_title.map((status, index) => (
            <li
              key={index}
              className={classNames(
                "cursor-pointer py-2 text-[14px] px-4 text-center text-text-dark-400 hover:bg-primary-100 hover:text-white rounded-md flex items-center gap-2",
                {
                  "bg-primary-100 text-white": selectedFilter === status, // Nếu được chọn, đổi màu
                }
              )}
              onClick={() => handleFilterClick(status)} // Cập nhật filter khi chọn
            >
              <span className="text-[14px]">{status}</span>{" "}
              {/* Hiển thị trạng thái */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterButton;
