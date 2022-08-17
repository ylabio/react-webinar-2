import React, { useState } from "react";
import LocalStorage from "../local-storage";

const LanguageContext = React.createContext({});
const localStorageService = new LocalStorage();

function LanguageContextProvider(props) {
    const [language, setLanguage] = useState(() => localStorageService.getLanguage());
    const toggleLanguage = (value) => {
        setLanguage(value);
        localStorageService.setLanguage(value)
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {props.children}
        </LanguageContext.Provider>
    );
}

export {
    LanguageContextProvider,
    LanguageContext
};