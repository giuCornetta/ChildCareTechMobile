# ChildCareTechMobile

ChildCareTechMobile is a mobile application that connects to the server of the ChildCareTech application.

## Setting up

This is a working Android application that can be installed on Android devices. It can be excecuted both with a physical device and an emulator. 

To do so, some setting up is necessary.

### Install Node and JDK

Node and Java SE Development Kit (JDK) need to be installed on the computer. 


### Install Android Studio

1. Download [Android Studio](https://developer.android.com/studio) on your computer.

2. Install **Android SDK**. Open Android Studio, click on "More Actions" button and select "SDK Manager". Install Android 12 (S).

3. Configure the **ANDROID_HOME** environment variable so that it point to the path to your Android SDK
	For Example: 'C:\Users\122561\AppData\Local\Android\Sdk'

The default location of the Android SDK is
 
		%LOCALAPPDATA%\Android\Sdk

4. Add the following to the **PATH** environment variable: 

		PATH: %ANDROID_HOME%\emulator
		PATH: %ANDROID_HOME%\tools
		PATH: %ANDROID_HOME%\tools\bin
		PATH: %ANDROID_HOME%\platform-tools
For example: 

		C:\Users\122561\AppData\Local\Android\Sdk\platform-tools
		C:\Users\122561\AppData\Local\Android\Sdk\emulator
		C:\Users\122561\AppData\Local\Android\Sdk\tools
		C:\Users\122561\AppData\Local\Android\Sdk\tools\bin

### Start the Server

The mobile application connects to the ChildCareTech server. 

Start the ChildCareTech server before starting the application

## Start the application

Download the folder ChildCareTechMobile

In order to start the application, Metro will first need to be started. To do that run the following command inside of the project folder:

		npx react-native start

The mobile app can be installed in an emulator or on a physical device.

> ### Install on a Physical Device
>
>To install the application on a physical device do the following: 
>
>1. Enable Developers Options on the device.
>2. Go to **Settings > Developers Options** to enable USB Debugging
>3. Plug your device to the computer via USB


In another terminal window run the following command in the project folder: 
		
		npx react-native run-android

This command will install and start the app on the device plugged in, or in the emulator if there is no device plugged in.

> If usign a physical device the mobile app will have to connect to the ip address of the server via the button in the login menu