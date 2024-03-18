import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import Footer from "./components/Footer";
import Home from "./components/Home";

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
        <Home onSearch={handleSearch} />
        <MovieList query={query} />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
