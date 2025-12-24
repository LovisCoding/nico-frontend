import React from "react";
import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/system";

// Animation de pulsation
const pulse = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.7;
  }
`;

const Loader = ({ text = null, size = 100 }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            width="100%"
            position="fixed"
            top={0}
            left={0}
            zIndex={9999}
            bgcolor="background.default" // optionnel: fond opaque
        >
            <Box
                component="img"
                src="/logo.png"
                alt="Loading..."
                sx={{
                    width: size,
                    height: "auto",
                    animation: `${pulse} 2s infinite ease-in-out`,
                }}
            />
            {text && (
                <Typography variant="body1" mt={2} sx={{ opacity: 0.8 }}>
                    {text}
                </Typography>
            )}
        </Box>
    );
};

export default Loader;