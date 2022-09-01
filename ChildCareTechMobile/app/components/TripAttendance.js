import React, { useEffect, useState } from "react";
import { globalStyle } from "./globalStyle";
import { View, Text, Button, StyleSheet, StatusBar, ScrollView } from "react-native";
import { Fetch, PostRequest } from "./networkUtils";
import { TableComponent } from "./table";

const TripAttendance = ({ route, navigation }) => {
    const stopInfo = route.params.stopInfo;
    const scannedChild = (route.params) ? route.params.scannedChild : null;
    const [refresh, setRefresh] = useState(false);
    const [csrfToken, setCsrfToken] = useState(null);
    const [missing, setMissing] = useState([]);
    const [present, setPresent] = useState([]);

    const toggleRefresh = () => {
        setRefresh(!refresh);
    }

    useEffect(() => {
        if (scannedChild)
            qrOnSuccess()
    }, [scannedChild]);
    useEffect(Fetch("/trips/attendance/" + stopInfo.idStop + "/" + stopInfo.bus, setPresent), [refresh]);
    useEffect(Fetch("/trips/attendance/missing/" + stopInfo.idStop + "/" + stopInfo.bus, setMissing), [refresh]);
    useEffect(Fetch('/csrf', setCsrfToken), [])


    const qrOnSuccess = () => {
        console.log("Attendance received a scanned child");
        console.log(scannedChild);
        let [idChild, cfChild, nameChild, surnameChild] = scannedChild.split(';');
        const formData = {
            id: idChild,
            cf: cfChild,
            name: nameChild,
            surname: surnameChild,
            idTrip: stopInfo.idTrip,
            idTripStop: stopInfo.idStop,
            bus: stopInfo.bus,
        }
        console.log(formData);
        PostRequest("/trips/registerAttendance", formData, () => { }, csrfToken.token, toggleRefresh)();
        route.params.scannedChild = null;
        console.log("sent to form")
    }

    const propExtractor = (attendance) => {
        return [attendance.name, attendance.surname];
    }



    return (<View style={globalStyle.container}>
        <ScrollView>
            <Text style={globalStyle.title}>Trip Stop Head Count (Bus: {stopInfo.bus})</Text>
            <View style={style.container}>
                <Text style={globalStyle.subTitle}>Children NOT on The bus</Text>
                {(missing.length >0) ? <TableComponent nameColumns={["Name", "Surname"]} list={missing} propExtractor={propExtractor} onPress={null} /> : <Text style={{color: "gray"}}>No children are missing</Text>}
            
            <Text style={globalStyle.subTitle}>Children on The bus</Text>
            {(present.length > 0) ? <TableComponent nameColumns={["Name", "Surname"]} list={present} propExtractor={propExtractor} onPress={null} /> : <Text style={{color: "gray"}}>There are no children on the bus</Text>}
            <Button
                onPress={() => {
                    navigation.navigate('QRReader', {
                        prevPage: {
                            name: "TripAttendance",
                            stopInfo: stopInfo,
                        }
                    })
                }}
                title="Add Attendance" />
                </View>
        </ScrollView>
    </View>);
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export { TripAttendance };