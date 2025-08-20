"use client";
import { createContext, useState, useContext } from "react";

const HomeContext = createContext();

export function HomeProvider({ children }) {
  const [isLoading, setLoading] = useState(true);
  const [taskList, setTaskList] = useState([]);

  return (
    <HomeContext.Provider value={{ isLoading, setLoading, taskList, setTaskList }}>
      {children}
    </HomeContext.Provider>
  );
}

export function useHome() {
  return useContext(HomeContext);
}
