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
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = () => [
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
    icon: IconReceipt,
    href: "/supplier-list",
  },
  {
    id: uniqueId(),
    title: "Buyer",
    icon: IconReceipt,
    href: "/buyer-list",
  },
  {
    id: uniqueId(),
    title: "Billing",
    icon: IconReceipt,
    href: "/billing-list",
  },
  {
    id: uniqueId(),
    title: "Payment",
    icon: IconReceipt,
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
        title: "Billing",
        icon: IconCopy,
        href: "/report-agencies-form",
      },
      {
        id: uniqueId(),
        title: "Payment",
        icon: IconCopy,
        href: "/report-agencies-form",
      },
      {
        id: uniqueId(),
        title: "Invoice",
        icon: IconCopy,
        href: "/report-agencies-form",
      },
    
    ],
  },
  {
    id: uniqueId(),
    title: "Monthwise Report",
    icon: IconReceipt,
    href: "/monthwise-report-list",
  },
 
 
];

export default Menuitems;
