import { createAsyncThunk } from '@reduxjs/toolkit';
import { createOrganizationQuery, loginOrganizationQuery } from '../../query/organizationQuery';
import request from '../../request';

export const createOrganization = createAsyncThunk(
    'create Organization',
    async ({ data, onCreateOrganization }) => {
        const response = await request({ variables: data, query: createOrganizationQuery, operationName: 'OrganizationMutation' });
        if (response?.data?.data) {
            onCreateOrganization();
        }
        return response;
    }
);

export const loginOrganization = createAsyncThunk(
    'login Organization',
    async ({ data, onLoginOrganization }) => {
        const response = await request({ variables: data, query: loginOrganizationQuery, operationName: 'loginOrganizationMutation' });
        if (response?.data?.data) {
            onLoginOrganization();
        }
        return response;
    }
);
