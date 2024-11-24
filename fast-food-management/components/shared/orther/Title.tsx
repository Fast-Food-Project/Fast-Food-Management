import React from "react";

const Title = ({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="w-full  h-14 flex items-center justify-between text-text-dark-500 font-semibold text-[24px]">
      <h1>{title}</h1>
      <div>{children}</div>
    </div>
  );
};

export default Title;
