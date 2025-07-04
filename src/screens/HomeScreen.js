// src/screens/HomeScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity, Platform, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getTimers, saveTimers, getHistory, saveHistory } from '../utils/AsyncStorageHelper';
import AddTimerModal from '../components/AddTimerModal';
import CategorySection from '../components/CategorySection';
import ConfirmationModal from '../components/ConfirmationModal';
import { scheduleLocalNotification } from '../utils/NotificationsHelper'; // Import for notifications
import { requestNotificationPermission } from '../utils/NotificationsHelper'; // For requesting permission on Android 13+

const HomeScreen = ({ navigation }) => {
  const [timers, setTimers] = useState([]);
  const [history, setHistory] = useState([]);
  const [isAddTimerModalVisible, setIsAddTimerModalVisible] = useState(false);
  const [completedTimer, setCompletedTimer] = useState(null); // For the completion modal
  const [currentCategories, setCurrentCategories] = useState([]);

  // Request notification permission on component mount for Android 13+
  useEffect(() => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      requestNotificationPermission();
    }
  }, []);

  // Load data when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        const storedTimers = await getTimers();
        const storedHistory = await getHistory();
        setTimers(storedTimers);
        setHistory(storedHistory);

        // Extract unique categories from loaded timers
        const categories = [...new Set(storedTimers.map(timer => timer.category))];
        // Provide some default categories if no timers are loaded yet
        setCurrentCategories(categories.length > 0 ? categories : ['Work', 'Study', 'Break']);
      };
      loadData();
    }, [])
  );

  // Persist timers whenever the `timers` state changes
  useEffect(() => {
    saveTimers(timers);
  }, [timers]);

  // Persist history whenever the `history` state changes
  useEffect(() => {
    saveHistory(history);
  }, [history]);

  // Timer interval handling for countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers =>
        prevTimers.map(timer => {
          if (timer.status === 'running' && timer.remainingTime > 0) {
            const newRemainingTime = timer.remainingTime - 1;
            const newTimer = { ...timer, remainingTime: newRemainingTime };

            // Halfway Alert: Trigger notification at 50%
            const halfwayPoint = Math.floor(timer.duration / 2);
            if (newRemainingTime === halfwayPoint && !timer.halfwayAlertTriggered) {
              scheduleLocalNotification(
                `${timer.name} Halfway!`,
                `You're halfway through your "${timer.name}" timer.`,
                false // Not a completion notification
              );
              newTimer.halfwayAlertTriggered = true; // Mark as triggered to prevent repeat
            }

            // Timer Completion: When time runs out
            if (newRemainingTime === 0) {
              setCompletedTimer(newTimer); // Show the on-screen modal
              // Add to history log
              setHistory(prevHistory => [...prevHistory, {
                name: newTimer.name,
                completionTime: new Date().toLocaleString(), // Log current time
              }]);
              // Schedule background notification for completion
              scheduleLocalNotification(
                `${newTimer.name} Completed!`,
                `Your timer for "${newTimer.name}" has finished!`,
                true // Indicate this is a completion notification for specific sound/behavior if needed
              );
              // Mark timer as completed and reset remaining time
              return { ...newTimer, status: 'completed', remainingTime: 0 };
            }
            return newTimer;
          }
          return timer;
        })
      );
    }, 1000); // Update every second

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Handler for adding a new timer
  // const handleAddTimer = (newTimer) => {
  //   console.log("fffff",newTimer)
  //   setTimers(prevTimers => [...prevTimers, newTimer]);
  //   // Update categories list to include the new timer's category
  //   const categories = [...new Set([...prevTimers.map(t => t.category), newTimer.category])];
  //   setCurrentCategories(categories.length > 0 ? categories : ['Work', 'Study', 'Break']);
  // };
 const handleAddTimer = (newTimer) => {
    console.log("fffff",newTimer)
    setTimers(prevTimers => { // <--- prevTimers is defined here as an argument to the callback
      // Update categories list to include the new timer's category
      const categories = [...new Set([...prevTimers.map(t => t.category), newTimer.category])];
      setCurrentCategories(categories.length > 0 ? categories : ['Work', 'Study', 'Break']);
      return [...prevTimers, newTimer]; // Return the new state for timers
    });
  };
  // Handler for individual timer actions (start, pause, reset)
  const handleTimerAction = (id, action) => {
    setTimers(prevTimers =>
      prevTimers.map(timer => {
        if (timer.id === id) {
          switch (action) {
            case 'start':
              return { ...timer, status: 'running' };
            case 'pause':
              return { ...timer, status: 'paused' };
            case 'reset':
              // Reset to original duration and clear halfway alert flag
              return { ...timer, status: 'paused', remainingTime: timer.duration, halfwayAlertTriggered: false };
            default:
              return timer;
          }
        }
        return timer;
      })
    );
  };

  // Handler for bulk actions on a category (start all, pause all, reset all)
  const handleBulkAction = (category, action) => {
    setTimers(prevTimers =>
      prevTimers.map(timer => {
        if (timer.category === category) {
          switch (action) {
            case 'start':
              return { ...timer, status: 'running' };
            case 'pause':
              return { ...timer, status: 'paused' };
            case 'reset':
              // Reset to original duration and clear halfway alert flag
              return { ...timer, status: 'paused', remainingTime: timer.duration, halfwayAlertTriggered: false };
            default:
              return timer;
          }
        }
        return timer;
      })
    );
  };

  // Group timers by their category for display
  const groupedTimers = timers.reduce((acc, timer) => {
    if (!acc[timer.category]) {
      acc[timer.category] = [];
    }
    acc[timer.category].push(timer);
    return acc;
  }, {});

  // Close the timer completion modal
  const handleCloseCompletionModal = () => {
    setCompletedTimer(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {Object.keys(groupedTimers).length === 0 ? (
          <Text style={styles.noTimersText}>No timers yet. Tap '+' to add your first timer!</Text>
        ) : (
          Object.keys(groupedTimers).map(category => (
          // <Text style={styles.noTimersText}>No timers yet. Tap '+' to add your first timer!</Text>

            <CategorySection
              key={category}
              category={category}
              timers={groupedTimers[category]}
              onTimerAction={handleTimerAction}
              onBulkAction={handleBulkAction}
            />
          ))
        )}
      </ScrollView>

      {/* Add Timer Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setIsAddTimerModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Navigation to History Screen */}
      <View style={styles.bottomButtons}>
        <Button title="View History" onPress={() => navigation.navigate('History')} />
      </View>

      {/* Modal for adding new timers */}
      <AddTimerModal
        isVisible={isAddTimerModalVisible}
        onClose={() => setIsAddTimerModalVisible(false)}
        onSave={handleAddTimer}
        existingCategories={currentCategories}
      />

      {/* Modal for timer completion feedback */}
      <ConfirmationModal
        isVisible={!!completedTimer} // Show if a timer has just completed
        onClose={handleCloseCompletionModal}
        message={`Congratulations! Your timer "${completedTimer?.name || 'Unknown'}" has completed!`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 10,
  },
  noTimersText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#888',
  },
  addButton: {
    position: 'absolute',
    bottom: 80, // Above the "View History" button
    right: 20,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
    lineHeight: 30, // Vertically center the '+'
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
  }
});

export default HomeScreen;