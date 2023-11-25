import React, { createContext } from "react";
import Table from "./components/Table/Table";
import HeadList from "./components/HeadList/HeadList";
import FormatedBox from "./components/FormatedBox/FormatedBox";
import Facades from "./components/Facades/Facades";

export const ParserContext = createContext();

export const ParserProvider = ({children}) => {
    const parse_element = (element, index) => {
        switch (element.type) {
            case "table":
                return <Table element={element} index = {index}/>
            case "head-list":
                return <HeadList element={element} index = {index}/>
            case "text":
                return <p className="font-bold">{element.data}</p>
            case "text-big":
                return <p className="font-bold text-xl">{element.data}</p>
            case "formated-box":
                return <FormatedBox element={element} index = {index}/>
            case "facades":
                return <Facades element={element} index = {index}/>
            default:
                return (
                    <p>
                        Ошибка в распарске элементов
                    </p>
                )
        }
    }

    const parse_data = (data) => {
        return data.map((element, index) => parse_element(element, index))
    }

    return (
        <ParserContext.Provider value={{
            parse_data: parse_data,
            parse_element: parse_element
        }}>
            {children}
        </ParserContext.Provider>
    );
}