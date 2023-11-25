import { invoke } from "@tauri-apps/api/tauri";
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [data, setData] = useState([]);

    const setElementByIndex = (element, index) => {
        console.log("set")
        const newData = [...data];
        newData[index] = element;
        setData(newData);
    }

    useEffect(() => {
        const load_db = async () => {
            console.log("Loading db...");
            setData(JSON.parse(await invoke("db")));
            setDb(true);
            console.log("Db has loaded");
        }
        load_db();
    }, [])

    useEffect(() => {
        console.log("data", data)
    }, [data])

    return (
        <DataContext.Provider value={{
            data: data,
            setElementByIndex: setElementByIndex
            }}>
            {children}
        </DataContext.Provider>
    )
}