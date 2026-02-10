import { createSlice } from '@reduxjs/toolkit';
import { signup ,login} from './organizationThunk';
import { toast } from 'react-toastify';

const initialState = {
    userInfo: []
};

export const organizationSlice = createSlice({
    name: 'user',
    initialState,

    extraReducers: (builder) => {   
        builder
          .addCase(signup.pending, (state) => {
            state.loading = true;
          })
          .addCase(signup.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload) {
              localStorage.setItem(
                "createdUser",
                JSON.stringify(action.payload),
              );
              toast.success("Organization created successfully");
            }
          })
          .addCase(signup.rejected, (state, action) => {
            state.loading = false;
            if (action.payload?.message) {
              toast.error(action.payload?.message);
            }
          })
          .addCase(login.pending, (state) => {
            state.loading = true;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.loading = false
            if (action.payload) {
              localStorage.clear();
              localStorage.setItem("user", JSON.stringify(action.payload));
              localStorage.setItem("token", action.payload.token);
              toast.success("Login successfully");
            }
          })
          .addCase(login.rejected, (state, action) => {
            state.loading = false
            if (action.payload?.message) {
              toast.error(action.payload.message);
            }
          });
    }
});
export const { addUser } = organizationSlice.actions;
export default organizationSlice.reducer;
// Local frontend state only → use reducers (like your current canbanTasks).
// Async backend connection → use extraReducers + builder to handle the API results.
// Builder:chainable API it makes easy to define multiple cases for async actions (pending, fulfilled, rejected) 
// without writing separate switch statements .
//
// / export const organizationSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder

//       // ===== SIGNUP =====
//       .addCase(createOrganization.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(createOrganization.fulfilled, (state, action) => {
//         state.loading = false;

//         if (action.payload?.user) {
//           localStorage.setItem('createdUser', JSON.stringify(action.payload.user));
//           toast.success(action.payload.message || 'Organization created successfully');
//         }
//       })

//       .addCase(createOrganization.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;

//         toast.error(
//           action.payload?.message || 'Organization creation failed'
//         );
//       })

//       // ===== LOGIN =====
//       .addCase(loginOrganization.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(loginOrganization.fulfilled, (state, action) => {
//         state.loading = false;

//         if (action.payload?.token) {
//           localStorage.setItem('user', JSON.stringify(action.payload.user));
//           localStorage.setItem('token', action.payload.token);
//           toast.success(action.payload.message || 'Login successful');  
//         }
//       })

//       .addCase(loginOrganization.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;

//         toast.error(
//           action.payload?.message || 'Login failed'
//         );
//       });
//   }
// });


