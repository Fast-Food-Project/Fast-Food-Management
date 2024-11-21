"use client";
import Link from "next/link";
import React from "react";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <nav className="background-light700_dark200 fixed z-50 h-screen w-60 border-r border-gray-100 p-6 shadow-md dark:border-none">
      <div className="flex gap-3">
        <span className="text-[32px] font-normal text-primary-100">
          LogiSync
        </span>
        <Image
          src="/assets/images/circum_delivery-truck.png"
          alt="Avatar"
          width={47}
          height={47}
          className="rounded-full"
        />
      </div>

      <div className="mt-4 hidden sm:block">
        {sidebarLinks.map(({ route, icon, label }) => {
          const isActive =
            (pathname.includes(route) && route.length > 1) ||
            pathname === route;

          return (
            <Link
              key={route}
              href={route}
              className={`flex h-12 items-center gap-4 rounded-lg p-4 ${
                isActive
                  ? "primary-gradient text-primary-100 bg-active-background"
                  : "text-text-color"
              }`}
            >
              <Icon
                icon={icon}
                className={`ml-2 text-2xl ${
                  isActive
                    ? "primary-gradient text-primary-100"
                    : "text-text-color"
                }`}
              />
              <p
                className={`${
                  isActive
                    ? "primary-gradient text-primary-100"
                    : "text-text-color"
                }`}
              >
                {label}
              </p>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Sidebar;
