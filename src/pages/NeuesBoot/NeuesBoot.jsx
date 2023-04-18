import { useState } from "react";
import Navigation from "../../components/Navigation/Navigation";
import "./NeuesBoot.scss";

const NeuesBootForm = () => {
    const [bootsart, setBootsart] = useState("");
    const [seriennummer, setSeriennummer] = useState("");
    const [baujahr, setBaujahr] = useState("");
    const [material, setMaterial] = useState("");
    const [bild, setBild] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("bootsart", bootsart);
        formData.append("seriennummer", seriennummer);
        formData.append("baujahr", baujahr);
        formData.append("material", material);
        formData.append("bild", bild);

        try {
            const response = await fetch(
                "https://bootsverleih-87-backend.onrender.com/api/v1/boote",
                {
                    method: "POST",
                    body: formData,
                }
            );

            console.log("Boat created successfully");
            setBootsart("");
            setSeriennummer("");
            setBaujahr("");
            setMaterial("");
            setBild(null);
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error(`Error creating boat: ${error}`);
            throw error;
        }
    };

    const handleBildChange = (e) => {
        const selectedBild = e.target.files[0];
        setBild(selectedBild);
    };

    return (
        <section id="neuesBoot">
            <Navigation />
            <h1>Neues Boot</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="bootsart">Bootsart:</label>
                <input
                    type="text"
                    id="bootsart"
                    value={bootsart}
                    onChange={(e) => setBootsart(e.target.value)}
                />

                <label htmlFor="seriennummer">Seriennummer:</label>
                <input
                    type="number"
                    id="seriennummer"
                    value={seriennummer}
                    onChange={(e) => setSeriennummer(e.target.value)}
                />

                <label htmlFor="baujahr">Baujahr:</label>
                <input
                    type="number"
                    id="baujahr"
                    value={baujahr}
                    onChange={(e) => setBaujahr(e.target.value)}
                />

                <label htmlFor="material">Material:</label>
                <input
                    type="text"
                    id="material"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                />

                <label htmlFor="bild">Bild:</label>
                <input type="file" id="bild" onChange={handleBildChange} />

                <button type="submit">Speichern</button>
            </form>
        </section>
    );
};

export default NeuesBootForm;
