import Nav from "./Nav";
import kjjnLogo from "/images/kjjn-logo.svg";
import { Link } from "react-router-dom";
import "../styles/header.css";

function Header() {
  return (
    <header>
      <Link to={`/`}>
        <div id="logo-container">
          <img src={kjjnLogo} alt="KJJN logo" style={{ width: "80px" }} />
        </div>
      </Link>

      <Nav />
    </header>
  );
}

export default Header;
