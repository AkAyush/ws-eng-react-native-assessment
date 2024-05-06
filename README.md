# React Native Assessment

This repository contains the scaffolding for creating a cross-platform application for the React Native assessment. For convenience, the icons required for this assessment are included in the `assets` folder.

You have two options for writing code for this assessment: Gitpod (recommended) or local (will require up to 60 minutes of set-up time). Using you local machine will allow you to use a local emulator/simulator, whereas for the Gitpod environment, you will need to use your physical mobile device to test the app. 

## Running in Gitpod

You can sign up for a free Gitpod account here: https://www.gitpod.io/ using your GitHub account. After you sign up, you can open the following link to launch your environment: https://www.gitpod.io/#https://github.com/trilogy-group/ws-eng-react-native-assessment

Once the environment spins up, you'll have a browser-based VSCode at your disposal. A terminal task is launched automatically, which installs dependencies and starts Expo. 

Once Expo has spun up, it will display a QR code. Install the "Expo Go" app on your Android/iOS mobile device and scan the QR code to open your app. When you make changes, you can press "r" in the terminal to refresh the app on your device.

If you are inactive for a while, your Workspace will be "paused". All file changes that you have made to the repository will be saved. You can resume it by refreshing the link or by going here: https://gitpod.io/workspaces.

## Running Locally

You will need to:
 - Install NodeJS 20 on your local machine, 
 - Install the dependencies of this project: `npm ci`,
 - Start the application: `npm start`,
 - Follow the expo documentation to run the app on an [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/) or [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/).

## Exporting your Changes

If the assessment you are working on asks for a git patch, you must export a git diff of your changes by running the `./create-patch.sh` script provided in this repository. This will create a patch in the current folder. Open it to ensure that all your changes are present (it's just a text file). On Gitpod, you can right-click to download it.
