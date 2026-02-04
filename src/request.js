import axios from 'axios';
function AuthToken () {
    const token = sessionStorage.getItem('authToken') || localStorage.getItem('authToken');
    if (token !== 'undefined') {
        return JSON.parse(token);
    }
    return false;
}
export default function request (data) {
    const endpoint = 'http://localhost:3000/dev/graphql';
    const headers = {
        'content-type': 'application/json'
    };
    if (AuthToken()) {
        headers.Authorization = AuthToken();
    }
    const graphqlQuery = {
        operationName: data.operationName,
        query: data.query,
        variables: data.variables
    };

    const response = axios({
        url: endpoint,
        method: 'post',
        headers,
        data: graphqlQuery
    });

    return response;
}
