import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./styles.css"
import { ParserProvider } from "./ParserProvider";
import { SaverProvider } from "./SaverProvider";
import { DataProvider } from "./DataProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DataProvider>
    <SaverProvider>
      <ParserProvider>
        <App/>
      </ParserProvider>
    </SaverProvider>
  </DataProvider>
);
