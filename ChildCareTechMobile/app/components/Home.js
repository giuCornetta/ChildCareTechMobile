import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, TextInput, Modal } from "react-native";
import { globalStyle } from "./globalStyle";
import { ipAddress } from "./App";
import { Fetch } from "./networkUtils";
//import { refreshLogout } from "./App";

const DATA = [
    {
        title: "Attendance",
        onPress: (navigation) => {
            navigation.navigate("Attendance")
        }
    },
    {
        title: "Details",
        onPress: (navigation) => {
            navigation.navigate('ChildrenScreen', {
                screen: 'Details'
            })
        }
    },
    {
        title: "Trips",
        onPress: (navigation) => {
            navigation.navigate('TripScreen', {
                screen: 'Trips'
            })
        }
    }
];

/*navigation.navigate('Root', {
    screen: 'Profile',
    params: { user: 'jane' },
  });*/

const Item = ({ item, onPress, color }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor: color }]}>
            <Text style={globalStyle.title}>{item.title}</Text>
        </TouchableOpacity>);
};

const Home = ({ navigation, refreshLogout }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [csrfToken, setCsrfToken] = useState([]);
    useEffect(Fetch('/csrf', setCsrfToken), [])

    let bgColor = 'rgba(107, 207, 162, 0.8)'

    const renderItem = ({ item }) => { //prende in input un item e lo restituisce modificato
        return (
            <Item
                item={item}
                onPress={() => item.onPress(navigation)}
                color={bgColor}
            />
        );
    };

    /*const onChangeText = (text) => {
        ipAddress = text;
    }*/


    const logout = () => {
        fetch('http://' + ipAddress + ':8080/logout', {
            credentials: 'include',
            method: 'POST',
            //body: JSON.stringify(_body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken.token,
            },
        })
            .then((response) => {
                if (response.url === 'http://' + ipAddress + ':8080/login') {
                    console.log("AVVENUTO LOGOUT");
                    refreshLogout();
                    //<App />
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return (
        <View style={globalStyle.container}>
            <Text style={globalStyle.title}>Opzioni disponibili:</Text>

            <FlatList
                data={DATA}
                renderItem={renderItem}
            />

            <Button
                onPress={logout}
                title="Logout"
                accessibilityLabel="Logout" />

        </View>
    );
};


/*
<>
                <Text style={{textFont: 30}}>You can change the server IP address,{"\n"}the default is 10.0.2.2</Text>
                <Text>You have chosen: {ipAddress}</Text>
                <Button
                    onPress={() => setModalVisible(true)}
                    title="Configure IP address"
                    accessibilityLabel="Configure IP address" />
            </>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={globalStyle.centeredView}>
                    <View style={globalStyle.modalView}>
                        <Text>Insert the server IP address:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeText}
                            placeholder={ipAddress}
                        />
                        <Button
                            onPress={() => setModalVisible(false)}
                            title="Confirm" />

                    </View>
                </View>
            </Modal>
            */


const styles = StyleSheet.create({
    item: {
        flex: 1,
        padding: 30,
        marginVertical: 8,
        marginHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'rgba(107, 207, 162, 0.8)',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

//backgroundColor: '#f9c2ff',
export { Home/*, ipAddress*/ };