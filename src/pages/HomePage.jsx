import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "../styles/App.css";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      searchMovies();
    } else {
      fetchMovies(selectedCategory);
    }
  }, [selectedCategory, searchQuery]); // Fetch movies when category or searchQuery changes

  const fetchMovies = async (category) => {
    try {
      const API_KEY = "c8dc09b7da7aae1c59a7ba4c32871e0f";
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&page=1`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies(data.results.slice(0, 12)); // Limit to 12 movies
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const searchMovies = async () => {
    try {
      const API_KEY = "c8dc09b7da7aae1c59a7ba4c32871e0f";
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          searchQuery
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to search movies");
      }
      const data = await response.json();
      setMovies(data.results); // Set the movies based on search results
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    setSelectedMovie(null); // Reset selected movie when category changes
    setSearchQuery(""); // Reset search query when category changes
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="app">
      <div className="background-container">
        <div className="category-search">
          <div className="category-select">
            <label htmlFor="category">Category: </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="popular">Popular</option>
              <option value="top_rated">Top Rated</option>
              <option value="now_playing">Now Playing</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            
          </div>
        </div>
        <div className="movies">
          {selectedMovie ? (
            <MovieCard movie={selectedMovie} />
          ) : movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={handleMovieSelect}
              />
            ))
          ) : (
            searchQuery.trim() !== "" && <p>No movies found..</p>
          )}
        </div>
      </div>     
    </div>
  );
}

export default HomePage;
