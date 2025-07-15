// import React from "react";
// import IconButton from "@mui/material/IconButton";
// import LightModeIcon from "@mui/icons-material/LightMode";
// import DarkModeIcon from "@mui/icons-material/DarkMode";
// import Tooltip from "@mui/material/Tooltip";
// import { useTheme } from "@mui/material/styles";
// import { useColorMode } from "./AppTheme";

// export default function ColorModeSelect(props) {
//   const theme = useTheme();
//   const { toggle } = useColorMode();

//   return (
//     <Tooltip title="Toggle light/dark mode">
//       <IconButton aria-label="toggle color mode" onClick={toggle} {...props}>
//         {theme.palette.mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
//       </IconButton>
//     </Tooltip>
//   );
// }


import * as React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import { ColorModeContext } from './AppTheme';

/**
 * Small floating button that lets the user switch
 * between light, dark, and system modes.
 */
export default function ColorModeSelect(props) {
  const { sx, ...rest } = props;
  const { toggleColorMode } = React.useContext(ColorModeContext);
  const [mode, setMode] = React.useState('system');

  const handleClick = () => {
    const next = mode === 'light' ? 'dark' : mode === 'dark' ? 'system' : 'light';
    setMode(next);
    if (next !== 'system') toggleColorMode();
  };

  const icon =
    mode === 'light' ? <WbSunnyIcon /> : mode === 'dark' ? <NightlightIcon /> : <DesktopWindowsIcon />;

  return (
    <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1200, ...sx }}>
      <Tooltip title={`Switch theme (${mode})`}>
        <IconButton color="inherit" onClick={handleClick} {...rest}>
          {icon}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
