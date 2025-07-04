// src/utils/AsyncStorageHelper.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for AsyncStorage
const TIMERS_KEY = '@myTimers:timers';
const HISTORY_KEY = '@myTimers:history';
const THEME_KEY = '@myTimers:theme'; // For bonus theme feature

/**
 * Saves the current list of timers to AsyncStorage.
 * @param {Array} timers - An array of timer objects.
 */
export const saveTimers = async (timers) => {
  try {
    const jsonValue = JSON.stringify(timers);
    await AsyncStorage.setItem(TIMERS_KEY, jsonValue);
    console.log('Timers saved successfully!');
  } catch (error) {
    console.error('Error saving timers:', error);
  }
};

/**
 * Retrieves the list of timers from AsyncStorage.
 * @returns {Promise<Array>} - A promise that resolves to an array of timer objects.
 */
export const getTimers = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TIMERS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error getting timers:', error);
    return [];
  }
};

/**
 * Saves the timer history log to AsyncStorage.
 * @param {Array} history - An array of history entry objects.
 */
export const saveHistory = async (history) => {
  try {
    const jsonValue = JSON.stringify(history);
    await AsyncStorage.setItem(HISTORY_KEY, jsonValue);
    console.log('History saved successfully!');
  } catch (error) {
    console.error('Error saving history:', error);
  }
};

/**
 * Retrieves the timer history log from AsyncStorage.
 * @returns {Promise<Array>} - A promise that resolves to an array of history entry objects.
 */
export const getHistory = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(HISTORY_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error getting history:', error);
    return [];
  }
};

/**
 * Saves the current theme preference (light/dark mode).
 * @param {boolean} isDarkMode - True for dark mode, false for light mode.
 */
export const saveTheme = async (isDarkMode) => {
  try {
    await AsyncStorage.setItem(THEME_KEY, JSON.stringify(isDarkMode));
  } catch (error) {
    console.error('Error saving theme:', error);
  }
};

/**
 * Retrieves the saved theme preference.
 * @returns {Promise<boolean|null>} - A promise that resolves to true for dark, false for light, or null if not set.
 */
export const getTheme = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(THEME_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting theme:', error);
    return null;
  }
};

// Optional: Clear all data (useful for development/debugging)
export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    console.log('All AsyncStorage data cleared!');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};