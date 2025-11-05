import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = ({ text = "Chargement...", size = 50, color = "primary" }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <CircularProgress size={size} color={color} />
            {text && (
                <Typography variant="body1" mt={2}>
                    {text}
                </Typography>
            )}
        </Box>
    );
};

export default Loader;