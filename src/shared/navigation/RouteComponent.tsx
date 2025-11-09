import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Profile } from "../../../src/pages/Profile/Profile";
//import { Home } from "src/components/common/Home/Home";
//import { ProductAdd } from "src/components/market/ProductAdd/ProductAdd";
//import { Modal } from "src/pages/Modal/Modal";
//import { ProductListAddButton } from "src/pages/ProductListAddButton/ProductListAddButton";
//import ProductListInBasket from "src/pages/ProductListInBasket/ProductListInBasket";
import { ProtectedRoute } from "./ProtectedRoute";
//import { AdminRoute } from "./AdminRoute";

export function RouteComponent(){
    const location = useLocation();
    const background = location.state && location.state.background;
    return(
        <ProtectedRoute>        
                <Routes location={background || location}>
                    <Route path="/Profile" element={<Profile/>}></Route>
                </Routes>   
                {background && (
                    <Routes>
                    </Routes>
                )}  
        </ProtectedRoute>      
    )
}
