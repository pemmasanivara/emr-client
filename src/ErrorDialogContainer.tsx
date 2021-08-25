import { useEffect } from 'react';
import { Backdrop } from "@material-ui/core";
import { useGlobalStore, useGlobalStoreAction } from "AppStore";
import { ErrorDialog } from "components/ErrorDialog";
import { useQueryClient } from "react-query";

export function ErrorDialogContainer() {
    const { errorMessage } = useGlobalStore();
    const updateGlobalStore = useGlobalStoreAction();


    const queryClient = useQueryClient();
    useEffect(() => {
        const mutationCache = queryClient.getMutationCache();
        const unsubscribe = mutationCache.subscribe((mutation) => {
            if (mutation && mutation?.state.error) {
                if (updateGlobalStore) {
                    updateGlobalStore({
                        type: "setErrorMessage",
                        value: {
                            type: "error",
                            message: ((mutation.state.error as APIError).message)
                        }
                    })
                }
            }
        })
        return () => {
            unsubscribe();
        }
    }, [])


    if (!errorMessage) {
        return null;
    }

    return <Backdrop open={true}>
        <ErrorDialog
            message={errorMessage.message}
            type="error"
            primaryButtonText="OK"
            onHandleSuccess={() => {
                if (updateGlobalStore) {
                    updateGlobalStore({
                      type: "resetProgressAndErrorMessage"  
                    })
                }
            }}
        />
    </Backdrop>
}