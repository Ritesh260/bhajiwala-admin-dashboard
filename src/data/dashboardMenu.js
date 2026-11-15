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
  id: "offers",
  title: "Offer Management",
  icon: IconTicket,
  order: 6,
  children: [
    {
      id: "offers-list",
      title: "All Offers",
      href: "/dashboard/offers",
      icon: IconList,
    },
    {
      id: "today-offers",
      title: "Today's Offers",
      href: "/dashboard/offers/today",
      icon: IconList,
    },
    {
      id: "discount-coupons",
      title: "Discount Coupons",
      href: "/dashboard/offers/discounts",
      icon: IconList,
    },
    {
      id: "combo-offers",
      title: "Combo Offers",
      href: "/dashboard/offers/combos",
      icon: IconList,
    },
    {
      id: "seasonal-offers",
      title: "Seasonal Offers",
      href: "/dashboard/offers/seasonal",
      icon: IconList,
    },
  ],
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
    // href: "/dashboard/reviews",
    href: "#",
    order: 8,
  },

  {
    id: "analytics",
    title: "Analytics",
    icon: IconChartBar,
    // href: "/dashboard/analytics",
    href: "#",
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
    // href: "/dashboard/profile",
    href: "#",
    order: 11,
  },
];

export default dashboardMenu;