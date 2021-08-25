import { createContext, useState, Dispatch, useContext, useReducer } from 'react';
import produce from "immer"

interface GlobalMessage {
  message: string;
  type: 'error' | 'warning' | 'info';
}

type GlobalStore = {
  showProgress?: Boolean;
  errorMessage?: GlobalMessage | null;
  snackMessage?: string | null;
  search: { [key: string]: any };
}

const initialState: GlobalStore = {
  showProgress: false,
  errorMessage: null,
  search: {}
};

const GlobalStoreContext = createContext<GlobalStore>(initialState);

// type StoreAction = (props: GlobalStore) => void;
type StoreAction = {
  type: "toggleProgress",
  value: boolean
} | {
  type: "setErrorMessage",
  value: GlobalMessage | null
}
| {
  type: "setSnackMessage",
  value: string | null
}

  | {
    type: "resetProgressAndErrorMessage",
  }

  | {
    type: "setSearch",
    value: { [key: string]: any }
  }
const GlobalStoreActionContext = createContext<Dispatch<StoreAction> | null>(null);

function reducer(state: GlobalStore, action: StoreAction) {
  return produce(state, (draftState) => {
    switch (action.type) {
      case 'toggleProgress':
        draftState.showProgress = action.value
        break;
      case 'setErrorMessage':
        draftState.errorMessage = action.value
        if (draftState.errorMessage) {
          draftState.showProgress = false;
        }
        break;
      case 'resetProgressAndErrorMessage':
        draftState.errorMessage = null;
        draftState.showProgress = false;
        break;
      case 'setSearch':
        draftState.search = {
          ...draftState.search,
          ...action.value
        }
        break;
      case 'setSnackMessage': {
        draftState.snackMessage = action.value
        if (draftState.snackMessage) {
          draftState.showProgress = false;
        }
        break;
      }
      default:
        throw new Error();
    }
    return draftState;
  })
}

export function GlobalStoreProvider({ children }: any): JSX.Element {
  const [state, setState] = useReducer(reducer, initialState);
  

  return (
    <GlobalStoreContext.Provider value={state}>
      <GlobalStoreActionContext.Provider value={setState}>
        {children}
      </GlobalStoreActionContext.Provider>
    </GlobalStoreContext.Provider>
  );
}

export function useGlobalStore() {
  const context = useContext(GlobalStoreContext);
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider');
  }
  return context;
}

export function useGlobalStoreAction() {
  const context = useContext(GlobalStoreActionContext);
  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider');
  }
  return context;
}
