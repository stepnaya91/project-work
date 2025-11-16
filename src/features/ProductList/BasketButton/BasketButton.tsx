import "./BasketButon.css"
import "../../../app/App.css"
import React, { memo } from "react"
import { Button } from "../../Button/Button"
import { useDispatch, useSelector } from "react-redux"
import { basketActions, basketSelectors } from "../../../store/slices/basket"
import { useLanguage } from "src/shared/providers/LanguageProvider"
import { useTheme } from "src/shared/providers/ThemeProvider"


export const BasketButton: React.FC<Product> = ({id,name, category,price,desc,photo,createdAt,updatedAt,commandId,oldPrice}:Product) => {
    const {t} = useLanguage();
    const {theme} = useTheme();

    const dispatch = useDispatch();
    const pushToBasket = () => dispatch(basketActions.addItem({product:{
        id: id, category: category, name: name, price: price, desc: desc, photo: photo,
        createdAt: createdAt,
        updatedAt: updatedAt,
        commandId: commandId
    }}))
    const count = useSelector(basketSelectors.getCountById(id));
    const increase = () => dispatch(basketActions.increaseProductCount({id}));
    const decrease = () => dispatch(basketActions.decreaseProductCount({id}));
    
    if (count===0) {
        return (
            <Button label={t('basketButtonName')} onClick={pushToBasket}/>
        )

    }
    return (
        <div className="basket-buttons">
            <Button className={"basket-button-left button-"+theme} label="-" onClick={decrease}/>
            <input className={"basket-input-"+theme} value={count}></input>
            <Button className={"basket-button-right button-"+theme} label="+" onClick={increase}/>
        </div>
    )
}

export default memo(BasketButton);