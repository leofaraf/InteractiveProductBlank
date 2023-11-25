import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../DataProvider";

const Table = (props) => {
    const element = props.element;
    const data = useContext(DataContext);
    const index = props.index;

    const [result, setResult] = useState(new Array(element.data.length-1).fill(""));

    useEffect(() => {
        const is_non_empty = result.some(element => !!element)
        if (is_non_empty) {
            const resultArray = [];
            result.map((item, index) => {
                resultArray.push(element.data[index] + " : " + item)
            })
            element.result = resultArray.join("\n")
        } else {
            element.result = ""
        }
        data.setElementByIndex(element, props.index)
    }, [result])

    const handleEvent = (event, index) => {
        const newResult = [...result];
        newResult[index] = event.target.value;
        setResult(newResult);
    }

    return (
        <div className="w-full flex justify-center p-3">
            <table className="border-black border-2">
                <thead>
                    <tr>
                        <th className="w-48 border border-black">
                            {element?.params?.name}
                        </th>
                        <th className="w-48 border border-black"></th>
                    </tr>
                </thead>
                <tbody>
                    {element && element.data.map((name, index) => {
                        return (
                            <tr>
                                <td className="w-48 border border-black">{name}</td>
                                <td className="w-48 border border-black">
                                    <input type="text" onChange={((e) => handleEvent(e, index))}/>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table;