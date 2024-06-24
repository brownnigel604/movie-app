// Router Components
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Styles
import "../styles/App.css";

//Components
import Header from "../components/Header";
import Footer from "../components/Footer";

//Pages
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import MoviePage from "../pages/MoviePage";
import FavoritesPage from "../pages/FavouritesPage";
import WatchListPage from "../pages/WatchListPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/AboutPage" exact element={<AboutPage />} />
          <Route path="/movie/:movieId" element={<MoviePage />} />
          <Route path="/favourites" element={<FavoritesPage />} />
          <Route path="/watchlist" element={<WatchListPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
