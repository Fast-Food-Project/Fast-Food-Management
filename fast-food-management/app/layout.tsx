import React from "react";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FastFood",
  description: "Fast Food System",
  icons: {
    icon: "/assets/images/site-logo.svg", // Loại bỏ "/public" vì Next.js tự xử lý thư mục `public`
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="mdl-js">
      <body>
        {/* Nếu bạn muốn thêm các tùy chỉnh class hoặc styles */}
        <div
          className="app-container"
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
