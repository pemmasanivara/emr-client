import React from 'react';
import { useIsFetching } from 'react-query';
import { useGlobalStore } from '../AppStore';
import { CircularProgress } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';

export default function ({ isLoading }: any) {
    const isFetching = useIsFetching();
    const { showProgress } = useGlobalStore();
    return (
        <>
            {(isLoading || isFetching || showProgress) && (
                <div style={{ zIndex: 100000 }}>
                    <Backdrop open={true}>
                        <CircularProgress />
                    </Backdrop>
                </div>
            )}
        </>
    );
}
