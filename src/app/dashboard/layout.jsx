"use client"
import SideBar from "@/components/SideBar";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <SessionProvider>
      <div className="w-full flex-none md:w-64">
        <SideBar />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {children}
      </div>
      </SessionProvider>
    </div>
  );
}
