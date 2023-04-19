import { useState, useEffect } from "react";
import Navigation from "../../components/Navigation/Navigation";
import "./Dashboard.scss";
import DashboardNumbers from "../../components/DashboardNumbers/DashboardNumbers";

const Dashboard = () => {
    const [reservationsCount, setReservationsCount] = useState(0);
    const [boatsCount, setBoatsCount] = useState(0);

    useEffect(() => {
        const fetchReservationsCount = async () => {
            const response = await fetch(
                "http://localhost:9999/api/v1/alleReservierungen"
            );
            const data = await response.json();
            setReservationsCount(data.reservierung);
        };
        fetchReservationsCount();

        const fetchBoatsCount = async () => {
            const response = await fetch(
                "http://localhost:9999/api/v1/alleBoote"
            );
            const data = await response.json();
            setBoatsCount(data.boot);
        };
        fetchBoatsCount();
    }, []);

    return (
        <section id="dashboard">
            <Navigation currentPage="home" />
            <h1>Dashboard</h1>
            <div id="kacheln">
                <article>
                    <h2>Aktuelle Reservierungen</h2>
                    <p>{reservationsCount}</p>
                </article>
                <DashboardNumbers />
                <article>
                    <h2>Gesamtanzahl Boote</h2>
                    <p>{boatsCount}</p>
                </article>
            </div>
        </section>
    );
};

export default Dashboard;
