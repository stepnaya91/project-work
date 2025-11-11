import { baseApi } from './api';

export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getProducts: builder.query<{
        data: Product[];
        pagination: {
            pageSize: number;
            pageNumber: number;
            total: number;
        };
        sorting: {
            type: string;
            field: string;
        };
        },void>({
        query: () => 'products', 
        providesTags: ["Products"]
    }),
    getProduct: builder.query({
        query: (id:string) => `products/${id}`,
        providesTags: ["Products"]
    }),
    //Создает новую сущность        
    postProduct: builder.mutation<Product, CreateProduct>({
        query: (product) => ({
        url: 'products',
        method: 'POST',
        body: product,
        }),
        invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
        query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
        body: id,  
        }),
        invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
        query: ({id, params}) => ({
        url:`products/${id}`,
        method: 'PUT',
        body: params, 
        }),
        invalidatesTags: ["Products"],
    })
    }),
});

export const { useGetProductsQuery, useGetProductQuery, usePostProductMutation, useDeleteProductMutation, useUpdateProductMutation } = productApi; 