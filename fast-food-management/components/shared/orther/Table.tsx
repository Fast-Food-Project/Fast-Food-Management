import React from "react";
const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-text-dark-400 text-left text-base font-normal md:text-base">
          {columns.map((col) => (
            <th
              key={col.accessor}
              className={`text-text-dark-400 relative p-2 text-base font-normal md:p-4 ${
                col.className || ""
              }`}
            >
              <div className="flex items-center">
                <span className="text-text-dark-400 font-normal ">
                  {" "}
                  {/* Thay đổi cỡ chữ tại đây */}
                  {col.header}
                </span>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
