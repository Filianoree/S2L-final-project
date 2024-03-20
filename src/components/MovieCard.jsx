// MovieCard.js
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardMedia, Typography } from "@mui/material";

function MovieCard({ movie }) {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
      <Card
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
    </Link>
  );
}

export default MovieCard;
