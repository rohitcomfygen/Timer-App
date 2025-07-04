# Timer-App⏱️ Multi-Category Timer App
A versatile mobile timer application built with React Native CLI, allowing users to create, manage, and categorize multiple timers. Stay organized and productive with custom timers for work, study, breaks, and more, complete with local notifications!

✨ Features
Multi-Timer Management: Create and manage an unlimited number of individual timers.

Customizable Timers: Set custom names and durations (in seconds) for each timer.

Categorization: Organize your timers into custom categories (e.g., Work, Study, Break, Workout).

Timer Actions: Start, pause, and reset individual timers.

Bulk Category Actions: Start all, pause all, or reset all timers within a specific category with a single tap.

Progress Bar: Visual representation of timer progress.

Local Notifications:

Halfway Alerts: Get a notification when a running timer reaches its halfway point.

Completion Alerts: Receive a notification when a timer finishes.

Persistent Storage: All your timers and categories are saved automatically using AsyncStorage, so they're there even after closing the app.

Timer History: A dedicated screen to view a log of all completed timers.

Intuitive UI: Clean and responsive user interface built with React Native components.

🚀 Getting Started
Follow these steps to get the app up and running on your local machine.

Prerequisites
Before you begin, ensure you have the following installed:

Node.js: LTS version recommended

npm or Yarn: npm comes with Node.js; for Yarn, see installation guide.

React Native CLI:

Bash

npm install -g react-native-cli
# OR
yarn global add react-native-cli
Android Studio (for Android development)

Xcode (for iOS development, macOS only)

For detailed environment setup, refer to the official React Native CLI documentation.

Installation
Clone the repository:

Bash

git clone <your-repo-url>
cd multi-category-timer-app
(Replace <your-repo-url> with the actual URL of your Git repository)

Install dependencies:

Bash

npm install
# OR
yarn install
Install @react-native-picker/picker (manual linking might be required for older RN versions):
This project uses @react-native-picker/picker. Ensure it's correctly linked.

Bash

npm install @react-native-picker/picker
# OR
yarn add @react-native-picker/picker
For React Native versions 0.60 and above, auto-linking should handle this. For older versions, you might need to run:

Bash

react-native link @react-native-picker/picker
Install react-native-notifications:
This library is used for local notifications.

Bash

npm install react-native-notifications
# OR
yarn add react-native-notifications
Post-installation steps for react-native-notifications are CRITICAL:

iOS:

Bash

cd ios && pod install && cd ..
You'll also need to follow the iOS setup instructions for react-native-notifications, which involves modifying AppDelegate.m and enabling Push Notifications capability in Xcode.

Android:
Follow the Android setup instructions for react-native-notifications, which typically involves modifying AndroidManifest.xml and MainApplication.java.

Running the App
After installation and linking, you can run the app on an emulator/simulator or a physical device.

For Android
Start the Metro Bundler:

Bash

npm start
# OR
yarn start
In a new terminal, run the Android app:

Bash

npm run android
# OR
yarn android
(Ensure you have an Android emulator running or a device connected.)

For iOS (macOS only)
Start the Metro Bundler:

Bash

npm start
# OR
yarn start
In a new terminal, run the iOS app:

Bash

npm run ios
# OR
yarn ios
(This will launch the app on an iOS simulator. If you want to run on a physical device, you'll need to configure signing in Xcode.)

🛠️ Project Structure
The project follows a standard React Native CLI structure with a focus on modularity:

.
├── android/                   # Android native project files
├── ios/                       # iOS native project files
├── src/
│   ├── assets/                # (Optional) Images, fonts, etc.
│   ├── components/
│   │   ├── AddTimerModal.js   # Modal for adding new timers
│   │   ├── CategorySection.js # Collapsible section for timer categories
│   │   ├── ConfirmationModal.js # Generic confirmation/alert modal
│   │   └── TimerItem.js       # Individual timer display and controls
│   ├── navigation/
│   │   └── AppNavigator.js    # React Navigation setup
│   ├── screens/
│   │   ├── HomeScreen.js      # Main screen with timer list
│   │   └── HistoryScreen.js   # Screen to view timer completion history
│   └── utils/
│       ├── AsyncStorageHelper.js # Utility for AsyncStorage operations
│       ├── NotificationsHelper.js # Utility for local notifications
│       └── helpers.js         # General utility functions (e.g., formatTime)
├── App.js                     # Main app component
├── README.md                  # This file
├── package.json               # Project dependencies and scripts
└── ... (other config files)
🤝 Contributing
Contributions are welcome! If you have suggestions for improvements or find any bugs, please open an issue or submit a pull request.

📄 License
This project is open source and available under the MIT License.

