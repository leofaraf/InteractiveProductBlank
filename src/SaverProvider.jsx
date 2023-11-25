import FileSaver from "file-saver";
import { createContext, useContext, useState } from "react";
import { DataContext } from "./DataProvider";
import { invoke } from "@tauri-apps/api/tauri";

export const SaverContext = createContext();

export const SaverProvider = ({children}) => {
    const dataContext = useContext(DataContext);

    const findAllNonEmptyResults = (data, results = []) => {
        for (const item of data) {
            if (typeof item === 'object' && item !== null) {
            if ('result' in item && item.result !== '') {
                results.push(item.result);
            }
            Object.values(item).forEach(value => {
                if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
                findAllNonEmptyResults([value], results); // Рекурсивный вызов для вложенных объектов и массивов
                }
            });
            }
        }
        return results;
    }
      

    const saveFile = () => {
        const load = async () => {
            const nonEmptyResults = findAllNonEmptyResults(dataContext.data);
            console.log(nonEmptyResults); // ['nice', 'successful'] 
            await invoke("save", {data: nonEmptyResults.join("\n")})             
        }
        load()
    }

    return (
        <SaverContext.Provider value={{
            saveFile: saveFile
        }}>
            {children}
        </SaverContext.Provider>
    )
}