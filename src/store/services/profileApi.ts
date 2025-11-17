import { Profile } from '../types/Profile';
import { baseApi } from './api';

export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<Profile,void>({
            query: () => 'profile', 
            providesTags: ["Profile"]
        }),        
        postProfile: builder.mutation({
            query: (profile) => ({
            url: 'profile',
            method: 'POST',
            body: profile,
            }),
            invalidatesTags: ["Profile"],
        })
    }),
});

export const { useGetProfileQuery, usePostProfileMutation } = profileApi; 