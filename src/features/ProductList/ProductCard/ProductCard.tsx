import React from "react"
import { BasketButton } from "../BasketButton/BasketButton"
import "./ProductCard.css"
import { Link, useLocation } from "react-router-dom"
import { CroppedText } from "src/features/CroppedText/CroppedText"
import { Button } from "src/features/Button/Button"
import { useTheme } from "src/shared/providers/ThemeProvider"
import { useLanguage } from "src/shared/providers/LanguageProvider"
import { useDispatch } from "react-redux"
import { basketActions } from "src/store/slices/basket"

export const ProductCard: React.FC<Product> = ({id,name, category,price,desc,photo,commandId,createdAt,updatedAt,oldPrice}) => {
    const location = useLocation();     
    const {theme} = useTheme();   
    const {t} = useLanguage();
    const className="basket-div-"+theme;
    const buttonClassName = "delete-button-"+theme;     
    const dispatch = useDispatch();

    const deleteItem = () => dispatch(basketActions.removeItem({id}))
    return(
        <>
            <div className={className}>
                <div className="preview-div">
                    <Link to={"/EditProduct/"+id}  state={{ background: location }}><h2>{name}</h2></Link>
                    {photo&&
                    <div>
                        <img
                            src={photo}
                            alt="uploaded"
                            style={{ maxWidth: '200px', maxHeight:'200px', minHeight:'200px', minWidth:'200px'}}
                        />
                    </div>}               
                    <p>Цена: {price}</p>
                    <p>Категория: {category.name}</p>
                    <CroppedText childrenText={desc} opened={false} className="preview-description" />
                </div>
                <div className="delete-button-div">
                    <BasketButton id={id} name={name} category={category} price={price} desc={desc} photo={photo} commandId={commandId} createdAt={createdAt} updatedAt={updatedAt} oldPrice={oldPrice}/>
                    <Button className={buttonClassName} label={t('deleteButtonName')} onClick={deleteItem}/>
                </div>
            </div>
        </>
    )
}