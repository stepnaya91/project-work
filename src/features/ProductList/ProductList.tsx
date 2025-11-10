import React, { memo, useMemo } from "react"
import { Basket } from "./Basket/Basket"
import "./ProductList.css"

export interface ProductListProps {
    products: Product[]
}

export const ProductList: React.FC<ProductListProps>= ({products}) => {
    if (products.length==0)
        return <p>Список товаров пуст</p>;

    const productItems = useMemo(() => products.map((product)=>{
        return <Basket 
            key={product.id} 
            name={product.name} 
            price={product.price} 
            category={product.category} 
            desc={product.desc} 
            id={product.id} 
            commandId={product.commandId} 
            createdAt={product.createdAt}
            updatedAt={product.updatedAt}

            />
    }),[products])
    return (
        <div>
            <h1>Список товаров</h1>
            <ul className="product-list-ul">
                {productItems}
            </ul>          
        </div>
    )
}

export default memo(ProductList)