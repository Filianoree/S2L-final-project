import React from "react";
import { Typography, Container } from "@mui/material";

function Home() {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", marginTop: "20px" }}>
      <Typography variant="h3" gutterBottom>
        Movie Finder Search App
      </Typography>
      <Typography variant="body1" paragraph>
        Explore thousands of movies and find your favorites with Movie Search
        App.
      </Typography>
    </Container>
  );
}

export default Home;
