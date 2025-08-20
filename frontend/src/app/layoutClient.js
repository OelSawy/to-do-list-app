"use client"

import "./globals.css";
import "./components/SideBar"
import { poppins } from "./fonts/font";
import Sidebar from "./components/SideBar";
import { SidebarProvider } from "./context/SideBarContext";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import { usePathname } from "next/navigation";
import Logo from "./components/Logo";
import { HomeProvider } from "./context/HomeContext";

export default function RootLayoutClient({ children }) {

  const pathname = usePathname();
  const noSidebarRoutes = ["/login", "/register", "/reset/enterEmail", "/reset/validateOtp", "/reset/changePassword"];

  const hideSidebar = noSidebarRoutes.includes(pathname);
  const landingPage = pathname === "/";

  return (
    <html lang="en" className={`${poppins.className} bg-white`}>
      <body
        className={`antialiased`}
      >
        <ThemeProvider theme={theme}>
          <HomeProvider>
            <SidebarProvider>
              {landingPage ? null : (!hideSidebar && <Sidebar />)}
              {landingPage ? null : hideSidebar && <Logo />}
              {(landingPage || hideSidebar) ? children : (<main className="ml-64 bg-white p-6">{children}</main>)}
            </SidebarProvider>
          </HomeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
