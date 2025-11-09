import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from 'src/constants';

export const userApi = createApi({
    reducerPath: 'userApi', 
    baseQuery: fetchBaseQuery({ baseUrl: URL }), 
    endpoints: (builder) => ({
    signup: builder.mutation({
        query: (user) => ({
        url: 'signup',
        method: 'POST',
        body: user,
        }),
    }),
    signin: builder.mutation({
        query: (user) => ({
        url: 'signin',
        method: 'POST',
        body: user,
        }),
    }),
    }),
});

export const { useSignupMutation, useSigninMutation } = userApi; 