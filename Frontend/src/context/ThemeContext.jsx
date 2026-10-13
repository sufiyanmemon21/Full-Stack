import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [Theme, setTheme] = useState('light');
    
    function toggleTheme() {
        setTheme(Theme === "light" ? 'dark' : "light");
    }
    
    useEffect(() => {
        document.documentElement.classList.toggle('dark', Theme === 'dark');
    }, [Theme]);

    return (
        <ThemeContext.Provider value={{ Theme, toggleTheme }}>
           {children}
        </ThemeContext.Provider>
    );
}

