import React, { memo, useMemo } from "react"
import { useSelector } from "react-redux"
import { basketSelectors } from "src/store/slices/basket"
import { ProductCard } from "src/features/ProductList/ProductCard/ProductCard"

export const ProductListInBasket: React.FC = () => {
    const items = useSelector(basketSelectors.get);
    const productItems = useMemo(() => items.map((product)=>(
        <ProductCard key={product.id}  name={product.name} price={product.price} category={product.category} desc={product.desc} id={product.id} createdAt={product.createdAt} updatedAt={product.updatedAt} commandId={product.commandId}/>
    )),[items])

    if (productItems.length==0)
        return <p>В корзине пока нет товаров</p>

    return (
        <div>
            <h1>Список товаров</h1>
            <ul className="product-list-ul">
                {productItems}
            </ul>          
        </div>
    )
}

export default memo(ProductListInBasket)