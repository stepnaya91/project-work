import React from "react"
import { ProductPreview } from "../ProductPreview/ProductPreview"
import "./Basket.css"
import { Button } from "../../Button/Button"
import { useDispatch } from "react-redux"
import { basketActions } from "../../../store/slices/basket"
import { useTheme } from "src/shared/providers/ThemeProvider"
import { useLanguage } from "src/shared/providers/LanguageProvider"


export const Basket: React.FC<Product> = ({id,name, category,price, desc, photo, commandId, createdAt, updatedAt, oldPrice}) => {
    const {theme} = useTheme();
    const {t} = useLanguage();
    const className="basket-div-"+theme;
    const buttonClassName = "delete-button-"+theme; 
    const dispatch = useDispatch();

    const deleteItem = () => dispatch(basketActions.removeItem({id}))

    
    return (
        <>
            <div className={className}>
                <ProductPreview 
                    id={id} 
                    name={name} 
                    category={category}  
                    price={price} 
                    desc={desc} 
                    photo={photo}
                    commandId={commandId}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                    oldPrice={oldPrice}
                    />
                <div className="delete-button-div">
                    <Button className={buttonClassName} label={t('deleteButtonName')} onClick={deleteItem}/>
                </div>
            </div>
        </>
    )
}

