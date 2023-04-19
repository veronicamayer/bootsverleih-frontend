import "./Navigation.scss";
import BootIcon from "../../assets/images/bootIcon.png";
import BootIconColor from "../../assets/images/bootIconColor.png";
import CalendarIcon from "../../assets/images/calendarIcon.png";
import CalendarIconColor from "../../assets/images/calendarIconColor.png";
import HomeIcon from "../../assets/images/homeIcon.png";
import HomeIconColor from "../../assets/images/homeIconColor.png";
import { Link } from "react-router-dom";

const Navigation = ({ currentPage }) => {
    const homeIcon = currentPage === "home" ? HomeIconColor : HomeIcon;
    const bootIcon = currentPage === "boote" ? BootIconColor : BootIcon;
    const calendarIcon =
        currentPage === "calendar" ? CalendarIconColor : CalendarIcon;

    return (
        <section id="navigation">
            <Link to="/">
                <img src={homeIcon} alt="" />
            </Link>
            <Link to="/alle-boote">
                <img src={bootIcon} alt="" />
            </Link>
            <Link to="/alle-reservierungen">
                <img src={calendarIcon} alt="" />
            </Link>
        </section>
    );
};

export default Navigation;
