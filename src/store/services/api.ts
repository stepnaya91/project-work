import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from 'src/constants';
import { AppState } from '..';

export const baseApi = createApi({
    reducerPath: 'api', // общий путь в state
    baseQuery: fetchBaseQuery({ 
        baseUrl: URL,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as AppState).token;
            if (token)
                headers.set('Authorization', `Bearer ${token}`);
            return headers;
        }
    }), 
    tagTypes: ["Products", "Categories","Orders","Profile"],
    endpoints: () => ({}), 
})