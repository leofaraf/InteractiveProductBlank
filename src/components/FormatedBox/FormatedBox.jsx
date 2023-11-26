import { useContext, useEffect, useState } from "react";
import { SaverContext } from "../../SaverProvider";
import { DataContext } from "../../DataProvider";
import { ParserContext } from "../../ParserProvider";
import { Helmet } from "react-helmet";

const FormatedBox = (props) => {
    const element = props.element;
    const format = element.params.input_format
    const divined = format.split("{}")
    const data = useContext(DataContext);
    const [id, setId] = useState("hid");
    const context = useContext(ParserContext);

    const [result, setResult] = useState(new Array(divined.length-1).fill(""))

    useEffect(() => {
        const is_non_empty = result.some(element => !!element)
        if (is_non_empty) {
            const output = divined.map((part, index) => {
                if (index == divined.length-1) {
                    return null;
                }
    
                return part + result[index];
            }).join("")
            element.result = output
            setId("")
        } else {
            element.result = ""
            setId("hid")
        }
        data.setElementByIndex(element, props.index)
    }, [result])

    return <>
        {element?.params?.header && (
            <span id={id}>
                {context.parse_element(element?.params?.header)}
            </span>
        )}
        <div>
            {divined.map((part, index) => {
                if (index == divined.length-1) {
                    return null;
                }

                const ri = element.data[index]

                return (
                    <span id={id}>
                        {part}
                        {/* {remainder[index]} */}
                        {ri && ri === "text-input" && (
                            <>
                                <input type="text" className="w-32 border-b" 
                                onChange={(event) => {
                                    const newResult = [...result];
                                    newResult[index] = event.target.value;
                                    setResult(newResult)
                                }}/>
                            </>
                        )}
                        {ri && ri === "number-input" && (
                            <>
                                <input type="number" className="w-32 border-b" 
                                onChange={(event) => {
                                    const newResult = [...result];
                                    newResult[index] = event.target.value;
                                    setResult(newResult)
                                }} onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                    }
                                }}/>
                            </>
                        )}
                        {ri && Array.isArray(ri) && (
                            <>
                                <select onChange={(event) => {
                                    const newResult = [...result];
                                    newResult[index] = event.target.value;
                                    setResult(newResult)
                                }} className="bg-white appearance-none backdrop:bg-none border border-solid border-gray-400">
                                    <option></option>
                                    {ri.map((section) => {
                                        return (
                                            <option>
                                                {section}
                                            </option>
                                        )
                                    })}
                                </select>
                            </>
                        )}
                    </span>
                )
            })}
        </div>
    </>
}

export default FormatedBox