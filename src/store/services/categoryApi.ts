import { baseApi } from './api';

type CreateCategoryParams = {
  name: string;
  photo?: string;
};

export const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<{
            data: Category[];
            pagination: {
                pageSize: number;
                pageNumber: number;
            };
            sorting: {
                type: string;
                field: string;
            };
            },void>({
            query: () => 'categories', 
            providesTags: ["Categories"],
        }),
        getCategory: builder.query({
            query: (id:string) => `categories/${id}`
        }),     
        postCategory: builder.mutation<Category, CreateCategoryParams>({
            query: (body) => ({
            url: 'categories',
            method: 'POST',
            body: body,
            }),
            invalidatesTags: ["Categories"],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
            url: `categories/${id}`,
            method: 'DELETE',
            body: id
            }),    
            invalidatesTags: ["Categories"],
        }),
        updateCategory: builder.mutation({
            query: ({id, params}) => ({
            url:`categories/${id}`,
            method: 'PUT',
            body: params    
            }),    
            invalidatesTags: ["Categories"],
        })
    }),
});

export const { useGetCategoriesQuery, useGetCategoryQuery,  usePostCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoryApi; 