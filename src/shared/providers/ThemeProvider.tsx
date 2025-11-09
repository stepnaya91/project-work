import React, { createContext, ReactNode, useContext, useState } from "react"

type Theme = "light"|"dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType|null>(null);

type ThemeProviderProps = {
    children: ReactNode
}

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if(context === null) { throw new Error("useTheme must be used within a ThemeProvider"); }

    return context;
}

export const ThemeProvider = ({children}: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>("light");

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme==="light"?"dark":"light"));
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}