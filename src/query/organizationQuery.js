// export const createOrganizationQuery = `
//     mutation OrganizationMutation(
//         $name:String!,
//         $email:String!,
//         $category:String!,
//         $employees:String!,
//         $password:String!,
//         $number:String!
//     ) {
//           createOrganization(name:$name,email:$email,category:$category,number:$number,employees:$employees,password:$password){
//             _id
//             name
//             email
//             category
//             employees
//             password
//             number
//             plan
//             planStatus
//           }
//     }
// `;

// export const loginOrganizationQuery = `
//     mutation loginOrganizationMutation(
//         $email:String!,
//         $password:String!,
//     ) {
//           login(email:$email,password:$password){
//             _id
//             name
//             email
//             category
//             employees
//             password
//             number
//             plan
//             planStatus,
//             token
//           }
//     }
// `;

// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const createOrganization = createAsyncThunk(
//   "createOrganization",
//   async ({ data, onCreateOrganization }) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/auth/signup",
//         data,
//         {
//           headers: { "Content-Type": "application/json" },
//         },
//       );

//       if (response.status === 201) {
//         onCreateOrganization();
//       }

//       return response.data;
//     } catch (error) {
//       console.error("Signup failed:", error.response?.data || error.message);
//       throw error;
//     }
//   },
// );

export const signupQuery = `
mutation SignupMutation(
    $name: String!,
    $email: String!,
    $password: String!,
    $number: String!,
    $employees: String!,
    $category: String!
) {
    signup(
        name: $name,
        email: $email,
        password: $password,
        number: $number,
        employees: $employees,
        category: $category
    ) {
        message
        token
        user {
            id
            name
            email
            number
            employees
            category
        }
    }
}
`;
export const loginQuery = `
mutation LoginMutation(
    $email: String!,
    $password: String!
) {
    login(
        email: $email,
        password: $password
    ) {
        message
        token
        user {
            id
            name
            email
            number
            employees
            category
        }
    }
}
`;
