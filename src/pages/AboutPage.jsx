import tmbdLogo from "../../public/images/tmdb-logo.svg";
import "../styles/about.css";

const AboutPage = () => {
  return (
    <>
      <h2>Welcome to KJJN Movie Db</h2>
      <div className="about-page-container">
        <div className="about-project-container">
          <h3>About the Project</h3>
          <p>
            {`Welcome to KJJN Movie Db, your ultimate destination for exploring the world of cinema. 
        Our project is dedicated to providing users with a comprehensive movie browsing experience, 
        allowing you to delve into the vast universe of films from the comfort of your screen.  
        Effortlessly manage your movie preferences by adding or removing movies from your Favourites and Watch List.`}
          </p>
          <div id="tmdb-ensdorse">
            <p id="endorse-text">
              {`This product uses the TMDb API but is not endorsed or certified by TMDb.`}
            </p>
            <img
              src={tmbdLogo}
              alt="The Movie Database logo"
              style={{ width: "75px" }}
            />
          </div>
        </div>
        <div className="about-developers-container">
          <h3>About the Developers</h3>
          <p>
            {`KJJN Movie Db was developed by Kai, Josh, Jashan and Nigel. We are a team of passionate developers who utilized React.js to bring the KJJN Movie Db app to life.`}
          </p>
          <div id="developer-git">
            <a href="https://github.com/KaiAlcantara">
              https://github.com/KaiAlcantara
            </a>
            <a href="https://github.com/amar-i/">https://github.com/amar-i/</a>
            <a href="https://github.com/jashanSran">
              https://github.com/jashanSran
            </a>
            <a href="https://github.com/brownnigel604">
              https://github.com/brownnigel604
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
