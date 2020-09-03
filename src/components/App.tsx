import React from "react";
// @ts-ignore
import SnackbarProvider from "react-simple-snackbar";

import CardsProvider from "./CardsProvider";

function App() {
  return (
    <SnackbarProvider>
      <CardsProvider />
    </SnackbarProvider>
  );
}

export default App;
