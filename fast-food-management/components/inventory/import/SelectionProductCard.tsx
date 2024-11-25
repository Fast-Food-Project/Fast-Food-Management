import classNames from "classnames";
import React, { useState } from "react";
import { Icon } from "@iconify/react";

interface ProductProps {
  id: string;
  name: string;
  stockLevel: number;
  unit: string;
  supplier: string;
  status: number;
}

interface SelectionProductCardProps {
  item: ProductProps;
  background: string;
  readOnly?: boolean; // Thêm prop readOnly để điều khiển trạng thái
  onClick?: () => void;
}

const SelectionProductCard = ({
  item,
  background,
  readOnly = false,
  onClick,
}: SelectionProductCardProps) => {
  const [quantity, setQuantity] = useState(item.stockLevel);
  const [unit, setUnit] = useState(item.unit);

  const handlePlus = () => {
    if (!readOnly) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleMinus = () => {
    if (!readOnly) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!readOnly) {
      const newQuantity = parseInt(e.target.value, 10);
      if (!isNaN(newQuantity)) {
        setQuantity(newQuantity);
      }
    }
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!readOnly) {
      setUnit(e.target.value);
    }
  };

  return (
    <div
      className={classNames(
        "w-full h-[60px] shadow-md rounded-md items-center py-2 grid grid-cols-6 mt-2",
        background
      )}
    >
      <p className="px-6">{item.id}</p>
      <p className="px-6">{item.name}</p>
      <div className="flex items-center">
        {readOnly ? (
          <p className="px-6">{quantity}</p> // Hiển thị số lượng khi readonly
        ) : (
          <>
            <Icon
              icon="ic:baseline-minus"
              className={classNames(
                "text-[18px] shadow-md rounded-md cursor-pointer",
                { "cursor-not-allowed text-gray-400": readOnly }
              )}
              onClick={handleMinus}
            />
            <input
              type="text"
              onChange={handleInputChange}
              className={classNames(
                "w-[60px] flex items-center justify-center text-center",
                background,
                { "bg-gray-200 cursor-not-allowed": readOnly }
              )}
              value={quantity}
              readOnly={readOnly}
            />
            <Icon
              icon="ic:baseline-plus"
              className={classNames(
                "text-[18px] shadow-md rounded-md cursor-pointer",
                { "cursor-not-allowed text-gray-400": readOnly }
              )}
              onClick={handlePlus}
            />
          </>
        )}
      </div>
      <div className="px-6">
        {readOnly ? (
          <p>{unit}</p> // Hiển thị đơn vị khi readonly
        ) : (
          <select
            className={classNames(
              "border border-border-color rounded-lg h-[28px] w-[58px] px-2",
              background,
              { "bg-gray-200 cursor-not-allowed": readOnly }
            )}
            value={unit}
            onChange={handleUnitChange}
            disabled={readOnly}
          >
            <option value="kg">kg</option>
            <option value="g">g</option>
          </select>
        )}
      </div>
      <p className="px-6">{item.supplier}</p>
      <div className="px-6">
        {!readOnly && (
          <Icon
            onClick={onClick}
            icon="gg:trash"
            className={classNames("text-[18px] cursor-pointer", {
              "cursor-not-allowed text-gray-400": readOnly,
            })}
          />
        )}
      </div>
    </div>
  );
};

export default SelectionProductCard;
