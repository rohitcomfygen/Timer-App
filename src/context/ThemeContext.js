// src/context/ThemeContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Appearance } from 'react-native'; // For system theme preference
import { getTheme, saveTheme } from '../utils/AsyncStorageHelper'; // For persistence

// Define your color schemes
export const lightColors = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  background: '#f8f9fa', // Very light grey background
  cardBackground: 'white',
  text: '#212529', // Dark text
  subText: '#6c757d', // Muted text
  border: '#dee2e6',
  headerBackground: '#007bff',
  headerText: 'white',
};

export const darkColors = {
  primary: '#6bb8ff', // Lighter blue for dark mode
  secondary: '#adb5bd',
  success: '#28a745', // Green might stay similar
  danger: '#dc3545', // Red might stay similar
  warning: '#ffc107',
  info: '#17a2b8',
  background: '#343a40', // Dark grey background
  cardBackground: '#495057', // Slightly lighter dark grey for cards
  text: '#f8f9fa', // Light text
  subText: '#ced4da', // Muted light text
  border: '#6c757d',
  headerBackground: '#212529',
  headerText: '#6bb8ff',
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to light mode

  useEffect(() => {
    // Load theme preference from AsyncStorage
    const loadAndSetTheme = async () => {
      const storedTheme = await getTheme();
      if (storedTheme !== null) {
        setIsDarkMode(storedTheme);
      } else {
        // If no preference saved, use system preference
        const systemColorScheme = Appearance.getColorScheme();
        setIsDarkMode(systemColorScheme === 'dark');
      }
    };

    loadAndSetTheme();

    // Listen for system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // Only update if no user preference is set (or if you want to override user pref)
      // For this example, we'll let user preference stick.
      // If you want system to always override, remove loadAndSetTheme and just use this:
      // setIsDarkMode(colorScheme === 'dark');
    });

    return () => subscription.remove(); // Clean up listener
  }, []);

  // The currently active color scheme
  const colors = isDarkMode ? darkColors : lightColors;

  // Function to toggle theme and save preference
  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await saveTheme(newMode); // Persist the new theme preference
  };

  return (
    <ThemeContext.Provider value={{ colors, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to easily access theme context
export const useTheme = () => useContext(ThemeContext);