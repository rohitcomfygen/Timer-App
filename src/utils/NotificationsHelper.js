// src/utils/NotificationsHelper.js
import PushNotification from 'react-native-push-notification';
import { Platform, PermissionsAndroid, Alert } from 'react-native';

// --- Notification Configuration ---
export const configureNotifications = () => {
  PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);

      // (required) Called when a remote is received or opened, or local notification is opened
      // You must call notification.finish(remoteBackgroundFetchResult) once you have finished processing the notification
      // on iOS.
      notification.finish(Platform.OS === 'ios' ? 'UIBackgroundFetchResultNoData' : '');
    },

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log('NOTIFICATION TOKEN:', token);
      // You might send this token to your server for push notifications
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is not capable of push notifications.
    onRegistrationError: function (err) {
      console.error('Notification Registration Error:', err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register for.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped when a app is opened.
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if the app should request permissions to show notifications on start.
     * - If false, then the user will have to manually enable notifications.
     */
    requestPermissions: Platform.OS === 'ios', // Request permissions on iOS directly here, handle Android 13+ separately
  });

  // Create a default channel for Android notifications (required for Android 8.0+)
  if (Platform.OS === 'android') {
    PushNotification.createChannel(
      {
        channelId: 'timer-channel', // (required)
        channelName: 'Timer Notifications', // (required)
        channelDescription: 'Notifications for your timer events', // (optional)
        soundName: 'default', // (optional) See `android/app/src/main/res/raw` for a custom sound file
        importance: 4, // (optional) default: 4. Importance: `0` (low) to `5` (high)
        vibrate: true, // (optional) default: true. Creates a default vibration pattern if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );

    PushNotification.createChannel(
        {
          channelId: 'completion-channel', // A separate channel for completion if you want different sounds/behaviors
          channelName: 'Timer Completion Alerts',
          channelDescription: 'Alerts for when your timers finish',
          soundName: 'default', // You can place a custom sound file (e.g., 'ding.mp3') in android/app/src/main/res/raw/
          importance: 5, // High importance for completion
          vibrate: true,
        },
        (created) => console.log(`createCompletionChannel returned '${created}'`)
    );
  }
};

// --- Request Android 13+ Notification Permission ---
export const requestNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Notification Permission',
          message: 'This app needs notification permission to alert you when timers complete or reach halfway.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
        Alert.alert(
          'Permission Denied',
          'You will not receive timer alerts. Please enable notifications in your device settings.',
          [{ text: 'OK' }]
        );
      }
    } catch (err) {
      console.warn('Error requesting POST_NOTIFICATIONS permission:', err);
    }
  }
};


// --- Schedule Local Notification ---
/**
 * Schedules a local notification immediately.
 * @param {string} title - The title of the notification.
 * @param {string} message - The body/message of the notification.
 * @param {boolean} isCompletion - True if it's a timer completion notification, for specific channel/sound.
 */
export const scheduleLocalNotification = (title, message, isCompletion = false) => {
  PushNotification.localNotification({
    channelId: isCompletion ? 'completion-channel' : 'timer-channel', // Use different channels
    title: title,
    message: message,
    playSound: true, // Play system default sound
    soundName: isCompletion ? 'default' : 'default', // You can specify custom sound files here (e.g., 'mysound.mp3')
    importance: isCompletion ? 'high' : 'default', // Set importance
    priority: isCompletion ? 'high' : 'default', // Set priority (Android specific)
    vibrate: true, // Enable vibration
    // You can add more options like data, actions etc.
  });
};

// You can add other notification related functions here, e.g., cancelAllLocalNotifications
export const cancelAllLocalNotifications = () => {
  PushNotification.cancelAllLocalNotifications();
  console.log('All local notifications cancelled.');
};