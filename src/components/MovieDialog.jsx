import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Avatar,
  CircularProgress,
  Box,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import Api from "./Api";

function MovieDialog({ movie, open, handleClose }) {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [watchSites, setWatchSites] = useState([]);

  useEffect(() => {
    const fetchActors = async () => {
      setLoading(true);
      try {
        const response = await Api.getMovieCredits(movie.id);
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
  }, [movie.id]);

  useEffect(() => {
    const fetchWatchSites = async () => {
      try {
        const sites = await Api.searchWatchSites(movie.title);
        setWatchSites(sites);
      } catch (error) {
        console.error("Error fetching watch sites:", error);
      }
    };

    fetchWatchSites();
  }, [movie.title]);

  const handleSearchMovie = () => {
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(movie.title)}`,
      "_blank"
    );
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: "bold" }}>{movie.title}</DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          endIcon={<CloseIcon />}
          sx={{ color: "red" }}
        >
          Close
        </Button>
        {watchSites.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            href={watchSites[0].url}
            target="_blank"
            sx={{ bgcolor: "#FFFFED" }}
          >
            Watch Now
          </Button>
        )}
        <Button
          variant="outlined"
          onClick={handleSearchMovie}
          sx={{
            bgcolor: "#FFFFED",
            color: "#000",
          }}
        >
          Search Movie
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MovieDialog;
