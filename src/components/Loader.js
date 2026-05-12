import React from "react";
import { CircularProgress, Box } from "@mui/material";

export default function Loader() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="60vh"
    >
     <CircularProgress aria-label="loading" size={50}/> 
    </Box>
  );
}
