import axios from 'axios';
import * as Config from 'redux/categoryManagement/constants/Config';

export default function callApi(endpoint, method = 'GET', body) {
    return axios({
        url: `${Config.API_URL}/${endpoint}`,
        method,
        headers:{
            'access-control-request-origin':'*',
            'content-type' : 'application/json',
        },
        data: body
    }).catch(err => {
        console.log(err);
    });
};
