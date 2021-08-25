import React, { useEffect, useState } from 'react';
import { StylesProvider, createMuiTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider, AuthenticatedTemplate,  useMsal } from "@azure/msal-react";

import { ThemeProvider } from 'styled-components';
import { EventType, InteractionType } from "@azure/msal-browser";
import { msalConfig, loginRequest, b2cPolicies } from "./authConfig";
import { MainNavBar } from './MainNavBar';
import axios from 'axios';
import {
  BrowserRouter as Router,
} from "react-router-dom";

import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
  MutationCache
} from 'react-query'
import { SideNav } from './components/SideNav';
import Loader from './components/Loader';
import { GlobalStoreProvider, useGlobalStoreAction } from './AppStore';
import { ErrorDialogContainer } from 'ErrorDialogContainer';
import { SnackbarContainer } from 'SnackbarContainer';
import { AppRouter } from 'AppRouter';


axios.defaults.headers.common = {
  "Ocp-Apim-Subscription-Key": process.env.REACT_APP_API_SUBSCRIPTION_KEY,
  "X-CSRFToken": "example-of-custom-header"
};


const theme = createMuiTheme({
  typography:  {
    fontFamily:"Poppins"
  }
});

type AppProps = {
  msalInstance: PublicClientApplication
}

function MainContent() {
  const [expandSideNav, setExpandSideNav] = useState<boolean>(false);
  const msalInstance = useMsal();
  const { instance, accounts, inProgress } = msalInstance;

  /**
   * Using the event API, you can register an event callback that will do something when an event is emitted. 
   * When registering an event callback in a react component you will need to make sure you do 2 things.
   * 1) The callback is registered only once
   * 2) The callback is unregistered before the component unmounts.
   * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/events.md
   */
  useEffect(() => {
    const callbackId = instance.addEventCallback((event: any) => {
      if (event.eventType === EventType.LOGIN_FAILURE) {
        if (event.error && event.error.errorMessage.indexOf("AADB2C90118") > -1) {
          if (event.interactionType === InteractionType.Redirect) {
            //@ts-ignore
            instance.loginRedirect(b2cPolicies.authorities.forgotPassword);
          } else if (event.interactionType === InteractionType.Popup) {
            //@ts-ignore
            instance.loginPopup(b2cPolicies.authorities.forgotPassword)
              .catch(e => {
                return;
              });
          }
        }
      }

      if (event.eventType === EventType.LOGIN_SUCCESS) {
        if (event?.payload) {
          /**
           * We need to reject id tokens that were not issued with the default sign-in policy.
           * "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr").
           * To learn more about B2C tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
           */
          if (event.payload.idTokenClaims["acr"] === b2cPolicies.names.forgotPassword) {
            window.alert("Password has been reset successfully. \nPlease sign-in with your new password");
            return instance.logout();
          }
        }
      }
    });
    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, []);

  useEffect(() => {
    if (accounts.length === 0 && inProgress === "none") {
      instance.loginRedirect(loginRequest)
    }
  }, [accounts, inProgress])

  console.log("Accounts", accounts);
  return (
    <AuthenticatedTemplate>
      <MainNavBar />
      <div style={{ display: "flex", flex: 1 }}>
        <div onMouseEnter={() => { setExpandSideNav(true) }} onMouseLeave={() => { setExpandSideNav(false) }} >
          <SideNav open={expandSideNav} />
        </div>
        <AppRouter />
      </div>
    </AuthenticatedTemplate>
  )

}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
});


function App({ msalInstance }: AppProps) {


  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  useMsal();

  useEffect(() => {

  }, [])
  return (
    <MsalProvider instance={msalInstance}>
      <Router>
        <QueryClientProvider client={queryClient}>
          <MuiThemeProvider theme={theme}>
            <StylesProvider injectFirst>
              <ThemeProvider theme={theme}>
                <GlobalStoreProvider >
                  <CssBaseline />
                  <MainContent />
                  <Loader />
                  <ErrorDialogContainer />
                  <SnackbarContainer />
                </GlobalStoreProvider>
              </ThemeProvider>
            </StylesProvider>
          </MuiThemeProvider>
        </QueryClientProvider>
      </Router>
    </MsalProvider>
  );
}

export default App;
