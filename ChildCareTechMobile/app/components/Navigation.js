import React from "react";
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './Home.js';
import { Attendance } from './Attendance.js';
import { TripScreen } from './TripScreen.js';
import { ChildrenScreen } from './ChildrenScreen.js'
import { View, Text } from "react-native";
import { globalStyle } from "./globalStyle.js";

import { QRReader } from './QRReader.js';


const Stack = createNativeStackNavigator();

const Navigation = ({refresh}) => {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ title: 'Welcome' }
        }>{(props) => <Home {...props} refreshLogout={refresh} />}</Stack.Screen>
        <Stack.Screen name="Attendance" component={Attendance} />
        <Stack.Screen name="ChildrenScreen" component={ChildrenScreen} options={{ title: 'Children Information' }} />
        <Stack.Screen name="TripScreen" component={TripScreen} options={{ title: 'Trip Information' }} />
        <Stack.Screen name="QRReader" component={QRReader} />
      </Stack.Navigator>
    </NavigationContainer>);
}

export { Navigation};