import {
  LayoutDashboard,
  Users,
  UserCheck,
  Image,
  Settings,
  FileText,
  PlayCircle,
  Bell,
  Newspaper,
  Smile,
  UserPlus,
  Layers,
  Users2,
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
      {
        title: "Commission Rate for Calls/Chats",
        url: "/astrologers/commission-rate",
      },
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
    icon: Newspaper,
  },
  {
    title: "Banner Management",
    url: "/banner-management",
    icon: Image,
  },
  {
    title: "Stories",
    url: "/stories",
    icon: PlayCircle,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
  },
  {
    title: "General Settings",
    url: "/general-settings",
    icon: Settings,
  },
  {
    title: "Feedback",
    url: "/feedback",
    icon: Smile,
  },
  {
    title: "Team Management",
    url: "#",
    icon: Users2,
    children: [
      { title: "Team Role", url: "/team-management/team-role" },
      { title: "Team List", url: "/team-management/team-list" },
    ],
  },
  {
    title: "Page Management",
    url: "/page-management",
    icon: Layers,
  },
  {
    title: "Contact Form",
    url: "/contact-form",
    icon: UserPlus,
  },
];