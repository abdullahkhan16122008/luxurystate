// context/SearchFiltersContext.jsx
"use client";

import { createContext, useContext, useState } from "react";

const SearchFiltersContext = createContext();

export function SearchFiltersProvider({ children }) {
    const [filters, setFilters] = useState({
        location: "All Locations",
        type: "All Types",
        bedrooms: "Any",
        minPrice: "",
        maxPrice: 100000000,
    });

    return (
        <SearchFiltersContext.Provider value={{ filters, setFilters }}>
            {children}
        </SearchFiltersContext.Provider>
    );
}

export const useSearchFilters = () => {
    const context = useContext(SearchFiltersContext);
    if (!context) {
        throw new Error("useSearchFilters must be used within SearchFiltersProvider");
    }
    return context;
};