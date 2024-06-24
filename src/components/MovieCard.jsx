import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeart } from "@fortawesome/free-solid-svg-icons";
import { faPlus as faPlus } from "@fortawesome/free-solid-svg-icons";
import "../styles/App.css";
import "../styles/MovieCard.css";
import { faStar as faStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

const formatDate = (dateString) => {
  try {
    const options = { month: "short", day: "2-digit", year: "numeric" };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Unknown"; // Return a fallback value in case of error
  }
};

const MovieCard = ({ movie }) => {
  const [showDetails, setShowDetails] = useState(false);
  const location = useLocation();

  const [isMovieInFavorites, setIsMovieInFavorites] = useState(false);
  const [isMovieInWatchList, setIsMovieInWatchList] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favourites")) || [];
    const isFavorited = favorites.some((favMovie) => favMovie.id === movie.id);
    setIsMovieInFavorites(isFavorited);
  }, [movie.id]);

  useEffect(() => {
    const watchList = JSON.parse(localStorage.getItem("watchList")) || [];
    const isWatchList = watchList.some(
      (watchMovie) => watchMovie.id === movie.id
    );
    setIsMovieInWatchList(isWatchList);
  }, [movie.id]);

  const toggleFavourite = () => {
    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    const movieIndex = favourites.findIndex(
      (favMovie) => favMovie.id === movie.id
    );

    ///// Removes the movie from the favorites
    if (movieIndex > -1) {
      favourites.splice(movieIndex, 1);
      localStorage.setItem("favourites", JSON.stringify(favourites));
      setIsMovieInFavorites(false);
    } else {
      favourites.push(movie);
      localStorage.setItem("favourites", JSON.stringify(favourites));
      setIsMovieInFavorites(true);
    }
  };

  const watchList = () => {
    let watchList = JSON.parse(localStorage.getItem("watchList")) || [];
    const movieIndex = watchList.findIndex(
      (watchMovie) => watchMovie.id === movie.id
    );

    if (movieIndex > -1) {
      watchList.splice(movieIndex, 1);
      localStorage.setItem("watchList", JSON.stringify(watchList));
      setIsMovieInWatchList(false);
    } else {
      watchList.push(movie);
      localStorage.setItem("watchList", JSON.stringify(watchList));
      setIsMovieInWatchList(true);
    }
  };

  const isMoviePage = location.pathname.includes(`/movie/${movie.id}`);

  const renderStars = (rating) => {
    const fullStars = Math.min(Math.floor(rating / 2), 5); // Limit to 5 full stars
    const halfStar = rating % 2 !== 0; // Check for half star

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} style={{ color: "gold" }} />
      );
    }
    if (halfStar) {
      stars.push(
        <FontAwesomeIcon
          key="half"
          icon={faStarHalfAlt}
          style={{ color: "gold" }}
        />
      );
    }

    return stars;
  };

  return (
    <div className="movie-card" key={movie.id}>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        {movie.poster_path ? (
          <img
            className="movie-poster"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            style={{ maxWidth: "200px" }}
          />
        ) : (
          <img
            className="movie-poster"
            src={`/images/placeholder-movie-poster.jpg`}
            alt="Placeholder"
            style={{ maxWidth: "200px" }}
          />
        )}

        {movie.release_date && (
          <p className="release-date">
            Release Date: {formatDate(movie.release_date)}
          </p>
        )}

        {movie.vote_average && (
          <p className="movie-rating">
            Rating: {renderStars(movie.vote_average / 1)}{" "}
            {((movie.vote_average.toFixed(2) / 10) * 100).toFixed(1)}%
          </p>
        )}

        <div className="movie-buttons">
          <div className="icon-wrapper" onClick={toggleFavourite}>
            <FontAwesomeIcon
              className="favourites-icon"
              icon={faHeart}
              style={{ color: isMovieInFavorites ? "red" : "white" }}
            />
            <span className="hover-text">
              {isMovieInFavorites
                ? "Remove from Favourites"
                : "Add to Favourites"}
            </span>
          </div>
          <div className="icon-wrapper">
            <FontAwesomeIcon
              className="watch-icon"
              icon={faPlus}
              onClick={watchList}
              style={{ color: isMovieInWatchList ? "green" : "white" }}
            />
            <span className="hover-text">
              {isMovieInWatchList
                ? "Remove from Watch List"
                : "Add to Watch List"}
            </span>
          </div>
        </div>
        <p className="movie-overview">{movie.overview}</p>
        {!isMoviePage && (
          <Link to={`/movie/${movie.id}`} className="movie-card-link">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className={
                showDetails ? "info-button-pointer" : "info-button-disabled"
              }
            >
              More Info
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    overview: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
