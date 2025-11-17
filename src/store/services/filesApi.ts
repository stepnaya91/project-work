import { baseApi } from './api';

export const filesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({      
        postUpload: builder.mutation({
            query: (body) => ({
                url: 'upload',
                method: 'POST',
                body: body,
            }),
        })
    }),
});

export const { usePostUploadMutation } = filesApi; 