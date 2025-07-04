// src/styles/colors.js

// Light theme colors
export const lightColors = {
    primary: '#007bff',       // Blue for main actions/buttons
    secondary: '#6c757d',     // Grey for secondary elements
    success: '#28a745',       // Green for success/start
    danger: '#dc3545',        // Red for danger/completion
    warning: '#ffc107',       // Yellow/Orange for warnings/pause
    info: '#17a2b8',          // Cyan/Teal for info

    background: '#f8f9fa',    // App background
    cardBackground: 'white',  // Background for cards/sections
    text: '#212529',          // Primary text color
    subText: '#6c757d',       // Subdued text color
    border: '#dee2e6',        // Border colors
    headerBackground: '#007bff', // Header background color
    headerText: 'white',      // Header text color
    buttonText: 'white',      // Default button text color
};

// Dark theme colors
export const darkColors = {
    primary: '#6bb8ff',       // Lighter blue for dark mode primary
    secondary: '#adb5bd',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',

    background: '#212529',    // Dark background
    cardBackground: '#343a40',// Darker grey for cards
    text: '#f8f9fa',          // Light text
    subText: '#ced4da',       // Lighter subdued text
    border: '#495057',        // Darker border colors
    headerBackground: '#343a40', // Darker header background
    headerText: '#6bb8ff',    // Lighter header text color
    buttonText: 'white',
};

// This file would be used by your components like this:
// import { useTheme } from '../context/ThemeContext';
// const { colors } = useTheme();
// <Text style={{ color: colors.text }}>Hello</Text>