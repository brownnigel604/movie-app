import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus as faPlus } from "@fortawesome/free-solid-svg-icons";

const WatchListPage = () => {
  const [watchListMovies, setWatchList] = useState([]);

  useEffect(() => {
    const watchList = JSON.parse(localStorage.getItem("watchList")) || [];
    setWatchList(watchList);
  }, []);

  return (
    <div className="watchlist-container">
      {watchListMovies.length > 0 ? (
        <div className="watchlist">
          <h2>Watch List</h2>
          <div className="movies-container">
            {watchListMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      ) : (
        <p>
          No movies are currently added to your watch list. Return to the home page and click the{" "}
          <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} /> to add a to add a movie to your watch
          list!
        </p>
      )}
    </div>
  );
};

export default WatchListPage;
