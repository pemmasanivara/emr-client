import { StylesProvider, createMuiTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const theme = createMuiTheme({
  typography: {
    fontFamily: "Poppins"
  }
});

export const decorators = [
  (Story) => (
    <div style={{ margin: '3em' }}>
      <QueryClientProvider client={queryClient}>
        <MuiThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
              <CssBaseline />

              <Story />
            </ThemeProvider>
          </StylesProvider>
        </MuiThemeProvider>
      </QueryClientProvider>
    </div>
  ),
];