import "./Navigation.scss";
import BootIcon from "../../assets/images/bootIcon.png";
import CalendarIcon from "../../assets/images/calendarIcon.png";
import HomeIcon from "../../assets/images/homeIcon.webp";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <section id="navigation">
            <Link to="/">
                <img src={HomeIcon} alt="" />
            </Link>
            <Link to="/alle-boote">
                <img src={BootIcon} alt="" />
            </Link>
            <Link to="/alle-reservierungen">
                <img src={CalendarIcon} alt="" />
            </Link>
        </section>
    );
};

export default Navigation;
