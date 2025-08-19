"use client"

import "./globals.css";
import "./components/SideBar"
import { Poppins } from "next/font/google";
import Sidebar from "./components/SideBar";
import { SidebarProvider } from "./context/SideBarContext";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: 400
});

export default function RootLayout({ children }) {

  return (
    <html lang="en" className={poppins.className}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <Sidebar />
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
