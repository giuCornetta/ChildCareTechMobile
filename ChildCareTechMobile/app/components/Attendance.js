import React, { useEffect, useState } from "react";
import { Fetch, PostRequest } from "./networkUtils";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { globalStyle } from "./globalStyle";
import { TableComponent } from "./table";
import DateTimePickerModal from "react-native-modal-datetime-picker";



const Attendance = ({ route, navigation }) => {
    let today = new Date();

    const [date, setDate] = useState(today);
    const [attendance, setAttendance] = useState({});
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const scannedChild = (route.params) ? route.params.scannedChild : null;
    const [refresh, setRefresh] = useState(false);
    const [csrfToken, setCsrfToken] = useState([]);
    useEffect(Fetch('/csrf', setCsrfToken), [])

    useEffect(Fetch('/attendance/children/' + date.toISOString().substring(0, 10), setAttendance), [date, refresh]);
    useEffect(() => {
        if (scannedChild)
            qrOnSuccess()
    }, [scannedChild]);

    const toggleRefresh = () => {
        setRefresh(!refresh);
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(date);
        hideDatePicker();
    };

    const qrOnSuccess = () => {
        console.log("Attendance received a scanned child");
        console.log(scannedChild);
        let [idChild, cfChild, nameChild, surnameChild] = scannedChild.split(';');
        const formData = {
            id: idChild,
            cf: cfChild,
            name: nameChild,
            surname: surnameChild,
            time: (new Date()).toLocaleString().split(',')[1].substring(1, 6),
        }
        console.log(formData);
        PostRequest("/attendance/register", formData, () => { }, csrfToken.token, toggleRefresh)();
        route.params.scannedChild = null;
        console.log("sent to form")
    }


    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic">
            <View style={globalStyle.scrollContainer}>
                <Text style={globalStyle.title}>Child Attendances</Text>
                <Button onPress={showDatePicker} title="Change Date" />
                <Text>Selected date: {date.toLocaleString().split(',')[0]}</Text>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    maximumDate={new Date(today.getFullYear(), today.getMonth(), today.getDate())}
                    minimumDate={new Date(2022, 7, 19)}
                />
                <TableComponent style={style.table} nameColumns={["Name", "Surname", "Entrance Time", "Exit Time"]} list={attendance} propExtractor={propExtractor} onPress={null} />
                {today.toISOString().substring(0, 10) === date.toISOString().substring(0, 10) ?
                    <Button
                        onPress={() => {
                            navigation.navigate('QRReader', {
                                prevPage: {
                                    name: "Attendance",
                                }
                            })
                        }}
                        title="Add Attendance" /> : <></>
                }
            </View>
        </ScrollView>
    );
}

/*const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            minimumDate:"2022-08-19",
            maximumDate: today,
            onChange: onChangeDate,
            mode: currentMode,
            display:"spinner",
        });
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
*/

//style={{width: 200}}

/*customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}*/


const propExtractor = (attendance) => {
    let name, surname, entranceTime, exitTime;
    if (attendance) {
        name = attendance.child.name;
        surname = attendance.child.surname;
        entranceTime = attendance.entranceTime;
        exitTime = attendance.exitTime;
    } else {
        name = "";
        surname = "";
        entranceTime = "";
        exitTime = "";
    }

    return [name, surname, entranceTime, exitTime];
}
const style = StyleSheet.create({
    leftSide: {
        alignSelf: 'flex-end',
        position: 'absolute',
    },
    table: {
        position: 'relative',
    }
});


export { Attendance };