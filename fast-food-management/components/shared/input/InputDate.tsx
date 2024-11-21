"use client";
import React, { useState, useRef } from "react";
import classNames from "classnames";
import { Icon } from "@iconify/react";
import DatePicker from "react-datepicker"; // Import react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for react-datepicker

// Typing the component props
interface InputDateProps {
  titleInput: string;
  width: string;
}

const InputDate: React.FC<InputDateProps> = ({ titleInput, width }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // State for the selected date
  const [showCalendar, setShowCalendar] = useState(false); // State for showing the calendar
  const calendarRef = useRef<HTMLDivElement | null>(null); // Reference for the calendar div

  // Function to toggle calendar visibility
  const handleIconClick = () => {
    setShowCalendar((prev) => !prev); // Toggle the calendar visibility
  };

  // Function to close calendar if clicked outside
  const handleClickOutside = (e: MouseEvent) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(e.target as Node)
    ) {
      setShowCalendar(false); // Close the calendar
    }
  };

  // Hook to listen for outside clicks
  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={classNames("flex flex-col gap-[8px]", width)}>
      <p>{titleInput}:</p>
      <div className="relative">
        {/* Input field */}
        <input
          type="text"
          value={selectedDate ? selectedDate.toLocaleDateString() : ""}
          placeholder="Select a date"
          className="h-[34px] w-full border border-gray-300 rounded-lg px-3 text-gray-700 bg-white focus:outline-none"
          onClick={handleIconClick} // Open calendar on input click
        />

        {/* Icon to trigger the calendar */}
        <span
          onClick={handleIconClick} // Toggle calendar visibility on icon click
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
        >
          <Icon icon="uil:calender" className="text-2xl text-dark-500" />
        </span>

        {/* Date picker calendar, shown when showCalendar is true */}
        {showCalendar && (
          <div
            ref={calendarRef}
            className="absolute right-2 top-full mt-4 w-[240px] h-[236px] rounded-lg border border-gray-300 shadow-lg z-50"
          >
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date) => setSelectedDate(date)} // Update selected date
              inline // Display the calendar inline below the input
              dateFormat="dd/MM/yyyy" // Date format to be displayed
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputDate;
