import { Order } from 'src/entities/Order';
import { baseApi } from './api';


export const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getOrders: builder.query<{
        data: Order[];
        pagination: {
            pageSize: number;
            pageNumber: number;
            total: number;
        };
        sorting: {
            type: 'ASC' | 'DESC';
            field: 'id' | 'createdAt' | 'updatedAt' | 'name';
        }
        }, OrderFilters>({
        query: (filters) => {
        const params = new URLSearchParams();
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

            if (filters.productIds) params.append('productIds', filters.productIds.join(','));
            if (filters.ids) params.append('ids', filters.ids.join(','));
            if (filters.userId) params.append('userId', filters.userId);
            if (filters.status) params.append('userId', filters.status);
            
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
            return `orders?${params.toString()}`;           
        }, 
        providesTags: ["Orders"]
    }),
    getOrder: builder.query({
        query: (id:string) => `orders/${id}`,
        providesTags: ["Orders"]
    }),
    //Создает новую сущность        
    postOrder: builder.mutation<Product, CreateProduct>({
        query: (product) => ({
        url: 'products',
        method: 'POST',
        body: product,
        }),
        invalidatesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation({
        query: (id) => ({
        url: `orders/${id}`,
        method: 'DELETE',
        body: id,  
        }),
        invalidatesTags: ["Orders"],
    }),
    }),
});

export const { useGetOrderQuery, useGetOrdersQuery, usePostOrderMutation, useDeleteOrderMutation } = orderApi; 