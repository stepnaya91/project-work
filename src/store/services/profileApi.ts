import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from 'src/constants';
import { Profile } from '../types/Profile';
import type { AppState } from '../../store/index'

export const profileApi = createApi({
    reducerPath: 'profileApi', 
    baseQuery: fetchBaseQuery({ 
        baseUrl: URL,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as AppState).token;
            if (token)
                headers.set('Authorization', `Bearer ${token}`);
            return headers;
        }
    }), 
    endpoints: (builder) => ({
    getProfile: builder.query<Profile,void>({
        query: () => 'profile', 
    }),        
    postProfile: builder.mutation({
        query: (profile) => ({
        url: 'profile',
        method: 'POST',
        body: profile,
        }),
    })
    }),
});

export const { useGetProfileQuery, usePostProfileMutation } = profileApi; 