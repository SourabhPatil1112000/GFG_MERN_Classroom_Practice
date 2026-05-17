import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        // Check localStorage for saved preference
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : false;
    });

    const toggleTheme = () => {
        setDarkMode(prev => {
            const newValue = !prev;
            localStorage.setItem('darkMode', JSON.stringify(newValue));
            return newValue;
        });
    };

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode: toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export default ThemeProvider;