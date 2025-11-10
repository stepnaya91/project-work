import { Profile } from '../types/Profile';
import { baseApi } from './api';

export const profileApi = baseApi.injectEndpoints({
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