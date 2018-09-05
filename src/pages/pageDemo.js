
import React, { Component } from 'react';
import  'babel-polyfill';
import * as Oidc from 'oidc-client';
import axios from 'axios';
const config = {
    authority: "https://identityserverphucthinh.azurewebsites.net", 
    // authority: "https://demo.identityserver.io/",
    client_id: "js",
    redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
    response_type: "id_token token",
    scope:"openid profile api1",
    post_logout_redirect_uri :`${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
};
const mgr = new Oidc.UserManager(config);

    // mgr.getUser().then(function (user) {
    //     if (user) {
    //         log("User logged in", user.profile);
    //     }
    //     else {
    //         log("User not logged in");
    //     }
    // });
export default class ABCD extends Component{
    log=() =>{
        document.getElementById('results').innerText = '';
        var res='';
        Array.prototype.forEach.call(arguments, function (msg) {
            if (msg instanceof Error) {
                msg = "Error: " + msg.message;
            }
            else if (typeof msg !== 'string') {
                msg = JSON.stringify(msg, null, 2);
            }
            res+=msg+'\r\n';
            // document.getElementById('results').innerHTML += msg + '\r\n';
        });
        console.log(res);
    }
    login=()=> {
        console.log(mgr);
        mgr.signinRedirect();
    }
    
    api=()=> {
        mgr.getUser().then((user) =>{
            var url = "https://identityserverphucthinhapi.azurewebsites.net/api/hello";
    
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload =  ()=> {
                this.log(xhr.status, JSON.parse(xhr.responseText));
            }
            xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
            xhr.setRequestHeader('Access-Control-Request-Origin','*');
            xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.send();
            // this.callApis("",'GET',null,user.access_token);
        });
    }
    callApis=(endpoint, method = 'GET', body,accessToken)=> {
        var url = "https://identityserverphucthinhapi.azurewebsites.net/api/hello";
        return axios({
            url: `${url}`,
            method,
            headers:{
                'access-control-request-origin':'*',
                'content-type' : 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            },
            data: body
        }).catch(err => {
            console.log(err);
        });
    }
    
    logout=()=> {
        mgr.signoutRedirect();
    }
    render() {
        return (
          <div>
                <button id="login" onClick={this.login}>Login</button>
                <button id="api" onClick={this.api}>Call API</button>
                <button id="logout" onClick={this.logout}>Logout</button>

                <pre id="results"></pre>

               
          </div>
        );
      }
}