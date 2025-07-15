
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";

import AppTheme from "../shared-theme/AppTheme.jsx";
import ColorModeSelect from "../shared-theme/ColorModeSelect.jsx";
import SignInCard from "../components/SignInCard.jsx";
import Content from "../components/Content.jsx";

export default function Auth() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />

      {/* light/dark toggle */}
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />

      {/* full‑height flex box */}
      <Stack
        direction="column"
        component="main"
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            zIndex: -1,
            backgroundImage: (theme) =>
              theme.palette.mode === "light"
                ? "radial-gradient(ellipse at 50% 50%, hsl(210,100%,97%), hsl(0,0%,100%))"
                : "radial-gradient(ellipse at 50% 50%, hsla(210,100%,16%,0.5), hsl(220,30%,5%))",
            backgroundRepeat: "no-repeat",
          },
        }}
      >
        {/* layout for text + card */}
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          spacing={{ xs: 6, sm: 12 }}
          sx={{ p: 2, alignItems: "center" }}
        >
          <Content />
          <SignInCard />
        </Stack>
      </Stack>
    </AppTheme>
  );
}
