import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ModalProvider } from "./context/ModalProvaider";
import { DirectoryProvider } from "./context/DirectoryProvaider";
import * as serviceWorker from "./serviceWorker";
import { GlobalStyle } from "./style/GlobalStyle";

ReactDOM.render(
  <StrictMode>
    <DirectoryProvider>
      <ModalProvider>
        <GlobalStyle />
        <App />
      </ModalProvider>
    </DirectoryProvider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
