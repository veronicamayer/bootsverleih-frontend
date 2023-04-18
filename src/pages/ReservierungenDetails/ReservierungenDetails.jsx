import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import "./ReservierungenDetails.scss";

const ReservierungenDetails = () => {
    const { id } = useParams();
    const [bookings, setBookings] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:9999/api/v1/reservierung/${id}`)
            .then((res) => res.json())
            .then((data) => setBookings(data.reservierung))
            .catch((error) => console.error(error));
    }, [id]);

    if (!bookings) {
        return <p>Loading...</p>;
    }

    const handleDelete = () => {
        fetch(`http://localhost:9999/api/v1/reservierung/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                navigate("/alle-reservierungen");
            })
            .catch((error) => console.error(error));
    };

    return (
        <section id="reservierungsDetails">
            <Navigation />
            <h1>{bookings.name}</h1>
            <p>Reservierungsnummer: {bookings._id}</p>
            <p>Start Datum: {bookings.startdatum}</p>
            <p>End Datum: {bookings.enddatum}</p>
            <button onClick={handleDelete}>Reservierung löschen</button>
        </section>
    );
};

export default ReservierungenDetails;
