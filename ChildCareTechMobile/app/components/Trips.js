import React from "react";
import { TableComponent } from "./table";
import { useEffect, useState } from "react";
import { Fetch, PostRequest } from "./networkUtils";
import { ScrollView, Text, View } from "react-native";
import { globalStyle } from "./globalStyle";
//TODO add Attendance

const Trips = ({ navigation }) => {
    const [trips, setTrips] = useState({});

    useEffect(Fetch('/trips/list', setTrips), []);

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic">
            <View style={globalStyle.scrollContainer}>
                <Text style={globalStyle.title}>Trips</Text>
                <TableComponent nameColumns={["DepartureDate", "ReturnDate", "DepartureCity", "ArrivalCity"]} list={trips} propExtractor={propExtractor}
                    onPress={(trip) => {
                        navigation.push('TripScreen', {
                            screen: "TripDetails",
                            params: {
                                trip: trip,
                            },
                        })
                    }
                    } />
            </View>
        </ScrollView>
    );

}


const propExtractor = (trip) => {
    return [trip.departureDate, trip.returnDate, trip.departureCity, trip.arrivalCity];
}



export { Trips };