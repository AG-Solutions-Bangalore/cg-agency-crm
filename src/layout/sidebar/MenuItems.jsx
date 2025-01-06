import {
  IconCopy,
  IconHierarchy,
  IconChartDots2,
  IconLayoutDashboard,
  IconUser,
  IconLanguage,
  IconBriefcase,
  IconMessages,
  IconTypography,
  IconCash,
  IconCardboards,
  IconUsers,
  IconReceipt,
  IconSchool,
  IconListDetails,
  IconRepeat,
  IconComponents,
  IconReport,
  IconDownload,
  IconPeace,
  IconBell,
  IconBuilding,
  IconBuildingBank,
  IconWallet,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const MenuItems = () => {
  // Get user type from localStorage
  const userType = localStorage.getItem('userType');
  const pageControl = JSON.parse(localStorage.getItem("pageControl") || [])
  console.log("babjdas",pageControl)
  const isMenuItemAllowed = (href) => {
    // Remove leading slash for comparison
    const itemUrl = href;
    
    const routeData = pageControl.find(route => route.url === itemUrl);
    
    if (!routeData) return false;

    const allowedUsers = routeData.usertype ? routeData.usertype.split(",") : [];
    return allowedUsers.includes(userType) && routeData.status == "Active";
  };

  // Function to filter menu items based on permissions
  const filterMenuItems = (items) => {
    return items.filter(item => {
      // Keep navigation labels
      if (item.navlabel) return true;

      // Check permissions for items with subItems
      if (item.subItems) {
        const filteredSubItems = item.subItems.filter(subItem => 
          isMenuItemAllowed(subItem.href)
        );
        
        // Only keep parent items that have allowed subItems
        if (filteredSubItems.length > 0) {
          item.subItems = filteredSubItems;
          return true;
        }
        return false;
      }

      // Check permissions for regular menu items
      return isMenuItemAllowed(item.href);
    });
  };

  const baseMenuItems = [
    {
      navlabel: true,
      subheader: "Home",
    },
    {
      id: uniqueId(),
      title: "Dashboard",
      icon: IconLayoutDashboard,
      href: "/home",
    },
    {
      navlabel: true,
      subheader: "Operation",
    },
    {
      id: uniqueId(),
      title: "Supplier",
      icon: IconBuilding,
      href: "/supplier-list",
    },
    {
      id: uniqueId(),
      title: "Buyer",
      icon: IconUser,
      href: "/buyer-list",
    },
    {
      id: uniqueId(),
      title: "Billing",
      icon: IconBuildingBank,
      href: "/billing-list",
    },
    {
      id: uniqueId(),
      title: "Payment",
      icon: IconWallet,
      href: "/payment-list",
    },
    {
      id: uniqueId(),
      title: "Invoice",
      icon: IconReceipt,
      href: "/invoice-list",
    },
    {
      navlabel: true,
      subheader: "Summary",
    },
    {
      id: uniqueId(),
      title: "Report",
      icon: IconReceipt,
      subItems: [
        {
          id: uniqueId(),
          title: "Supplier",
          icon: IconCopy,
          href: "/report-supplier",
        },
        {
          id: uniqueId(),
          title: "Buyer",
          icon: IconCopy,
          href: "/report-buyer",
        },
        {
          id: uniqueId(),
          title: "Outstanding",
          icon: IconReceipt,
          href: "/outstanding-report",
        },
        {
          id: uniqueId(),
          title: "Monthwise",
          icon: IconReceipt,
          href: "/monthwise-report",
        },
      ],
    },
  
    {
      id: uniqueId(),
      title: "User Management",
      icon: IconReceipt,
      href: "/userManagement",
    },
  ];



  const filteredMenuItems = filterMenuItems(baseMenuItems)
  return filteredMenuItems;
};
export default MenuItems;
