import React from "react"
import { Link, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "src/shared/providers/ThemeProvider";
import { Button } from "../Button/Button";

interface NavButtonProps{
    label:string,
    linkTo:string,
    className?:string,
    onClick?: () => void;
}

export const NavButton: React.FC<NavButtonProps> = ({label, linkTo, className, ...props}:NavButtonProps) => {
    const {theme} = useTheme();        
    const location = useLocation();
    return (
        <div className={className}>
            <Link to={linkTo} state={{ background: location }}><Button className={"button-"+theme}  label={label}/></Link>
            <Outlet />
        </div>  
    )
}


 