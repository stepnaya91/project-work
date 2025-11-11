import React, { memo, useMemo } from "react"
import "./BasketList.css"
import { useSelector } from "react-redux"
import { Basket } from "src/features/ProductList/Basket/Basket"
import { basketSelectors } from "src/store/slices/basket"

export const ProductListInBasket: React.FC = () => {
    const items = useSelector(basketSelectors.get);
    const productItems = useMemo(() => items.map((product)=>(
        <Basket key={product.id}  name={product.name} price={product.price} category={product.category} desc={product.desc} id={product.id} createdAt={product.createdAt} updatedAt={product.updatedAt} commandId={product.commandId}/>
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