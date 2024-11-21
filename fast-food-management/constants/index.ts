import { SidebarLink } from "@/types";

export const sidebarLinks: SidebarLink[] = [
  {
    icon: "majesticons:home-line",
    route: "/",
    label: "Dashboard",
  },
  {
    icon: "solar:box-outline",
    route: "/inventory",
    label: "Inventory",
  },
  {
    icon: "material-symbols:fastfood-outline-rounded",
    route: "/product",
    label: "Product",
  },
  {
    icon: "hugeicons:trolley-02",
    route: "/shipment",
    label: "Shipment",
  },
  {
    icon: "stash:invoice",
    route: "/invoice",
    label: "Invoice",
  },
  {
    icon: "lsicon:work-order-info-outline",
    route: "/order-form",
    label: "Order Form",
  },
  {
    icon: "lineicons:customer",
    route: "/stores",
    label: "Stores",
  },
  {
    icon: "clarity:employee-group-line",
    route: "/staffs",
    label: "Staffs",
  },
  {
    icon: "lucide:chart-line",
    route: "/analystics",
    label: "Analystics",
  },
  {
    icon: "solar:settings-outline",
    route: "/settings",
    label: "Settings",
  },
];