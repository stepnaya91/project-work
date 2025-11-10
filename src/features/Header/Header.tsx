import React from "react"
import { Logo } from "../Logo/Logo"
import "./Header.css"
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "../Button/Button";
import { ToggleTheme } from "../ToogleTheme/ToggleTheme";
import { useTheme } from "../../../src/shared/providers/ThemeProvider";
import { ChangeLanguage } from "../ChangeLanguage/ChangeLanguage";
import { useLanguage } from "../../../src/shared/providers/LanguageProvider";
import { tokenActions } from "../../../src/store/slices/token";

export const Header: React.FC = () => {
    const {theme} = useTheme();
    const {t} = useLanguage();
    const className="header-div-"+theme;
    const dispatch = useDispatch();
    const logout = () => {dispatch(tokenActions.empty())};
    return(        
        <div className={className}>
            <div className="header-div-logo">
                <Logo/>
            </div>
            <div className="menu-div">
                <NavLink className={"link link-"+theme} to="/">
                    {t('home')}
                </NavLink>
                <NavLink className={"link link-"+theme} to="/Profile">
                    {t('profile')}
                </NavLink>
                <NavLink className={"link link-"+theme} to="/Categories">
                    {t('categories')}
                </NavLink>
                <NavLink className={"link link-"+theme} to="/Basket">
                    {t('addToCart')}
                </NavLink>
            </div>
            <div>
                <Button label="Выйти" onClick={logout}></Button>
            </div>
            <div className="header-div-right">
                <div>
                    <ToggleTheme/>
                </div>
                <div>
                    <ChangeLanguage/>
                </div>
            </div>
        </div>
    )
}