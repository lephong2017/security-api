import axios from 'axios';
import  'babel-polyfill';
import  Oidc from 'oidc-client';
import * as Config from 'redux/categoryManagement/constants/Config';
const config = { 
    authority: "https://identityserverphucthinh.azurewebsites.net", 
    client_id: "js",
    redirect_uri: `https://security-api-react-identity.herokuapp.com/callback.html`,
    silent_redirect_uri: `https://security-api-react-identity.herokuapp.com/silent-renew.html`,
    response_type: "id_token token",
    scope:"openid profile api.read api.write",
    post_logout_redirect_uri :`https://security-api-react-identity.herokuapp.com/callback.html`,
};
const mgr = new Oidc.UserManager(config);
export const login=()=> {
    mgr.signinRedirect();
}
export const callApis= (endpoint,method='GET',body)=> {
   return mgr.getUser().then((user) =>{
         return  axios({
            url: `${Config.API_URL}/${endpoint}`,
            method,
            headers:{
                'access-control-request-origin':'*',
                'content-type' : 'application/json',
                'Authorization': 'Bearer ' + user.access_token,
            },
            data: body
        }).then(a =>{
            // console.log(a);
            return a;
        }).catch(err => {
    //    console.log(user.access_token);
    //    console.log("lephong:"+err);
        });
    });
}

export const logout=()=> {
    mgr.signoutRedirect();
}

