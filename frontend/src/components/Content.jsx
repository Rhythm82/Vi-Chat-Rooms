import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import VideocamIcon from "@mui/icons-material/Videocam";

export default function Content() {
  return (
    <Stack spacing={3} sx={{ maxWidth: 380 }}>
      <VideocamIcon sx={{ fontSize: 64 }} />
      <Typography variant="h4" component="h1">
        Seamless conversations, wherever you are
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Connect instantly with friends, family, and colleagues—no downloads, no
        hassle. Start your high‑quality video meeting in seconds on any device.
      </Typography>
    </Stack>
  );
}
