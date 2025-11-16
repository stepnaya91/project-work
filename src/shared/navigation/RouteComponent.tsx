import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Profile } from "../../../src/pages/Profile/Profile";
import { ProtectedRoute } from "./ProtectedRoute";
import { ProductListAddButton } from "src/pages/Home/ProductListAddButton";
import { Modal } from "src/pages/Modal/Modal";
import { ProductAdd } from "src/features/ProductAdd/ProductAdd";
import { CategoryList } from "src/pages/CategoriesList/CategoryList";
import { CategoryAdd } from "src/features/Categories/CategoryAdd/CategoryAdd";
import BasketList from "src/pages/BasketList/BasketList";

export function RouteComponent(){
    const location = useLocation();
    const background = location.state && location.state.background;
    return(
        <ProtectedRoute>        
                <Routes location={background || location}>                    
                    <Route path="/" element={<ProductListAddButton/>}/>
                    <Route path="/Profile" element={<Modal withHeader={false}><Profile/></Modal>}></Route>
                    <Route path="/Categories" element={<CategoryList/>}></Route>
                    <Route path="/EditCategory" element={<Modal ><CategoryAdd/></Modal>}></Route>
                    <Route path="/EditCategory/:categoryId" element={<Modal><CategoryAdd/></Modal>}></Route>
                    <Route path="/EditProduct" element={<Modal><ProductAdd/></Modal>} />  
                    <Route path="/EditProduct/:productId" element={<Modal><ProductAdd/></Modal> } /> 
                    <Route path="/Basket" element={<BasketList/>}></Route>
                </Routes>   
                {background && (
                    <Routes>
                        <Route path="/Profile" element={<Modal withHeader={false}><Profile/></Modal>}></Route>
                        <Route path="/EditCategory" element={<Modal><CategoryAdd/></Modal>}></Route>
                        <Route path="/EditCategory/:categoryId" element={<Modal><CategoryAdd/></Modal>}></Route>
                        <Route path="/EditProduct" element={<Modal><ProductAdd/></Modal>} /> 
                        <Route path="/EditProduct/:productId" element={<Modal><ProductAdd/></Modal>} /> 
                    </Routes>
                )}  
        </ProtectedRoute>      
    )
}
