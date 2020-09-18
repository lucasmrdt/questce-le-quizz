import React from "react";
import ReactDOM from "react-dom";
import * as firebase from "firebase";

import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import "katex/dist/katex.min.css";

firebase.initializeApp({
  apiKey: "AIzaSyBEhIHkUCLmfRHzHiC0WLLofw9uL2ugOQk",
  authDomain: "quiz-l3-info.firebaseapp.com",
  databaseURL: "https://quiz-l3-info.firebaseio.com",
  projectId: "quiz-l3-info",
  storageBucket: "quiz-l3-info.appspot.com",
  messagingSenderId: "920736359774",
  appId: "1:920736359774:web:fabd99a3c7a5404276dbcf",
  measurementId: "G-EK9LVBQNLE",
});
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
