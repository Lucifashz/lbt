<<<<<<< HEAD
import ReactDOM from "react-dom/client";
import "./index.css";
import App from './App'
import {store, persistor} from "./Redux/store"
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
=======
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {NextUIProvider} from '@nextui-org/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>,
)
>>>>>>> bd117058ee4d01e6fc9596bc87d402f7f452659e
