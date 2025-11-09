import React from "react";
import "../../app/App.css"
import { Button } from "../Button/Button";
import { useTheme } from "../../../src/shared/providers/ThemeProvider";
import { useLanguage } from "../../../src/shared/providers/LanguageProvider";

export const ToggleTheme: React.FC = () => {
    const {theme, toggleTheme}  = useTheme(); 
    const {t} = useLanguage();
    const className = "button-"+theme;
    return(
        <Button onClick={toggleTheme} className={className} label={t('changeTheme')}/>

    )
}