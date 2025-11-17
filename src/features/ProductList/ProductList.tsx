import React, { memo, useMemo } from "react"
import "./ProductList.css"
import { ProductCard } from "./ProductCard/ProductCard"

export interface ProductListProps {
    products: Product[]
}

export const ProductList: React.FC<ProductListProps>= ({products}) => {
    if (products.length==0)
        return <p>Список товаров пуст</p>;
    const productItems = useMemo(() => products.map((product)=>{
        if(product.category){
        return <ProductCard 
            key={product.id} 
            name={product.name} 
            photo={product.photo??product.photo}
            price={product.price} 
            category={product.category} 
            desc={product.desc} 
            id={product.id} 
            commandId={product.commandId} 
            createdAt={product.createdAt}
            updatedAt={product.updatedAt}

            />}
        else{console.log(`Товар ${product.name} из удаленной категории`)}
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