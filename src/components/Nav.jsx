import { NavLink } from "react-router-dom";
import "../styles/nav.css";

const showSidebar = () => {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";

  // Close sidebar when any option is clicked
  const sidebarLinks = document.querySelectorAll(".sidebar li");
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", exitSidebar);
  });
};

const exitSidebar = () => {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
};

const Nav = () => {
  return (
    <div id="nav-container">
      <nav className="main-nav">
        <ul className="sidebar">
          <li className="exitMenu" onClick={exitSidebar}>
            <i className="bx bx-x"></i>
          </li>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/AboutPage">About</NavLink>
          </li>
          <li>
            <NavLink to="/favourites">My Favourites</NavLink>
          </li>
          <li>
            <NavLink to="/watchlist">Watch List</NavLink>
          </li>
        </ul>
        <ul>
          <li className="hideOnMobile">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="hideOnMobile">
            <NavLink to="/AboutPage">About</NavLink>
          </li>
          <li className="hideOnMobile">
            <NavLink to="/favourites">My Favourites</NavLink>
          </li>
          <li className="hideOnMobile">
            <NavLink to="/watchlist">Watch List</NavLink>
          </li>
          <li className="menu" onClick={showSidebar}>
            <i className="bx bx-menu"></i>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
