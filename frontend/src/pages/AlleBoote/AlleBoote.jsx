import { useState, useEffect } from "react";
import Navigation from "../../components/Navigation/Navigation";
import "./AlleBoote.scss";

const AlleBoote = () => {
    const [boats, setBoats] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/alleBoote")
            .then((res) => res.json())
            .then((data) => setBoats(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <section id="alleBoote">
            <Navigation />
            <h1>Alle Boote</h1>
            <ul>
                {boats.map((boat) => (
                    <li key={boat.id}>
                        <p>{`${boat.id}: ${boat.name} (${boat.type}, ${boat.year})`}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default AlleBoote;
