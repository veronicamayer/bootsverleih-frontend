import { useState, useEffect } from "react";
import Navigation from "../../components/Navigation/Navigation";
import "./NeueReservierung.scss";

const NeueReservierung = () => {
    const [startdatum, setStartdatum] = useState("");
    const [enddatum, setEnddatum] = useState("");
    const [selectedBoat, setSelectedBoat] = useState("");
    const [boats, setBoats] = useState([]);
    const [reservations, setReservations] = useState([]);

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

    const handleCreateBooking = (event) => {
        event.preventDefault();

        // Find the selected boat by ID
        const selectedBoatObject = boats.find(
            (boat) => boat._id === selectedBoat
        );

        // Check if there is already a reservation that overlaps with the selected dates
        const overlappingReservation = reservations.find((reservation) => {
            return (
                reservation.welches_boot === selectedBoat &&
                reservation.startdatum < enddatum &&
                reservation.enddatum > startdatum
            );
        });

        // If there is an overlapping reservation, show an error message and return early
        if (overlappingReservation) {
            alert(
                `The boat is already reserved from ${overlappingReservation.startdatum} to ${overlappingReservation.enddatum}`
            );
            return;
        }

        // Create a new reservation object
        const newReservation = {
            startdatum,
            enddatum,
            welches_boot: selectedBoat,
        };

        console.log(newReservation);

        // Send a POST request to create the new reservation
        fetch("http://localhost:9999/api/v1/reservierung", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newReservation),
        })
            .then((res) => {
                if (res.ok) {
                    alert("Reservation created successfully!");
                    setStartdatum("");
                    setEnddatum("");
                    setSelectedBoat("");
                } else {
                    alert("Error creating reservation");
                }
            })
            .catch((error) => {
                console.error(error);
                alert("Error creating reservation");
            });
    };

    // Filter out boats that are already reserved during the selected dates
    const availableBoats = boats.filter((boat) => {
        const overlappingReservation = reservations.find((reservation) => {
            return (
                reservation.welches_boot === boat._id &&
                reservation.startdatum < enddatum &&
                reservation.enddatum > startdatum
            );
        });
        return !overlappingReservation;
    });

    return (
        <section id="neueReservierung">
            <Navigation />
            <h1>Neue Reservierung</h1>
            <form onSubmit={handleCreateBooking}>
                <label htmlFor="startDate">Startdatum:</label>
                <input
                    type="date"
                    id="startDate"
                    value={startdatum}
                    onChange={(event) => setStartdatum(event.target.value)}
                />

                <label htmlFor="endDate">Enddatum:</label>
                <input
                    type="date"
                    id="endDate"
                    value={enddatum}
                    onChange={(event) => setEnddatum(event.target.value)}
                />

                <label htmlFor="boat">Boot:</label>
                <select
                    id="boat"
                    value={selectedBoat}
                    onChange={(event) => setSelectedBoat(event.target.value)}
                >
                    <option value="">Wähle ein Boot</option>
                    {availableBoats.map((boat) => (
                        <option key={boat._id} value={boat._id}>
                            {`${boat.bootsart}, Nr.: ${boat._id}`}
                        </option>
                    ))}
                </select>

                <button type="submit" disabled={!selectedBoat}>
                    Reservieren
                </button>
            </form>
        </section>
    );
};

export default NeueReservierung;
