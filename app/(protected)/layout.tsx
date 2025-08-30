import { AppSidebar } from "@/components/ui-kit/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import "../globals.css"
import { AdminHeader } from "@/components/ui-kit/admin-header";

type Props = {
  children: React.ReactNode;
};

export default async function SubdomainLayout({ children }: Props) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.token) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <AdminHeader session={session.user}/>
        <div className="px-5 py-3 ">
        {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
