import { createSlice } from '@reduxjs/toolkit';
import { createOrganization, loginOrganization } from './organizationThunk';
import { toast } from 'react-toastify';

const initialState = {
    userInfo: []
};

export const organizationSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrganization.pending, (state, action) => {

            });
        builder
            .addCase(createOrganization.fulfilled, (state, action) => {
                if (action.payload?.data?.data) {
                    localStorage.setItem('createdUser', JSON.stringify(action.payload?.data?.data?.createOrganization));
                    toast.success('Organization created successfully');
                }
                if (action.payload?.data.errors?.length && action.payload?.data?.errors[0]?.message) {
                    toast.error(action.payload?.data?.errors[0]?.message);
                }
            });
        builder
            .addCase(createOrganization.rejected, (state, action) => {
                if (action.payload?.data.errors?.length && action.payload?.data?.errors[0]?.message) {
                    toast.error(action.payload?.data?.errors[0]?.message);
                }
            });
        builder
            .addCase(loginOrganization.pending, (state, action) => {

            });
        builder
            .addCase(loginOrganization.fulfilled, (state, action) => {
                if (action.payload?.data?.data?.loginUser) {
                    localStorage.clear();
                    localStorage.setItem('user', JSON.stringify(action.payload?.data?.data?.loginUser));
                    localStorage.setItem('token', action.payload?.data?.data?.loginUser?.token);
                    toast.success('Login successfully');
                }
                if (action.payload?.data.errors?.length && action.payload?.data?.errors[0]?.message) {
                    toast.error(action.payload?.data?.errors[0]?.message);
                }
            });
        builder
            .addCase(loginOrganization.rejected, (state, action) => {
                if (action.payload?.data.errors?.length && action.payload?.data?.errors[0]?.message) {
                    toast.error(action.payload?.data?.errors[0]?.message);
                }
            });
    }
});
export const { addUser } = organizationSlice.actions;
export default organizationSlice.reducer;
