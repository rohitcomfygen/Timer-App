// src/styles/GlobalStyles.js
import { StyleSheet } from 'react-native';

// You can define common styles here that apply globally
const GlobalStyles = StyleSheet.create({
  // Example: A common padding for screens
  screenPadding: {
    padding: 15,
  },
  // Example: Basic text style
  baseText: {
    fontSize: 16,
    // Add color from theme context when integrated
  },
  // Example: Shadow for cards (can be refined per platform)
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  // Other global styles like typography adjustments, common buttons etc.
});

export default GlobalStyles;