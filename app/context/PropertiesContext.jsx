"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { properties as defaultProperties } from "@/data/properties";

const PropertiesContext = createContext();

export function PropertiesProvider({ children }) {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("luxuryProperties");
    if (saved) {
      setProperties(JSON.parse(saved));
    } else {
      setProperties(defaultProperties);
      localStorage.setItem("luxuryProperties", JSON.stringify(defaultProperties));
    }
  }, []);

  const updateProperties = (newProperties) => {
    setProperties(newProperties);
    localStorage.setItem("luxuryProperties", JSON.stringify(newProperties));
  };

  return (
    <PropertiesContext.Provider value={[properties, updateProperties]}>
      {children}
    </PropertiesContext.Provider>
  );
}

export const useProperties = () => useContext(PropertiesContext);