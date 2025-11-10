import React from "react"
import { BasketButton } from "../BasketButton/BasketButton"
import "./ProductPreview.css"
import { Link, useLocation } from "react-router-dom"

export const ProductPreview: React.FC<Product> = ({id,name, category,price,desc,photo,commandId,createdAt,updatedAt,oldPrice}) => {
    const location = useLocation();    
    
    return(
        <>
           <div className="preview-div">
                <Link to={"/EditProduct/"+id}  state={{ background: location }}><h2>{name}</h2></Link>
                <p>Цена: {price}</p>
                <p>Категория: {category.name}</p>
                <BasketButton id={id} name={name} category={category} price={price} desc={desc} photo={photo} commandId={commandId} createdAt={createdAt} updatedAt={updatedAt} oldPrice={oldPrice}/>
            </div>
        </>
    )
}