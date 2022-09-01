import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import {Text, TouchableOpacity, StyleSheet } from 'react-native';

const QRReader = ({ route, navigation }) => {
    const prevPage = route.params.prevPage;


    const onSuccess = (e) => {
        if(prevPage.name === "Attendance")
            navigation.navigate(prevPage.name, { scannedChild: e.data});
        else if(prevPage.name === "TripAttendance"){
            navigation.navigate('TripScreen', {
                screen: "TripAttendance",
                params: {
                    scannedChild: e.data,
                    stopInfo: prevPage.stopInfo,
                },
            })
        }
    }

    return (
        <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.auto}
            topContent={
                <Text style={styles.centerText}>
                    Scan the QR code
                </Text>
            }
        />)
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});

export { QRReader };