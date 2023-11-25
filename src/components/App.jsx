import { useContext, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import {getSaver, setSaver} from "../services/saver";
import { ParserContext } from "../ParserProvider";
import { SaverContext } from "../SaverProvider";
import { DataContext } from "../DataProvider";


const App = () => {
  const [isDb, setDb] = useState(false);
  const context = useContext(ParserContext);
  const saverContext = useContext(SaverContext);
  const dataContext = useContext(DataContext);

  function print() {
    window.print();
  }

  const save = () => {
    saverContext.saveFile();
  }

  return (
    <>
      <div id="form_conteiner" className="flex print flex-col gap-6 p-3">
        {dataContext.data && context.parse_data(dataContext.data)}
        {getSaver()}
      </div>
      <div className="flex gap-3 p-3 justify-center">
        <button className="bg-stone-500 hover:bg-stone-600 text-white font-sans font-bold p-3 w-32 rounded-lg"
        onClick={save}>
          Сохранить
        </button>
        <button className="bg-stone-500 hover:bg-stone-600 text-white font-sans font-bold p-3 w-32 rounded-lg"
        onClick={print}>
          Печать
        </button>
      </div>
    </>
  );
}

export default App;
