import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import "./BooteDetails.scss";

const BootDetails = () => {
    const { id } = useParams();
    const [boat, setBoat] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://bootsverleih-87-backend.onrender.com/api/v1/boote/${id}`)
            .then((res) => res.json())
            .then((data) => setBoat(data.boot))
            .catch((error) => console.error(error));
    }, [id]);

    if (!boat) {
        return <p>Loading...</p>;
    }

    const handleDelete = () => {
        fetch(
            `https://bootsverleih-87-backend.onrender.com/api/v1/boote/${id}`,
            {
                method: "DELETE",
            }
        )
            .then(() => {
                navigate("/alle-boote");
            })
            .catch((error) => console.error(error));
    };

    return (
        <section id="bootDetails">
            <Navigation />
            <img
                src={`https://bootsverleih-87-backend.onrender.com/${boat.bild}`}
            />
            <h1>{boat.bootsart}</h1>
            <p>Seriennummer: {boat.seriennummer}</p>
            <p>Baujahr: {boat.baujahr}</p>
            <p>Material: {boat.material}</p>
            <button onClick={handleDelete}>Boot löschen</button>
        </section>
    );
};

export default BootDetails;
