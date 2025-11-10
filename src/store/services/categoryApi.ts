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
        }),
        getCategory: builder.query({
            query: (id:string) => `categories/${id}`
        }),
        //Создает новую сущность        
        postCategory: builder.mutation<Category, CreateCategoryParams>({
            query: (body) => ({
            url: 'categories',
            method: 'POST',
            body: body,
            }),
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
            url: `categories/${id}`,
            method: 'DELETE',
            body: id,    
            })
        }),
        updateCategory: builder.mutation({
            query: ({id, params}) => ({
            url:`categories/${id}`,
            method: 'PUT',
            body: params    
            })
        })
    }),
});

export const { useGetCategoriesQuery, useGetCategoryQuery,  usePostCategoryMutation, useUpdateCategoryMutation } = categoryApi; 