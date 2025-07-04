// src/components/ProgressBar.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ progress }) => {
  // Ensure progress is between 0 and 1
  const clampedProgress = Math.max(0, Math.min(1, progress));

  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBarFill, { width: `${clampedProgress * 100}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e9ecef', // Light grey background for the bar
    borderRadius: 4,
    overflow: 'hidden', // Ensures the fill respects border radius
    marginTop: 5,
    marginBottom: 5,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#17a2b8', // Blue-green color for the progress fill
    borderRadius: 4,
  },
});

export default ProgressBar;