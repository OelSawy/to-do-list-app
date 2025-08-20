"use client"

import "./globals.css";
import "./components/SideBar"
import { Poppins } from "next/font/google";
import Sidebar from "./components/SideBar";
import { SidebarProvider } from "./context/SideBarContext";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import { usePathname } from "next/navigation";
import Logo from "./components/Logo";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {

  const pathname = usePathname();
  const noSidebarRoutes = ["/login", "/register", "/reset/enterEmail", "/reset/validateOtp", "/reset/changePassword"];

  const hideSidebar = noSidebarRoutes.includes(pathname);
  const landingPage = pathname === "/";

  return (
    <html lang="en" className={`${poppins.className}`}>
      <body
        className={`antialiased`}
      >
        <ThemeProvider theme={theme}>
          <SidebarProvider>
            {landingPage ? null : (!hideSidebar && <Sidebar />)}
            {landingPage ? null : hideSidebar && <Logo />}
            {children}
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
