// src/styles/typography.js
import { StyleSheet } from 'react-native';

const Typography = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    // color: colors.text if using theme context
  },
  h2: {
    fontSize: 24,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  small: {
    fontSize: 12,
    color: '#888',
  },
  // Add more as needed, e.g., buttonText, inputPlaceholder etc.
});

export default Typography;