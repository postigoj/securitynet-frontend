import React from "react";
import ReactDOM from "react-dom/client";

//redux
import { Provider } from "react-redux";
import store from "./state/store";

//react router
import { BrowserRouter } from "react-router-dom";

//import component
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
