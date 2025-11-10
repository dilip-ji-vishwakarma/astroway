import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/src/provider/main-provider";
import { ThemeProvider } from "@/components/ui-kit/theme-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { PermissionProvider } from "@/src/context/PermissionContext";
import { apiServices } from "@/lib/api.services";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Astrova",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  console.log(session?.user.role)

  let modules = {};

  if (session?.user.role) {
    const res = await apiServices(`/admin/role?role=${session.user.role}`, "get");
    if (res?.data && res.data.length > 0) {
      modules = res.data[0].module;
    }
  }

  return (
    <html lang="en">
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <PermissionProvider value={modules}>
              {children}
            </PermissionProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
