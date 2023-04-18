import { useState, useEffect } from "react";
import Navigation from "../../components/Navigation/Navigation";
import "./AlleBoote.scss";
import { Link } from "react-router-dom";
import BootDefault from "../../assets/images/boatstock.png";

const AlleBoote = () => {
    const [boats, setBoats] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9999/api/v1/alleBooteObj")
            .then((res) => res.json())
            .then((data) => setBoats(data.boot))
            .catch((error) => console.error(error));
    }, []);

    return (
        <section id="alleBoote">
            <Navigation />
            <h1>Alle Boote</h1>
            <Link to="/neues-boot" className="plusButton">
                +
            </Link>
            <div>
                {boats.map((boat) => (
                    <Link to={`/alle-boote/${boat._id}`} key={boat._id}>
                        <img
                            src={
                                boat.bild
                                    ? `http://localhost:9999/${boat.bild}`
                                    : BootDefault
                            }
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = BootDefault;
                            }}
                            alt="boat image"
                        />
                        <h3>{boat.bootsart}</h3>
                        <p>Seriennummer: {boat.seriennummer}</p>
                        <p>Baujahr: {boat.baujahr}</p>
                        <p>Material: {boat.material}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default AlleBoote;
