import React,{ FC } from "react";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Auth from "../../../src/pages/Auth/Auth";
import { Layout } from "../../../src/features/Layout/Layout";
import { RouteComponent } from "./RouteComponent";
export type NavigationProps = {
  children: React.ReactNode;
}

export const Navigation: FC<NavigationProps> = ({ children }) => {
 
    return(
        <BrowserRouter>
            <Layout>
                {children}
                <Routes>
                    <Route path="/Auth" element={<Auth/>}></Route>
                    <Route path="*" element = {<RouteComponent/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    )
};