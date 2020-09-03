import React from "react";
import ReactDOM from "react-dom";
import * as firebase from "firebase";

import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import "katex/dist/katex.min.css";

firebase.initializeApp({
  apiKey: "AIzaSyBHvpgiWbMfgp-vQlLBE5FMHTJdA88Ofac",
  authDomain: "questce-ca378.firebaseapp.com",
  databaseURL: "https://questce-ca378.firebaseio.com",
  projectId: "questce-ca378",
  storageBucket: "questce-ca378.appspot.com",
  messagingSenderId: "984317793270",
  appId: "1:984317793270:web:3728bda392b7d5e7b36dd7",
  measurementId: "G-G65J1VR2EZ",
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
serviceWorker.unregister();
