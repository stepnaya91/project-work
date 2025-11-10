import { baseApi } from './api';

export const userApi = baseApi.injectEndpoints({
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