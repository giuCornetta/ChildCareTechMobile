import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native"
import { Fetch } from './networkUtils.js'
import { globalStyle } from "./globalStyle.js";
import { TableComponent } from "./table";

const Details = ({ navigation }) => {

    const [children, setChildren] = useState([]);

    useEffect(Fetch('/details/children', setChildren), []);


    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic">
            <View style={globalStyle.scrollContainer}>
                <Text style={globalStyle.title}>Dettaglio Iscritti</Text>
                <TableComponent nameColumns={["Name", "Surname", "DOB"]} list={children} propExtractor={print}
                    onPress={(c) => {
                        console.log(c);
                        navigation.push('ChildrenScreen', {
                            screen: "ChildDetails",
                            params: {
                                child: c,
                            },
                        })
                    }
                    } />
            </View></ScrollView>
    );
};


/*const pressedChild = (child) => {
    navigation.navigate('ChildDetails', { child: child })
}*/

const print = (child) => {
    return [child.name, child.surname, child.dob];
}




export { Details };