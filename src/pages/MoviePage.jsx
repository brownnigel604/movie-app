import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeart } from "@fortawesome/free-solid-svg-icons";
import { faPlus as faPlus } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import "../styles/MoviePage.css";

const MoviePage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [isMovieInFavorites, setIsMovieInFavorites] = useState(false);
  const [isMovieInWatchList, setIsMovieInWatchList] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const API_KEY = "c8dc09b7da7aae1c59a7ba4c32871e0f";
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=images`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        const backdropPath = data.images.backdrops[0].file_path;
        setMovie({ ...data, backdrop_path: backdropPath });
        checkFavorites(data);
        checkWatchList(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const checkFavorites = (data) => {
    const favorites = JSON.parse(localStorage.getItem("favourites")) || [];
    const isFavorited = favorites.some((favMovie) => favMovie.id === data.id);
    setIsMovieInFavorites(isFavorited);
  };

  const checkWatchList = (data) => {
    const watchList = JSON.parse(localStorage.getItem("watchList")) || [];
    const isWatchListed = watchList.some(
      (watchMovie) => watchMovie.id === data.id
    );
    setIsMovieInWatchList(isWatchListed);
  };

  const toggleFavourite = () => {
    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    const movieIndex = favourites.findIndex(
      (favMovie) => favMovie.id === movie.id
    );

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

  if (error) {
    return (
      <p style={{ textAlign: "center" }}>
        Error: Unable to fetch movie data...
      </p>
    );
  }

  if (!movie) {
    return <p>Loading...</p>;
  }

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
    <div className="movie-detail-container">
      <div
        className="backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`, // Use original size for best resolution
        }}
      />
      <div className="movie-details">
        <div className="details-poster">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <img
              src={`/images/placeholder-movie-poster.jpg`}
              alt={movie.title}
              style={{ maxWidth: "100%" }}
            />
          )}
        </div>
        <div className="details-info">
          <h2>{movie.title}</h2>
          <div className="movie-buttons" id="watch-fav-btn">
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
          <div className="yr-runtime-genre">
            <div id="release-runtime-container">
              <p>{new Date(movie.release_date).getFullYear()}</p>
              <p>{movie.runtime} minutes</p>
            </div>
            <div className="genre-btn-container">
              {movie.genres.slice(0, 2).map((genre) => (
                <button key={genre.id} className="genre-button">
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
          <p id="tagline">{movie.tagline}</p>
          <p>{movie.overview}</p>
          <div className="rating-votes">
            {movie.vote_average && (
              <p className="movie-rating">
                Rating: {renderStars(movie.vote_average / 1)}{" "}
                {((movie.vote_average.toFixed(2) / 10) * 100).toFixed(1)}%
              </p>
            )}
            <p>Votes: {movie.vote_count}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
