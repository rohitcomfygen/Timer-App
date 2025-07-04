import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, UIManager, Platform, Button } from 'react-native';
import TimerItem from './TimerItem';

// Enable LayoutAnimation for Android
// if (Platform.OS === 'android') {
//   if (UIManager.setLayoutAnimationEnabledExperimental) {
//     UIManager.setLayoutAnimationEnabledExperimental(true);
//   }
// }

const CategorySection = ({ category, timers, onTimerAction, onBulkAction }) => {
  const [isExpanded, setIsExpanded] = useState(true); 

  const toggleExpand = () => {
    // Configure animation for smooth expand/collapse
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.categoryContainer}>
      <TouchableOpacity onPress={toggleExpand} style={styles.categoryHeader}>
        <Text style={styles.categoryTitle}>{String(category)}</Text>
        <Text style={styles.expandIcon}>{isExpanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.categoryContent}>
        
          <View style={styles.bulkActions}>
            <Button title="Start All" onPress={() => onBulkAction(category, 'start')} color="#007bff" />
            <Button title="Pause All" onPress={() => onBulkAction(category, 'pause')} color="#ffc107" />
            <Button title="Reset All" onPress={() => onBulkAction(category, 'reset')} color="#6c757d" />
          </View>
        <>
          {timers.map(timer => (
            <TimerItem
              key={timer.id}
              timer={timer}
              onTimerAction={onTimerAction}
            />
          ))}
          </>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden', // Ensures border radius works with content
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#e9ecef', // Light grey header
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  categoryTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#343a40',
  },
  expandIcon: {
    fontSize: 18,
    color: '#495057',
  },
  categoryContent: {
    padding: 10,
  },
  bulkActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa', // Lighter line
  }
});

export default CategorySection;