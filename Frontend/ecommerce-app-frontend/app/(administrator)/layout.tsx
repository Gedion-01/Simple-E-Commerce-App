import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { isAuthenticated } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { getUserRole } from "@/hooks/useAdminAuth";
import AdminHeader from "@/components/admin-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopHaven",
  description: "Shop the latest trends with our amazing e-commerce platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await isAuthenticated();
  if (!auth) {
    return redirect("/login");
  }
  const isAdmin = await getUserRole();
  if (!isAdmin) {
    // return redirect("/");
  }
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <AdminHeader />
          <main className="flex-grow">{children}</main>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
