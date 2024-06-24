import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeart } from "@fortawesome/free-solid-svg-icons";

const FavoritesPage = () => {
  const [favouriteMovies, setFavouriteMovies] = useState([]);

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavouriteMovies(favourites);
  }, []);

  return (
    <div className="favourites-container">
      {favouriteMovies.length > 0 ? (
        <div className="favourites">
          <h2>Favourite Movies</h2>
          <div className="movies-container">
            {favouriteMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      ) : (
        <p>
          No favourite movies added yet. Return to the home page and click the{" "}
          <FontAwesomeIcon icon={faHeart} style={{ color: "white" }} /> to add a movie to favourites!
        </p>
      )}
    </div>
  );
};

export default FavoritesPage;
