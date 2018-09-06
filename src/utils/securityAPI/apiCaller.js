import axios from 'axios';
import  'babel-polyfill';
import  Oidc from 'oidc-client';
import * as Config from 'redux/categoryManagement/constants/Config';
const config = {
    authority: "https://identityserverphucthinh.azurewebsites.net", 
    client_id: "js",
    redirect_uri: `http://localhost:5003/callback.html`,
    silent_redirect_uri: `http://localhost:5003/silent-renew.html`,
    response_type: "id_token token",
    scope:"openid profile api1",
    post_logout_redirect_uri :`http://localhost:5003/callback.html`,
};
const mgr = new Oidc.UserManager(config);
export const login=()=> {
    mgr.signinRedirect();
}
export const callApis=(endpoint,method='GET',body)=> {
   return mgr.getUser().then((user) =>{
        return axios({
            url: `${Config.API_URL}/${endpoint}`,
            method,
            headers:{
                'access-control-request-origin':'*',
                'content-type' : 'application/json',
                'Authorization': 'Bearer ' + user.access_token,
            },
            data: body
        }).catch(err => {
            console.log("lephong:"+err);
        });
    });
}

export const logout=()=> {
    mgr.signoutRedirect();
}

