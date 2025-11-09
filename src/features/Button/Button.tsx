import React from "react"
import { useTheme } from "src/shared/providers/ThemeProvider";

interface ButtonProps{
    label:string,
    className?:string,
    onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({label, ...props}:ButtonProps) => {
    const {theme} = useTheme();
    const className = "button-"+theme;
    return (
        <button type="button" className={className} {...props}>{label}</button>
    )
}