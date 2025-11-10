import React from "react"
//import { getRandomProduct } from "../../components/ProductCreator"
import { ProductList } from "../../features/ProductList/ProductList"
import { Button } from "../../features/Button/Button"
import "./ProductListAddButton.css"
//import { SliderRange } from "../../components/market/SliderRange"
import { Link, Outlet, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useTheme } from "src/shared/providers/ThemeProvider"
import { useGetProductsQuery } from "src/store/services/productApi"
import { NavButton } from "src/features/NavButton/NavButton"


interface ProductProps{
    products: Product[]
}

function withAddButton (ProductListComponent: React.FC<ProductProps>) {

    return function AddButtonComponent() {
        const {theme} = useTheme();
        //const [value, onChange] = useState<number>(5000);
        const location = useLocation();

        const { data: products, isLoading, isError, error } = useGetProductsQuery();  
        console.log(products);      
        const dispatch = useDispatch();
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
