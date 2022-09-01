import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native"
import { Fetch, PostRequest } from "./networkUtils";
import { globalStyle } from "./globalStyle.js";
import { Parents, Doctor, Contacts, Child, Allergies } from "./PeopleComponents";

const ChildDetails = ({ route, navigation }) => {
    const child = route.params.child;
    const [contacts, setContacts] = useState([]);
    const [parent1Phones, setParent1Phones] = useState([]);
    const [parent2Phones, setParent2Phones] = useState(null);

    useEffect(Fetch('/details/contacts/' + child.id, setContacts), []);
    useEffect(Fetch('/telephoneNumbers/' + child.parent1.id, setParent1Phones), []);
    useEffect(() => {
        if (child.parent2)
            Fetch('/telephoneNumbers/' + child.parent2.id, setParent2Phones)();
    }, []);





    return (

        <ScrollView
            contentInsetAdjustmentBehavior="automatic">
            <View style={globalStyle.container}>
                <Text style={globalStyle.title}>{child.name} {child.surname}'s contacts Page</Text>
                <Child child={child} />
                <Allergies child={child.id} />
                <Parents parent1={child.parent1} parent2={child.parent2} phone={true} parent1Numbers={parent1Phones} parent2Numbers={parent2Phones} />
                <Contacts contacts={contacts} />
                <Doctor doctor={child.doctor} />
            </View>
        </ScrollView >

    );
};



export { ChildDetails };