import { Box, Typography } from "@mui/material";

export const Upgrade = ({ isCollapsed }) => {
  return (
    <Box
      sx={{
        p: isCollapsed ? 1 : 2,
        background: isCollapsed
          ? "linear-gradient(45deg, #9c27b0, #673ab7)"
          : "linear-gradient(135deg, #3f51b5, #2196f3)",
        color: "white",
        borderRadius: "12px",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease",
      }}
    >
      {!isCollapsed ? (
        <>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 1,
            }}
          >
            Version 1.0.7
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontStyle: "italic",
            }}
          >
            Enjoy the latest updates!
          </Typography>
        </>
      ) : (
        <Typography
          variant="caption"
          sx={{
            fontStyle: "italic",
            opacity: 0.8,
          }}
        >
          v1.0.7
        </Typography>
      )}
    </Box>
  );
};
