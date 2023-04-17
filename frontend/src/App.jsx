import { useState } from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import AlleBoote from "./pages/AlleBoote/AlleBoote";
import AlleReservierungen from "./pages/AlleReservierungen/AlleReservierungen";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/alle-boote" element={<AlleBoote />} />
                    <Route
                        path="/alle-reservierungen"
                        element={<AlleReservierungen />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
