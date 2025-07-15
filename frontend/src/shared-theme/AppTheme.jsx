


import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, createTheme, CssBaseline, useMediaQuery } from '@mui/material';

// /**
//  * React context so any component can call
//  *   const { toggleColorMode } = React.useContext(ColorModeContext);
//  */
export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

/**
 * Wrap your page in <AppTheme> to get a light/dark palette
 * that defaults to the user’s system preference and can be toggled.
 */
export default function AppTheme({ children }) {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState(prefersDark ? 'dark' : 'light');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: { mode },
        shape: { borderRadius: 8 },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {/* Normalize styles & apply palette‑aware background */}
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

AppTheme.propTypes = {
  children: PropTypes.node.isRequired,
};
