import React from "react";
import classNames from "classnames";

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // Thêm props.children
  header: string;
  width: string;
}

const Overlay: React.FC<OverlayProps> = ({
  isOpen,
  onClose,
  children,
  header,
  width,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className={classNames("bg-white p-4 rounded-lg shadow-lg ", width)}
        onClick={(e) => e.stopPropagation()} // Prevent click from closing overlay when clicking inside
      >
        <div className="h-8 flex justify-between items-center">
          <p className="text-[24px] text-text-dark-500 font-semibold">
            {header}
          </p>
          <button
            onClick={onClose}
            className="  rounded text-[24px] text-text-dark-500 hover:cursor-pointer "
          >
            x
          </button>
        </div>
        {/* Truyền nội dung con vào đây */}
        {children}
      </div>
    </div>
  );
};

export default Overlay;
