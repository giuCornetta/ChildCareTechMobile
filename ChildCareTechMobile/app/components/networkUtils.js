import React, { useState } from 'react';
import { Alert } from 'react-native';
import { ipAddress } from './App';

const Fetch = function (_url, _setter) {

    return (() => {
        fetch('http://' + ipAddress + ':8080' + _url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                _setter(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    });
}

const PostRequest = (_url, _body, _setter, _csrf, _refresh) => {
    let authorizedFlag = false;
    return (() => {
        fetch('http://' + ipAddress + ':8080' + _url, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(_body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': _csrf,
            },
        })
            .then((response) => {
                if (response.redirected === true) {
                    console.log(response.url);
                    if(response.url === '/login' || response.url === '/logout'){
                        console.log(response.url.substring(1));
                        authorizedFlag === true;
                    }
                }
                else {
                    if(response.status === 400 && (_url === "/trips/registerAttendance" || _url === "/attendance/register")){
                        return response.text().then(text => Alert.alert("Bad Request", text));
                    }else {
                        response.json();
                    }
                }
            })
            .then((data) => {
                console.log(data);
                _setter(data);
                if(_url !== "/login"){
                    _refresh();
                } else {
                    if(authorizedFlag){
                        _refresh();
                    }
                }
                
            })
            .catch((err) => {
                console.log(err.message);
            });
    });
}

const PatchRequest = (_url, _responseBody, _csrf, _refresh) => {
    return (
        fetch('http://' + ipAddress + ':8080' + _url, {
            method: 'PATCH',
            body: JSON.stringify(_responseBody),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': _csrf,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                _refresh();
            })
            .catch((err) => {
                console.log(err.message);
            })
    )
}

export { Fetch, PostRequest };