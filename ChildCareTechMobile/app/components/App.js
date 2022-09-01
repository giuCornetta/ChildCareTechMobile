/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { Home } from './Home.js';
import { Attendance } from './Attendance.js';
import { TripScreen } from './TripScreen.js';
import { ChildrenScreen } from './ChildrenScreen.js'
import { Navigation } from './Navigation.js';

import type { Node } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Modal
} from 'react-native';;
import { globalStyle } from './globalStyle.js';
import { Fetch, PostRequest } from './networkUtils.js';





let ipAddress = '10.0.2.2';

const onChangeText = (text) => {
    ipAddress = text;
}

const App: () => Node = () => {
  const [login, setLogin] = useState(false);
  const [logout, setLogout] = useState(false);

  const refreshLogout = () => {
      setLogout(!logout);
  }

  console.log(ipAddress);
  

  useEffect(() => {
    fetch('http://' + ipAddress + ':8080/')
            .then((response) => {
              if(response.url === 'http://' + ipAddress + ':8080/'){
                setLogin(true);
              } else {
                setLogin(false);
              }
            })
            .catch((err) => {
                console.log(err.message);
            });
  } , [logout]);
  

  if (login)
    return (<Navigation refresh={refreshLogout}/>)
  else
    return (<Login setLogin={setLogin}/>);
};


const Login = ({ setLogin }) => {
  const initialFormData = Object.freeze({
    username: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [modalVisible, setModalVisible] = useState(false);
  const [csrfToken, setCsrfToken] = useState([]);
  useEffect(Fetch('/csrf', setCsrfToken), [ipAddress])

  const onChangeUsername = (text) => {
    updateFormData({
      ...formData,
      username: text,
    })
  }

  const onChangePassword = (text) => {
    updateFormData({
      ...formData,
      password: text,
    })
  }

  let form_data = new FormData();
  form_data.append("username", formData.username);
  form_data.append("password", formData.password);

  const submit = () => {
    console.log('http://' + ipAddress + ':8080/login');
    fetch('http://' + ipAddress + ':8080/login', {
      credentials: 'include',
      method: 'POST',
      body: form_data,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml',
        'Content-Type': 'multipart/form-data',
        'X-CSRF-TOKEN': csrfToken.token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          if (response.url === "http://" + ipAddress + ":8080/") {
            //navigationRef.onReady(() => navigationRef.navigate("Home"));
            setLogin(true);
            //navigationRef.onReady(() => navigationRef.navigate("Home"));
            //navigationRef.onReady();
          }
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  console.log(ipAddress);

  return (<View style={globalStyle.container}>
    <Text style={globalStyle.title}>LOGIN</Text><TextInput
      style={styles.input}
      onChangeText={onChangeUsername}
      placeholder="Username" /><TextInput
      style={styles.input}
      onChangeText={onChangePassword}
      placeholder="password" /><Button
      onPress={submit}
      title="Login" /><View style={globalStyle.container}>
      <>
        <Text style={globalStyle.subTitle}>You can change the server IP address, the default is 10.0.2.2</Text>
        <Text>You have chosen: {ipAddress}</Text>
        <Button
          onPress={() => setModalVisible(true)}
          title="Configure IP address"
          accessibilityLabel="Configure IP address" />
      </></View><Modal
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
            placeholder={ipAddress} />
          <Button
            onPress={() => setModalVisible(false)}
            title="Confirm" />

        </View>
      </View>
    </Modal>
  </View>)
}



const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
export { ipAddress/*, refreshLogout */};
