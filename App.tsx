// App.js
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

// This is where you might set up your ThemeProvider if you add themes later
// import { ThemeProvider } from './src/context/ThemeContext'; // If you implement theming

export default function App() {
  return (
    // <ThemeProvider> {/* Wrap with ThemeProvider if you implement theming */}
      <AppNavigator />
    // </ThemeProvider>
  );
} 