"use client";
import Link from "next/link";
import React, { useState } from "react";
import { sidebarLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleParentClick = (route: string, hasChildren: boolean) => {
    if (hasChildren) {
      // Điều hướng đến page của parent nếu có children
      router.push(route);
      setOpenDropdown((prev) => (prev === route ? null : route));
    } else {
      // Chỉ điều hướng nếu không có children
      router.push(route);
    }
  };

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
        {sidebarLinks.map(({ route, icon, label, children }) => {
          const isActive =
            pathname === route ||
            (children?.some((child) => pathname === child.route) ?? false);

          const hasChildren = !!children;
          const isDropdownOpen = openDropdown === route;

          return (
            <div key={route}>
              {/* Parent Route or Dropdown Toggle */}
              <div
                className={`flex h-12 items-center gap-4 rounded-lg p-4 cursor-pointer ${
                  isActive
                    ? "primary-gradient text-primary-100 bg-active-background"
                    : "text-text-color"
                }`}
                onClick={() => handleParentClick(route, hasChildren)}
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
              </div>

              {/* Dropdown Menu */}
              {hasChildren && isDropdownOpen && (
                <div className="ml-8 mt-2">
                  {children.map(
                    ({
                      route: childRoute,
                      label: childLabel,
                      icon: childIcon,
                    }) => {
                      const isChildActive = pathname === childRoute;

                      return (
                        <Link
                          key={childRoute}
                          href={childRoute}
                          className={`flex items-center gap-2 py-2 text-sm pl-4 ${
                            isChildActive
                              ? "primary-gradient text-primary-100"
                              : "text-text-color"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon
                              icon={childIcon}
                              className={`ml-2 text-[18px] ${
                                isChildActive
                                  ? "primary-gradient text-primary-100"
                                  : "text-text-color"
                              }`}
                            />
                            <p
                              className={`${
                                isChildActive
                                  ? "primary-gradient text-primary-100"
                                  : "text-text-color text-[16px]"
                              }`}
                            >
                              {childLabel}
                            </p>
                          </div>
                        </Link>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Sidebar;
