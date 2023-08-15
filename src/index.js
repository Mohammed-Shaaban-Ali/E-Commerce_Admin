import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import stor from "./redux/stor";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={stor}>
    <App />
  </Provider>
);
