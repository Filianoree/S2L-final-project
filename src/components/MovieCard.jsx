import React, { useState } from "react";
import { Card, CardMedia, Typography } from "@mui/material";
import MovieDialog from "./MovieDialog";

function MovieCard({ movie }) {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        onClick={handleOpen}
        sx={{
          maxWidth: 345,
          height: 500,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          transition: "box-shadow 0.3s",
          "&:hover": {
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.4)",
            cursor: "pointer",
          },
        }}
        bgcolor="transparent"
      >
        <CardMedia
          component="img"
          height="350"
          image={posterUrl}
          alt={movie.title}
          sx={{ objectFit: "cover" }}
        />
        <Typography
          variant="h6"
          component="div"
          align="center"
          sx={{ p: 2, minHeight: 100 }}
        >
          {movie.title}
        </Typography>
      </Card>
      <MovieDialog movie={movie} open={open} handleClose={handleClose} />
    </>
  );
}

export default MovieCard;
