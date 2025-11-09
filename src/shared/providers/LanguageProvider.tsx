import React, { createContext, ReactNode, useContext, useState } from "react"
import i18next from "./i18n/i18next";

interface LanguageContextType {
    language: string;
    changeLanguage: (lang: string) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

type LanguageProviderProps = {
    children: ReactNode
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    
    if(context === null) { throw new Error("useLanguage must be used within a LanguageProvider"); }

    return context;
}

export const LanguageProvider = ({children}: LanguageProviderProps) => {
    const [language, setLanguage] = useState(i18next.language);


    const changeLanguage = (lang : string) => {
        setLanguage(lang);
        i18next.changeLanguage(lang);
    }

    return (
        <LanguageContext.Provider value={{language, changeLanguage, t:i18next.t}}>
            {children}
        </LanguageContext.Provider>
    )
}