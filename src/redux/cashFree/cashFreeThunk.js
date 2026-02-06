import { createAsyncThunk } from '@reduxjs/toolkit'; // pending, fulfilled, rejected
import { checkOrderStatus, createOrderForOrganization, orderPayUrl } from '../../query/cashFreeUpiQuery';
import request from '../../request';

export const createOrderUpi = createAsyncThunk(
    'create CashFree Order',
    async ({ data, onCreateOrder }) => {
        const response = await request({ variables: data, query: createOrderForOrganization, operationName: 'CashFreeMutation' });
        if (response?.data?.data) {
            onCreateOrder();
        }
        return response;
    }
);

export const createOrderPayUrl = createAsyncThunk(
    'create CashFree Order pay url',
    async ({ data, onOrderPayUrlCreated }) => {
        const response = await request({ variables: data, query: orderPayUrl, operationName: 'orderPayUrlMutation' });
        if (response?.data?.data) {
            onOrderPayUrlCreated(response?.data?.data?.orderPay?.url);
        }
        return response;
    }
);

export const checkPaymentStatus = createAsyncThunk(
    'check CashFree Order pay status',
    async (data) => {
        const response = await request({ variables: data, query: checkOrderStatus, operationName: 'checkOrderStatusMutation' });
        return response;
    }
);
