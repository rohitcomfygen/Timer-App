// index.js
// import 'react-native-gesture-handler'; // MUST BE AT THE VERY TOP for React Navigation gestures
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { configureNotifications } from './src/utils/NotificationsHelper';

// Configure push notifications as soon as the app starts
configureNotifications();

AppRegistry.registerComponent(appName, () => App);