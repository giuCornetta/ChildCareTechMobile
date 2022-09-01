import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Details } from "./Details";
import { ChildDetails } from "./ChildDetails";

const Stack = createNativeStackNavigator();

const ChildrenScreen = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="ChildDetails" component={ ChildDetails } />
        </Stack.Navigator>
    )
}

export { ChildrenScreen };