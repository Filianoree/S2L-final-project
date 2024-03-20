import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // Importa Helmet
import {
  Typography,
  CircularProgress,
  Box,
  Button,
  Grid,
  Avatar,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import Api from "../components/Api";

function MoviePage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [watchSites, setWatchSites] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const movieData = await Api.getMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
      setLoading(false);
    };

    fetchMovieDetails();
  }, [movieId]);

  useEffect(() => {
    const fetchActors = async () => {
      setLoading(true);
      try {
        const response = await Api.getMovieCredits(movieId);
        const actorsData = await Promise.all(
          response.cast
            .slice(0, 3)
            .map((actor) => Api.getPersonDetails(actor.id))
        );
        setActors(actorsData);
      } catch (error) {
        console.error("Error fetching movie credits:", error);
      }
      setLoading(false);
    };

    fetchActors();
  }, [movieId]);

  useEffect(() => {
    const fetchWatchSites = async () => {
      try {
        const sites = await Api.searchWatchSites(movie?.title);
        setWatchSites(sites);
      } catch (error) {
        console.error("Error fetching watch sites:", error);
      }
    };

    fetchWatchSites();
  }, [movie?.title]);

  if (loading || !movie) {
    return <CircularProgress />;
  }

  return (
    <>
      {/* Utilizza Helmet per impostare il titolo della pagina in base al titolo del film */}
      <Helmet>
        <title>{movie.title}</title>
      </Helmet>
      <div>
        <Typography variant="h4" gutterBottom>
          {movie.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {movie.overview}
        </Typography>
        <Box mb={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <StarIcon color="secondary" />
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {movie.vote_average.toFixed(1)}/10
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Typography variant="h6" gutterBottom>
          Top 3 Cast:
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          actors.map((actor, index) => (
            <Box key={actor.id} marginBottom={2}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar
                    alt={actor.name}
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body1">{actor.name}</Typography>
                </Grid>
              </Grid>
            </Box>
          ))
        )}
        <Button
          variant="contained"
          component={Link}
          to="/"
          endIcon={<CloseIcon />}
          sx={{ mt: 2 }}
        >
          Torna alla lista dei film
        </Button>
        {watchSites.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            href={watchSites[0].url}
            target="_blank"
            sx={{ bgcolor: "#FFFFED", mt: 2 }}
          >
            Guarda adesso
          </Button>
        )}
      </div>
    </>
  );
}

export default MoviePage;
