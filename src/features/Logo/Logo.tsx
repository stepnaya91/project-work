import React from 'react'
import imageFile from './MyLogo.svg'



export const Logo: React.FC = () => {
    return(
        <>
            <img src={imageFile}></img>
        </>
    )
}