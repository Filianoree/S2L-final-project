import React from "react";
import { Box, Typography, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "20px",
        textAlign: "center",
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="body1">Oday Deb - All Rights Reserved</Typography>
      <Box sx={{ display: "flex", marginTop: "10px" }}>
        <Link
          href="https://github.com/Filianoree"
          color="inherit"
          target="_blank"
          rel="noopener"
          sx={{ marginRight: "20px" }}
        >
          <GitHubIcon sx={{ fontSize: 30 }} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/oday-deb-b820311b0/"
          color="inherit"
          target="_blank"
          rel="noopener"
        >
          <LinkedInIcon sx={{ fontSize: 30 }} />
        </Link>
      </Box>
    </Box>
  );
}

export default Footer;
