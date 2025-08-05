import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import App from "./App";
import Loader from "./components/Loader/Loader.jsx";
import { store, persistor } from "./redux/store.js";

import "./fonts/fonts.css";
import "./index.css"
import "modern-normalize/modern-normalize.css";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
