import { useState } from "react";

const Facades = () => {
    const [isSpecWeight, setSpecWeight] = useState();

    const [result, setResult] = useState(); 

    const handleWeight = (event) => {
        if (event.target.value === "свой") {
            setSpecWeight(true);
            return;
        } else {
            setSpecWeight(false);
            const newResult = [...result];
            newResult[0] = event.target.value;
            setResult(newResult);
        }
    }

    return (
        <div>
            <p className="font-bold">Фасады</p>
            <div className="flex">
                <p>Вверх</p>
                <p>ЛДСП</p>
                <p>Пленка</p>
                <p>Эмаль</p>
                <p>Пластик</p>
                <input type="text" className="w-20 border"/>
            </div>
            <div>
                <div className="flex">
                    <p>Толщина: </p>
                    <select onChange={handleWeight}>
                        <option>16</option>
                        <option>19</option>
                        <option>22</option>
                        <option>свой</option>
                    </select>
                    {isSpecWeight && (
                        <input type="text" className="w-16" onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }} onChange={() => {
                            const newResult = [...result];
                            newResult[0] = event.target.value;
                            setResult(newResult);
                        }}/>
                    )}
                </div>
                Высота
                <input type="text" className="w-20 border"/>
                Цвет
                <input type="text" className="w-20 border"/>
            </div>
        </div>
    )
}

export default Facades;