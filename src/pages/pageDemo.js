
import React, { Component } from 'react';
import {login,logout,callApis} from 'utils/securityAPI/apiCaller';
import {ACCESS_TOKEN} from 'settings/sessionStorage';
export default class ABCD extends Component{
   
    render() {
        var ss =sessionStorage.getItem(ACCESS_TOKEN);
        if(ss!==null){
            var k =JSON.parse(ss);
            console.log(k.access_token);
        }
        return (
          <div>
                <button id="login" onClick={login}>Login</button>
                <button id="api" onClick={callApis}>Call API</button>
                <button id="logout" onClick={logout}>Logout</button>
          </div>
        );
      }
}