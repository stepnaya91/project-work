import React from "react"
import { ProductList } from "../../features/ProductList/ProductList"
import "./ProductListAddButton.css"
//import { SliderRange } from "../../components/market/SliderRange"
import { useGetProductsQuery } from "src/store/services/productApi"
import { NavButton } from "src/features/NavButton/NavButton"


interface ProductProps{
    products: Product[]
}

function withAddButton (ProductListComponent: React.FC<ProductProps>) {

    return function AddButtonComponent() {
        const { data: products, isLoading, isError, error } = useGetProductsQuery();  
  
        //const addItem = () => dispatch(productsActions.add(/*{product:getRandomProduct()}*/));    

        //const filteredItems=products.filter((product: Product) => {
        //            return product.price <= value;
        //        });
        if (isLoading) return <p>Загрузка...</p>;
        if (isError){
            console.log(error);      
            return <p>Ошибка загрузки товаров</p>;
        }


        return(
            <>                
                <div className="add-div">
                    <ProductListComponent products={products.data}/>
                    <NavButton linkTo="/EditProduct" label="Добавить товар"/>               
                </div>                
            </>
        )
    }
}

export const ProductListAddButton = withAddButton(ProductList)
