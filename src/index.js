import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./Assets/main.css";
import { BrowserRouter } from "react-router-dom";
import { TokentContext } from "./Context/Context";
import { SiteInfo } from "./Context/SiteInfo";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <Provider store={store}>
    <TokentContext>
      <SiteInfo>
        <App />
      </SiteInfo>
    </TokentContext>
    </Provider>
  </BrowserRouter>
);
