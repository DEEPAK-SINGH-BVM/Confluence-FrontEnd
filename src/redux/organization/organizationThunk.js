import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import { 
  // createOrganizationQuery, loginOrganizationQuery, 
  loginQuery, signupQuery } from '../../query/organizationQuery';

// export const createOrganization = createAsyncThunk(
//   "createOrganization",
//   async ({ data, onCreateOrganization }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:9000/signup",
//         data,
//         { headers: { "Content-Type": "application/json" } },
//       );

//       onCreateOrganization(); // success callback
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   },
// );

// export const loginOrganization = createAsyncThunk(
//   "loginOrganization",
//   async ({ data, onLoginOrganization }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:9000/login",
//         data,
//         { headers: { "Content-Type": "application/json" } },
//       );

//       if (response.data?.token) {
//         localStorage.setItem("token", response.data.token);
//       }

//       onLoginOrganization();
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   },
// );

import request from '../../request';
// export const createOrganization = createAsyncThunk(
//     'create Organization',
//     async ({ data, onCreateOrganization }) => {
//         const response = await request({ variables: data, query: createOrganizationQuery, operationName: 'OrganizationMutation' });
//         if (response?.data?.data) {
//             onCreateOrganization();
//         }
//         return response;
//     }
// );

// export const loginOrganization = createAsyncThunk(
//     'login Organization',
//     async ({ data, onLoginOrganization }) => {
//         const response = await request({ variables: data, query: loginOrganizationQuery, operationName: 'loginOrganizationMutation' });
//         if (response?.data?.data) {
//             onLoginOrganization();
//         }
//         return response;
//     }
// );
export const signup = createAsyncThunk("signup", async ({ data, onSignup }) => {
  const response = await request({
    variables: data,
    query: signupQuery,
    operationName: "SignupMutation",
  });

  const signupData = response?.data?.data?.signup;
  if (signupData) onSignup?.();
  return signupData;
});
  
export const login = createAsyncThunk("login", async ({ data, onLogin }) => {
  console.log('Data:',data);
  console.log('LoginQuery',loginQuery);
  
  const response = await request({
    variables: data,
    query: loginQuery,
    operationName: "LoginMutation",
  });
  console.log('Response:',response);
  
  const loginData = response?.data?.data?.login;
  console.log('LoginData:',loginData);
  
  if (loginData) onLogin?.();
  return loginData;
});


