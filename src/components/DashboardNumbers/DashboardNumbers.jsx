import { useState, useEffect } from "react";

const DashboardNumbers = () => {
    const [boats, setBoats] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [availableBoatsCount, setAvailableBoatsCount] = useState(0);

    useEffect(() => {
        fetch("http://localhost:9999/api/v1/alleBooteObj")
            .then((res) => res.json())
            .then((data) => setBoats(data.boot))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        fetch("http://localhost:9999/api/v1/alleReservierungenObj")
            .then((res) => res.json())
            .then((data) => setReservations(data.reservierung))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        const today = new Date().toISOString().substr(0, 10);
        const availableBoats = boats.filter((boat) => {
            const overlappingReservation = reservations.find((reservation) => {
                return (
                    reservation.welches_boot === boat._id &&
                    reservation.startdatum <= today &&
                    reservation.enddatum >= today
                );
            });
            return !overlappingReservation;
        });
        setAvailableBoatsCount(availableBoats.length);
    }, [boats, reservations]);

    return (
        <article>
            <p>Verfügbare Boote</p>
            <p>{availableBoatsCount}</p>
        </article>
    );
};

export default DashboardNumbers;
