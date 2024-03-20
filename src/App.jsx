import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MoviePage from "./pages/MoviePage";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  colors,
} from "@mui/material";
import Footer from "./pages/Footer";
import Home from "./pages/Home";

function App() {
  const [query, setQuery] = useState("");

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  const appBarStyle = {
    bgcolor: "#333",
  };

  const containerStyle = {
    backgroundColor: "#f5f5f5",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px",
  };

  return (
    <div>
      <AppBar position="sticky" sx={appBarStyle}>
        <Container maxWidth="lg">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "#fff" }}
            >
              Movie Finder
            </Typography>
            <SearchBar onSearch={handleSearch} />
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="lg" sx={containerStyle}>
        <Home />
        <div>
          <Routes>
            <Route
              path={
                window.location.pathname !== "/movie/:movieId"
                  ? "/"
                  : "/movie/:movieId"
              }
              element={<MovieList query={query} />}
            />

            <Route path="/movie/:movieId" element={<MoviePage />} />
          </Routes>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
