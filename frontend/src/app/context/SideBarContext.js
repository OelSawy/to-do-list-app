"use client";
import { createContext, useState, useContext, useEffect } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [name, setName] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const savedName = localStorage.getItem("sidebar_name");
    const savedFilter = localStorage.getItem("sidebar_filter");

    if (savedName) setName(savedName);
    if (savedFilter) setFilter(savedFilter);
  }, []);

  useEffect(() => {
    if (name !== null) {
      localStorage.setItem("sidebar_name", name);
    }
  }, [name]);

  useEffect(() => {
    if (filter) {
      localStorage.setItem("sidebar_filter", filter);
    }
  }, [filter]);

  return (
    <SidebarContext.Provider value={{ name, setName, filter, setFilter }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
