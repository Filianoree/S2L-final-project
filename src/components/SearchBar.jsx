import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

function SearchBar({ onSearch, appBarStyle }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setError(true);
    } else {
      setError(false);
      onSearch(searchTerm);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", ...appBarStyle }}>
      <TextField
        label="Search Movies"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        size="small"
        sx={{
          marginRight: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          "& .MuiInputBase-root": {
            borderColor: error ? "red" : "rgba(0, 0, 0, 0.23)",
          },
          "& .MuiFormHelperText-root": {
            color: "red",
          },
        }}
        InputProps={{ style: { color: "black" } }}
        error={error}
        helperText={error ? "Inserire il nome di un film" : null}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
}

export default SearchBar;
