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
        }, ProductFilters>({
        query: (filters) => {
        const params = new URLSearchParams();
            console.log("filters:");
            console.log(filters);
            // Преобразуем фильтры в query-параметры
            if (filters.pagination) {
                params.append("pagination",JSON.stringify({
                    pageSize: filters.pagination.pageSize,
                    pageNumber: filters.pagination.pageNumber
                }))
            }
            if (filters.sorting) {
                params.append("sorting",JSON.stringify({
                    pageSize: filters.sorting.field,
                    pageNumber: filters.sorting.type
                }))
            }

            if (filters.name) params.append('name', filters.name);
            if (filters.ids) params.append('ids', filters.ids.join(','));
            if (filters.categoryIds) params.append('categoryIds', filters.categoryIds.join(','));
            
            // Даты фильтры, если они есть
            if (filters.createdAt) {
                params.append("createdAt",JSON.stringify({
                    createdAt_gte: filters.createdAt.gte,
                    createdAt_lte: filters.createdAt.lte
                }))
            }
            if (filters.updatedAt) {
                params.append("createdAt",JSON.stringify({
                    updatedAt_gte: filters.updatedAt.gte,
                    updatedAt_lte: filters.updatedAt.lte
                }))
            }
            console.log(params);
            // Возвращаем запрос с параметрами
            return `products?${params.toString()}`;           
        }, 
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