import React, { useCallback, useEffect, useRef, useState } from "react"
import { ProductList } from "../../features/ProductList/ProductList"
import "./ProductListAddButton.css"
import { useGetProductsQuery } from "src/store/services/productApi"
import { NavButton } from "src/features/NavButton/NavButton"
import { Button } from "src/features/Button/Button"


interface ProductProps{
    products: Product[]
}

function withAddButton (ProductListComponent: React.FC<ProductProps>) {

    return function AddButtonComponent() {   
        const pageSize = 10;
        const [pageNumber, setPageNumber] = useState(1);
        const [allProducts, setAllProducts] = useState<Product[]>([]);

        const filters = {
            pagination: {
                pageSize,
                pageNumber,
            },
            sorting: {
                type: "ASC" as const,
                field: "name" as const,
            },
        };        

        const { data: products, isLoading, isError, error } = useGetProductsQuery(filters); 

        useEffect(() => {
        if (products?.data) {
            setAllProducts(prev=>[...prev, ...products.data]);
        }
        }, [products]);

        const loadMore = useCallback(() => {

            if(allProducts.length%pageSize<=0)
                setPageNumber(prev=>prev+1);
        }, [pageNumber]);

        if (isLoading) return <p>Загрузка списка товаров...</p>;
        if (isError){
            let errorMessage = "Ошибка загрузки списка товаров";
            if ('data' in error && error.data) {
                if (Array.isArray((error.data as any).errors) && (error.data as any).errors.length > 0) {
                    errorMessage = (error.data as any).errors[0].message || errorMessage;
                } else if ((error.data as any).message) {
                    errorMessage = (error.data as any).message;
                }
            } else if ('error' in error && error.error) {
                errorMessage = error.error;
            }
            return <p>{errorMessage}</p>;
        }
        return(
            <> 
                <div className="product-list-div">               
                    <div className="add-div">
                        <ProductListComponent products={allProducts}/>
                        <div className="product-list-actions">
                            <NavButton linkTo="/EditProduct" label="Добавить товар"/>     
                            <Button label="Загрузить еще" onClick={loadMore}/>   
                            <NavButton linkTo="/Upload" label="Загрузка файла"/>
                        </div>       
                    </div>      
                </div>       
            </>
        )
    }
}

export const ProductListAddButton = withAddButton(ProductList)
