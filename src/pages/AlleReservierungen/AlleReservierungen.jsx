import { useState, useEffect } from "react";
import Navigation from "../../components/Navigation/Navigation";
import "./AlleReservierungen.scss";
import { Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const AlleReservierungen = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9999/api/v1/alleReservierungenObj")
            .then((res) => res.json())
            .then((data) => setBookings(data.reservierung))
            .catch((error) => console.error(error));
    }, []);

    return (
        <section id="alleReservierungen">
            <Navigation currentPage="calendar" />
            <article>
                <h1>Alle Reservierungen</h1>
                <Link to="/neue-reservierung" className="plusButton">
                    +
                </Link>
            </article>
            <article id="bookingitems">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={bookings.map((booking) => ({
                        title: `Von: ${booking.startdatum} Bis: ${booking.enddatum}`,
                        start: booking.startdatum,
                        end: booking.enddatum,
                        url: `/alle-reservierungen/${booking._id}`,
                    }))}
                />
            </article>
        </section>
    );
};

export default AlleReservierungen;
