import kjjnLogo from "/images/kjjn-logo.svg";
import "../styles/footer.css";

function Footer() {
  return (
    <footer>
      <div id="footer-logo-container">
        <img id="footer-logo" src={kjjnLogo} alt="KJJN logo" />
        <div id="copyright">
          <p>&copy; 2024 KJJN Movie Db</p>
          <p>Created by Nigel, Kai, Josh and Jashan </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
