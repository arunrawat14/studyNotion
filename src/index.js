import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './reducer/index';
import thunk from 'redux-thunk'; // Import thunk middleware

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk], // Include thunk middleware in the middleware array
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
