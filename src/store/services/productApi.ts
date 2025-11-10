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
    }),
    getProduct: builder.query({
        query: (id:string) => `products/${id}`
    }),
    //Создает новую сущность        
    postProduct: builder.mutation<Product, CreateProduct>({
        query: (product) => ({
        url: 'products',
        method: 'POST',
        body: product,
        }),
    }),
    deleteProduct: builder.mutation({
        query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
        body: id,    
        })
    }),
    updateProduct: builder.mutation({
        query: ({id, params}) => ({
        url:`products/${id}`,
        method: 'PUT',
        body: params    
        })
    })
    }),
});

export const { useGetProductsQuery, useGetProductQuery, usePostProductMutation, useDeleteProductMutation, useUpdateProductMutation } = productApi; 