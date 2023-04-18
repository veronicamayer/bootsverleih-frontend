import { useState, useEffect } from "react";
import Navigation from "../../components/Navigation/Navigation";
import "./AlleReservierungen.scss";
import { Link } from "react-router-dom";

const AlleReservierungen = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch(
            "https://bootsverleih-87-backend.onrender.com/api/v1/alleReservierungenObj"
        )
            .then((res) => res.json())
            .then((data) => setBookings(data.reservierung))
            .catch((error) => console.error(error));
    }, []);

    return (
        <section id="alleReservierungen">
            <Navigation />
            <article>
                <h1>Alle Reservierungen</h1>
                <Link to="/neue-reservierung" className="plusButton">
                    +
                </Link>
            </article>
            <article id="bookingitems">
                {bookings.map((booking) => (
                    <Link
                        to={`/alle-reservierungen/${booking._id}`}
                        key={booking._id}
                        className="bookingitem"
                    >
                        {`Boat: ${booking.welches_boot}, ${booking.startdatum} bis ${booking.enddatum}`}
                    </Link>
                ))}
            </article>
        </section>
    );
};

export default AlleReservierungen;
