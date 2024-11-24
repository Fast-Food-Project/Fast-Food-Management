"use client";
import React from "react";
import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
];

const chartConfig = {
  chrome: {
    label: "In Stock",
    color: "#BAC3F8",
  },
  safari: {
    label: "Expired",
    color: "#2E4CE8",
  },
  firefox: {
    label: "Out Of Stock",
    color: "#061246",
  },
} satisfies ChartConfig;

const Chart = () => {
  // Tính toán tổng số lượng cho mỗi loại
  const totalInStock =
    chartData.find((item) => item.browser === "chrome")?.visitors || 0;
  const totalExpired =
    chartData.find((item) => item.browser === "safari")?.visitors || 0;

  return (
    <Card className="w-[500px] flex flex-col">
      <CardHeader className="items-start gap-2 pb-0 text-[24px]">
        <CardTitle>Inventory</CardTitle>
      </CardHeader>
      <div className=" w-full h-[200px] mt-4">
        <div>
          <CardContent className="pb-0">
            {/* Flex container for two charts */}
            <div className="flex w-full">
              <ChartContainer
                config={chartConfig}
                className="w-[200px] h-[220px] " // Adjusted width and height
              >
                <PieChart>
                  <Pie data={chartData} dataKey="visitors" />
                  <ChartLegend
                    content={<ChartLegendContent nameKey="browser" />}
                    className="-translate-y-[120px] translate-x-[170px] flex-wrap [&>*]:basis-3/4 [&>*]:justify-start gap-2 text-[16px] text-text-dark-400"
                  />
                </PieChart>
              </ChartContainer>
            </div>

            {/* Displaying counts below the chart */}
          </CardContent>
        </div>
      </div>

      <div className="flex justify-around w-full h-2/5 text-start gap-2">
        <div className="flex flex-col items-start gap-2">
          <span className="text-sm text-text-dark-400 text-[20px]">
            In Stock
          </span>
          <span className="text-[24px] font-semibold">{totalInStock}</span>
        </div>
        <div className="flex flex-col items-start gap-2">
          <span className="text-sm text-text-dark-400 text-[20px]">
            Exported Products
          </span>
          <span className="text-[24px] font-semibold">{totalExpired}</span>
        </div>
      </div>
    </Card>
  );
};

export default Chart;
