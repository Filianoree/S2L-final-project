import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { CircularProgress, Grid, Typography } from "@mui/material";
import Api from "./Api";

function MovieList({ query }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const results = await Api.searchMovies(query);
        results.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
        setMovies(results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
      setLoading(false);
    };

    if (query) {
      fetchMovies();
      setSearched(true);
    } else {
      setMovies([]);
      setSearched(false);
    }
  }, [query]);

  return (
    <div style={{ padding: "20px" }}>
      {loading ? (
        <CircularProgress />
      ) : movies.length > 0 ? (
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      ) : searched ? (
        <Typography variant="body1">No movies found</Typography>
      ) : null}
    </div>
  );
}

export default MovieList;
