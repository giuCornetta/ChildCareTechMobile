import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Trips } from "./Trips";
import { TripDetails } from "./tripDetails";
import { TripAttendance } from "./TripAttendance";

const Stack = createNativeStackNavigator();

const TripScreen = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Trips" component={Trips} />
            <Stack.Screen name="TripDetails" component={ TripDetails } />
            <Stack.Screen name="TripAttendance" component={TripAttendance}/>
        </Stack.Navigator>
    )
}

export { TripScreen };