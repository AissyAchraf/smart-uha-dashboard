import React, { createContext, useEffect, useReducer, useState } from "react";
import translations from "../lang/translations";
import format from "string-template";

const initialState = {
    lang: null
};

const LangContext = createContext({
    ...initialState,
    changeLang: () => {},
    translate: () => {}
});

export const LangProvider = ({ children }) => {
    const [lang, setLang] = useState('en');

    const params = {
        Location: "Campus Illberg",
        Timezone: "Europe/Paris"
    };

    const changeLang = (lang) => {
        setLang(lang);
        localStorage.setItem("lang", lang);
    }

    const translate = (key, params = {}) => {
        let bloc = translations[lang];
        for(const k of key.split('.')) {
            if(typeof bloc[k] === 'undefined') return "OOPS: could not translate";
            bloc = bloc[k];
        }
        return format(bloc, params);
    }

    useEffect(() => {
        if (localStorage.getItem("lang")?.length >= 2) {
            const lang = localStorage.getItem("lang") !== 'en' ? 'fr' : 'en';
            setLang(lang);
        }
    }, []);

    return (
        <LangContext.Provider value={{...lang, translate, changeLang}}>
            {children}
        </LangContext.Provider>
    );
}

export default LangContext;