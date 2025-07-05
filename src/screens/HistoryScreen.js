// src/screens/HistoryScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Platform, PermissionsAndroid, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getHistory } from '../utils/AsyncStorageHelper';
import RNFS from 'react-native-fs'; // For file system operations
import Share from 'react-native-share'; // For sharing the exported file

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);

  // Load history data when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      const loadHistory = async () => {
        const storedHistory = await getHistory();
        setHistory(storedHistory);
      };
      loadHistory();
    }, [])
  );

  // Request write external storage permission for Android
  const requestWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to save timer history for export.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Error requesting storage permission:', err);
        return false;
      }
    }
    return true; // iOS doesn't require explicit permission for app sandbox
  };

  // Handler for exporting timer history as JSON
  const handleExportHistory = async () => {
    if (history.length === 0) {
      Alert.alert("No History", "There is no completed timer history to export yet.");
      return;
    }

    const hasPermission = await requestWritePermission();
    // if (!hasPermission) {
    //   Alert.alert("Permission Denied", "Cannot export history without storage permission. Please grant it in app settings.");
    //   return;
    // }

    try {
      const jsonString = JSON.stringify(history, null, 2); // Pretty print JSON
      const filename = 'timer_history.json';
      const path = Platform.select({
        ios: `${RNFS.DocumentDirectoryPath}/${filename}`, // iOS app's document directory
        android: `${RNFS.DownloadDirectoryPath}/${filename}`, // Android's public Downloads directory
      });

      await RNFS.writeFile(path, jsonString, 'utf8'); // Write the JSON to the file system

      // Use react-native-share to allow the user to share the file
      const options = {
        type: 'application/json',
        url: `file://${path}`, // Important: use file:// prefix
        title: 'Share Timer History',
        message: 'Here is my timer history from the Timer App!',
      };

      await Share.open(options); // Open the share dialog
      Alert.alert("Export Successful", `History saved to ${path} and ready to share.`);

    } catch (error) {
      if (Share.is = Share.OpenError) { // Check if it's a share cancellation
         console.log('Share cancelled by user');
      } else {
        console.error("Error exporting history:", error);
        Alert.alert("Export Failed", `There was an error exporting your timer history: ${error.message || error}`);
      }
    }
  };

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyName}>{item.name}</Text>
      <Text style={styles.historyTime}>Completed: {item.completionTime}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Export History" onPress={handleExportHistory} />
      {history.length === 0 ? (
        <Text style={styles.noHistoryText}>No completed timers yet. Complete a timer on the home screen to see its history here!</Text>
      ) : (
        <FlatList
          data={history}
          renderItem={renderHistoryItem}
          keyExtractor={(item, index) => index.toString()} // Using index as key if names/times might repeat
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  noHistoryText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#888',
  },
  listContent: {
    paddingBottom: 20,
  },
  historyItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 1, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
  },
  historyName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  historyTime: {
    fontSize: 14,
    color: '#555',
  },
});

export default HistoryScreen;