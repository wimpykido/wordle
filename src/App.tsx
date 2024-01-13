import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WordlePage from "./pages/wordle-page";
const App = () => {
  return (
    <BrowserRouter basename="">
      <Routes>
        <Route path="/" element={<WordlePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
