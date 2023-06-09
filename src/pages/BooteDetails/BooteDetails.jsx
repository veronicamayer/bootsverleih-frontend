import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import "./BooteDetails.scss";
import BootDefault from "../../assets/images/boatstock.png";

const BootDetails = () => {
    const { id } = useParams();
    const [boat, setBoat] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:9999/api/v1/boote/${id}`)
            .then((res) => res.json())
            .then((data) => setBoat(data.boot))
            .catch((error) => console.error(error));
    }, [id]);

    if (!boat) {
        return <p>Loading...</p>;
    }

    const handleDelete = () => {
        fetch(`http://localhost:9999/api/v1/boote/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                navigate("/alle-boote");
            })
            .catch((error) => console.error(error));
    };

    return (
        <section id="bootDetails">
            <Navigation currentPage="boote" />
            <article>
                <div id="bild">
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
                    />
                </div>
                <div id="text">
                    <h1>{boat.bootsart}</h1>
                    <p>Seriennummer: {boat.seriennummer}</p>
                    <p>Baujahr: {boat.baujahr}</p>
                    <p>Material: {boat.material}</p>
                    <button onClick={handleDelete}>Boot löschen</button>
                </div>
            </article>
        </section>
    );
};

export default BootDetails;
