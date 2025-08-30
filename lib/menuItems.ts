import {
  LayoutDashboard,
  Users,
  UserCheck,
  ShoppingCart,
  Calendar,
  Video,
  Image,
  MessageSquare,
  Settings,
  FileText,
  Award,
} from "lucide-react";

export const mainItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: Users,
  },
  {
    title: "Astrologers",
    url: "#",
    icon: UserCheck,
    children: [
      { title: "Block Astrologer", url: "/astrologers/block-astrologer" },
      { title: "Manage Astrologers", url: "/astrologers/manage-astrologers" },
      { title: "Pending Requests", url: "/astrologers/pending-requests" },
      { title: "Reviews", url: "/astrologers/reviews" },
      { title: "Gifts", url: "/astrologers/gifts" },
      { title: "Skills", url: "/astrologers/skills" },
      { title: "Categories", url: "/astrologers/categories" },
      { title: "Commission Rate for Calls/Chats", url: "/astrologers/commissionn-rate" },
    ],
  },
  {
    title: "Astroshop",
    url: "#",
    icon: ShoppingCart,
    children: [
      { title: "Product Categories", url: "/astroshop/product-categories" },
      { title: "Products", url: "/astroshop/products" },
      { title: "Orders", url: "/astroshop/orders" },
    ],
  },
  {
    title: "Horoscope",
    url: "#",
    icon: Calendar,
    children: [
      { title: "Daily Horoscope", url: "/horoscope/daily-horoScope" },
      { title: "Weekly Horoscope", url: "/horoscope/weekly-horoScope" },
      { title: "Yearly Horoscope", url: "/horoscope/yearly-horoScope" },
      { title: "Horoscope Feedback", url: "/horoscope/feedback" },
    ],
  },
  {
    title: "Blogs",
    url: "/blogs",
    icon: FileText,
  },
  {
    title: "News",
    url: "/news",
    icon: FileText,
  },
  {
    title: "Videos",
    url: "/videos",
    icon: Video,
  },
  {
    title: "Banner Management",
    url: "/banner-management",
    icon: Image,
  },
  {
    title: "Stories",
    url: "/stories",
    icon: MessageSquare,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: MessageSquare,
  },
  {
    title: "Support Management",
    url: "#",
    icon: MessageSquare,
    children: [
      { title: "Tickets", url: "/support-management/tickets" },
      { title: "FAQs", url: "/support-management/faqs" },
    ],
  },
  {
    title: "Earning",
    url: "#",
    icon: Award,
    children: [
      { title: "Withdrawal Requests", url: "/earning/withdrawal-requests" },
      { title: "Withdrawal Methods", url: "/earning/withdrawal-methods" },
      { title: "Wallet History", url: "/earning/wallet-history" },
    ],
  },
  {
    title: "Reports",
    url: "#",
    icon: FileText,
    children: [
      { title: "Call History", url: "/reports/call-history" },
      { title: "Chat History", url: "/reports/chat-history" },
      { title: "PartnerWise Earning", url: "/reports/partnerwise-earning" },
      { title: "Order Request", url: "/reports/order-request" },
      { title: "Report Request", url: "/reports/report-request" },
      { title: "Kundali Earnings", url: "/reports/kundali-earnings" },
    ],
  },
  {
    title: "Master Settings",
    url: "#",
    icon: Settings,
    children: [
      { title: "Customer Profile", url: "/master-settings/customer-profile" },
      { title: "Horoscope Signs", url: "/master-settings/horoscope-signs" },
      { title: "Report Type", url: "/master-settings/report-type" },
      { title: "Recharge Amount", url: "/master-settings/recharge-amount" },
    ],
  },
  {
    title: "Team Management",
    url: "#",
    icon: Users,
    children: [
      { title: "Team Role", url: "/team-management/team-role" },
      { title: "Team List", url: "/team-management/team-list" },
    ],
  },
  {
    title: "General Settings",
    url: "/general-settings",
    icon: Settings,
  },
  {
    title: "Feedback",
    url: "/feedback",
    icon: MessageSquare,
  },
  {
    title: "Page Management",
    url: "/page-management",
    icon: FileText,
  },
  {
    title: "Contact Form",
    url: "/contact-form",
    icon: MessageSquare,
  },
];
