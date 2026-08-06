import {
  IconLayoutDashboard,
  IconBox,
  IconCategory,
  IconShoppingCart,
  IconUsers,
  IconTicket,
  IconTruck,
  IconMessageCircle,
  IconChartBar,
  IconSettings,
  IconUser,
  IconList,
  IconCirclePlus,
} from "@tabler/icons-react";

const dashboardMenu = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard",
    order: 1,
  },

  {
    id: "products",
    title: "Products",
    icon: IconBox,
    order: 2,
    children: [
      {
        id: "products-list",
        title: "All Products",
        href: "/dashboard/products",
        icon: IconList,
      },
      {
        id: "products-add",
        title: "Add Product",
        href: "/dashboard/products/form",
        icon: IconCirclePlus,
      },
    ],
  },

  {
    id: "categories",
    title: "Categories",
    icon: IconCategory,
    order: 3,
    children: [
      {
        id: "categories-list",
        title: "All Categories",
        href: "/dashboard/categories",
        icon: IconList,
      },
      {
        id: "categories-add",
        title: "Add Category",
        href: "/dashboard/categories/form",
        icon: IconCirclePlus,
      },
    ],
  },

  {
    id: "orders",
    title: "Orders",
    icon: IconShoppingCart,
    href: "/dashboard/orders",
    order: 4,
  },

  {
    id: "customers",
    title: "Customers",
    icon: IconUsers,
    href: "/dashboard/customers",
    order: 5,
  },

  {
    id: "coupons",
    title: "Coupons",
    icon: IconTicket,
    href: "/dashboard/coupons",
    order: 6,
  },

  {
    id: "delivery",
    title: "Delivery",
    icon: IconTruck,
    href: "/dashboard/delivery",
    order: 7,
  },

  {
    id: "reviews",
    title: "Reviews",
    icon: IconMessageCircle,
    href: "/dashboard/reviews",
    order: 8,
  },

  {
    id: "analytics",
    title: "Analytics",
    icon: IconChartBar,
    href: "/dashboard/analytics",
    order: 9,
  },

  {
    id: "settings",
    title: "Settings",
    icon: IconSettings,
    href: "/dashboard/settings",
    order: 10,
  },

  {
    id: "profile",
    title: "Profile",
    icon: IconUser,
    href: "/dashboard/profile",
    order: 11,
  },
];

export default dashboardMenu;