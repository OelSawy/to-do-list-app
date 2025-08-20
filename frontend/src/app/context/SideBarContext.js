"use client";
import { createContext, useState, useContext } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [name, setName] = useState(null);
  const [filter, setFilter] = useState("all");

  return (
    <SidebarContext.Provider value={{ name, setName, filter, setFilter }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
