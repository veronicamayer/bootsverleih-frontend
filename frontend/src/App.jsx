import { useState } from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import AlleBoote from "./pages/AlleBoote/AlleBoote";
import AlleReservierungen from "./pages/AlleReservierungen/AlleReservierungen";
import BootDetails from "./pages/BooteDetails/BooteDetails";
import ReservierungenDetails from "./pages/ReservierungenDetails/ReservierungenDetails";
import NeueReservierung from "./pages/NeueReservierung/NeueReservierung";
import NeuesBoot from "./pages/NeuesBoot/NeuesBoot";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/alle-boote" element={<AlleBoote />} />
                    <Route path="/neues-boot" element={<NeuesBoot />} />
                    <Route path="/alle-boote/:id" element={<BootDetails />} />

                    <Route
                        path="/alle-reservierungen"
                        element={<AlleReservierungen />}
                    />
                    <Route
                        path="/neue-reservierung"
                        element={<NeueReservierung />}
                    />
                    <Route
                        path="/alle-reservierungen/:id"
                        element={<ReservierungenDetails />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
