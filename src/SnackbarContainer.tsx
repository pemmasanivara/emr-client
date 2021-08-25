import {useEffect} from 'react';
import { useGlobalStore, useGlobalStoreAction } from "AppStore";
import { SnackMessage } from "components/SnackMessage";
import {SnackbarCloseReason} from '@material-ui/core';

export function SnackbarContainer() {
    const {snackMessage} = useGlobalStore();
    const updateGlobalStore = useGlobalStoreAction();

    function onSnackMessageClose(event: any, reason: SnackbarCloseReason) {
        if (reason === "clickaway") {
          return;
        }
    
        if (updateGlobalStore) {
            updateGlobalStore({type: "setSnackMessage", value: null});
        }
      }

    if (!snackMessage) {return null}
    
    return (<SnackMessage 
        type="success"
        message={snackMessage }
        onClose={onSnackMessageClose}
    />)
}