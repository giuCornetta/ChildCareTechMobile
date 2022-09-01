import React, { useEffect, useState } from "react";
import { Text, ScrollView, View, StyleSheet, Modal, Button, Alert } from "react-native";
import { globalStyle } from "./globalStyle";
import { TableComponent } from "./table";
import { Fetch } from "./networkUtils";
import SelectDropdown from 'react-native-select-dropdown'

const TripDetails = ({ route, navigation }) => {
    const trip = route.params.trip;
    const [tripStops, setTripStops] = useState(null);
    const [registeredChildren, setRegisteredChildren] = useState(null);
    const [registeredStaff, setRegisteredStaff] = useState(null);

    const [buses, setBuses] = useState(null);

    useEffect(Fetch('/trips/stops/' + trip.id, setTripStops), []);
    useEffect(Fetch('/trips/registration/children/' + trip.id, setRegisteredChildren), []);
    useEffect(Fetch('/trips/registration/staff/' + trip.id, setRegisteredStaff), []);
    useEffect(Fetch('/trips/buses/' + trip.id, setBuses), []);

    const [day, month, year] = trip.departureDate.split('/');
    const departureDate = new Date(+year, month - 1, +day);
    let registrationTags = [], today = new Date(), i = 0;
    /*if(buses) {
        if (today < departureDate && buses.length > 0) {
            registrationTags.push(<AddStaffRegistration tripId={trip.id} notRegistered={staffMissingRegistration}
                                                        bus={buses} refresh={toggleRefreshStaff}
                                                        token={csrfToken.token} key={i++}/>)
            registrationTags.push(<AddChildRegistration tripId={trip.id} notRegistered={childrenMissingRegistration}
                                                        bus={buses} refresh={toggleRefreshChildren}
                                                        token={csrfToken.token} key={i++}/>)
        }

    } else {
        if(!busFormVisible) {
            setBusFormVisible(true);
        }
    }*/

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic">
            <Text style={[globalStyle.title, style.container2]}>Information about the trip</Text>
            <Details trip={trip} />
            <Stops tripId={trip.id} stops={tripStops} buses={buses} navigation={navigation} />
            <Summary children={registeredChildren} staff={registeredStaff} buses={buses} />
        </ScrollView>
    );
}

const Details = ({ trip }) => {

    return (<View style={globalStyle.container}><Text style={globalStyle.subTitle}>Trip Details</Text>
        <Text>Destination: {trip.arrivalCity}</Text>
        <Text>Duration: {trip.departureDate} - {trip.returnDate}</Text>
        <Text>Departing from: {trip.departureCity}</Text>
    </View>
    );
}

const stopsPropExtractor = (stop) => {
    return [stop.stopName, stop.arrivalTime, stop.departingTime];
}

const Stops = ({tripId, stops, buses, navigation }) => {
    const initialSelection = Object.freeze({
        bus: "",
        idStop: "",
        idTrip: "",
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [selection, updateSelection] = useState(initialSelection);

    if (stops) {
        if (stops.length > 0) {
            let returnStops = [], departureStops = [];
            for (let i = 0; i < stops.length; i++) {
                if (stops[i].wayBack) {
                    returnStops.push(stops[i]);
                } else {
                    departureStops.push(stops[i]);
                }
            }

            const setVisible = () => {
                setModalVisible(true);
            }

            return (<View style={[globalStyle.container]}>
                <Text style={globalStyle.subTitle}>Stops</Text>

                <Button title="Add Head Count" onPress={setVisible} />

                <Text style={style.subSubTitle}>On the way there</Text>
                {departureStops.length > 0 ? <TableComponent nameColumns={["Stop", "Arrival", "Departure"]} list={departureStops}
                    propExtractor={stopsPropExtractor} onPress={null} key={1} /> : <Text key={1}>There are not stops for now</Text>}

                <Text style={style.subSubTitle}>On the way back</Text>
                {returnStops.length > 0 ? <TableComponent nameColumns={["Stop", "Arrival", "Departure"]} list={returnStops}
                    propExtractor={stopsPropExtractor} onPress={null} /> : <Text>There are no stops for now</Text>}

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
                            <Text style={globalStyle.subTitle}>Select the stop and the bus for which you want to do the head count:</Text>
                            <Text>Select the stop:</Text>
                            <SelectDropdown
                                data={stops}
                                onSelect={(selectedItem, index) => {
                                    console.log("tripId");
                                    console.log(tripId);
                                    updateSelection({
                                        ...selection,
                                        idStop: selectedItem.id,
                                        idTrip: tripId,
                                    })
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem.stopName;
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item.stopName;
                                }}
                            />
                            <Text>Select the bus:</Text>
                            <SelectDropdown
                                data={buses}
                                onSelect={(selectedItem, index) => {
                                    updateSelection({
                                        ...selection,
                                        bus: selectedItem.label,
                                    })
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem.label;
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item.label;
                                }}
                            />
                            <Button
                                onPress={(trip) => {
                                    setModalVisible(false);
                                    if (selection.bus !== "" && selection.idStop!== "") {
                                        navigation.push('TripScreen', {
                                            screen: "TripAttendance",
                                            params: {
                                                stopInfo: selection,
                                            },
                                        })
                                        updateSelection(initialSelection);
                                    } else {
                                        Alert.alert("Missing Parameters")
                                    }
                                }}
                                title="Confirm" />

                        </View>
                    </View>
                </Modal>

            </View>
            )

        } else {
            return (<View style={globalStyle.container}>
                <Text style={globalStyle.subTitle}>Stops</Text>
                <Text>This trip does not have any stops</Text>
            </View>);
        }
    }
}


const Summary = ({ children, staff, buses }) => {
    if (buses) {
        if (buses.length > 0) {
            let busTags = [], k = 0;
            for (let i = 0; i < buses.length; i++) {
                busTags[i] = [];
                busTags[i].push(<Text style={style.subSubTitle} key={k++}>Bus N.{(i + 1)}: {buses[i].value}</Text>);
                if (staff) {
                    if (staff[i]) {
                        busTags[i].push(<Text style={{ fontWeight: "bold" }} key={k++}>Supervisors:</Text>);
                        for (let j = 0; j < staff[i].length; j++) {
                            busTags[i].push(<Text key={k++}>{staff[i][j].staff.name} {staff[i][j].staff.surname},
                                Group: {staff[i][j].primarykey.group}</Text>)
                        }
                    }
                }
                if (children) {
                    if (children[i]) {
                        busTags[i].push(<Text style={{ fontWeight: "bold" }} key={k++}>Children:</Text>);
                        for (let j = 0; j < children[i].length; j++) {
                            busTags[i].push(<Text key={k++}>{children[i][j].child.name} {children[i][j].child.surname},
                                Group: {children[i][j].group}</Text>)
                        }
                    }
                }
            }

            let busTagContainers = [];
            for (let i = 0; i < busTags.length; i++) {
                busTagContainers.push(<View style={globalStyle.container} key={k++}>{busTags[i]}</View>);
            }

            if (busTagContainers.length < 0) {
                busTagContainers.push(<Text key={k++}>There are no buses assigned to this trip</Text>)
            }


            return (<View style={globalStyle.container}>
                <Text style={globalStyle.subTitle}>Summary</Text>
                {busTagContainers}
            </View>);
        } return (<View></View>)
    }
}

const style = StyleSheet.create({
    subSubTitle: {
        fontSize: 20,
    },
    container2: {
        margin: 5,
    },

})

export { TripDetails };