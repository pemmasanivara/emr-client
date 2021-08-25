import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogActions, DialogContent, Typography } from '@material-ui/core';
import { Button, ButtonProps } from './Button';
import errorDialogIcon from '../assets/popup_error.svg';

export type ErrorDialogProps = {
    onHandleSuccess: () => void;
    onHandleCancel?: () => void;
    message?: string;
    type?: "success" | "error"
    primaryButtonText?: string;
    cancelButtonText?: string;
    showCancelButton?: boolean;
}

export const colorConfig: {[key: string]: {color: string}} = {
    "secondary": {color: "#2D56B2"},
    "success": {color: "#6EB329"},
    "primary": {color: "#182554"},
    "error": {color: "#FF0000"},
    "disabled": {color: "#B7B7BB"},
    "warning": {color: "#ff9800"},
}


export function ErrorDialog({type="success", cancelButtonText = "Cancel", showCancelButton= false, message = "Unexpected erorr occured please try again", primaryButtonText = "Try Again", onHandleCancel, onHandleSuccess }: ErrorDialogProps) {
    return <Dialog
        open={true}
        PaperProps={{ style: { padding: "25px" } }}
    >
        <DialogContent style={{ display: "flex",padding: "0px" }}>
            <img src={errorDialogIcon} style={{ width: "90px" }} />
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "25px", justifyContent: "space-between" }}>
                <Typography variant="body1" style={{ marginLeft: "10px", ...colorConfig[type] }}> {message} </Typography>
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                {showCancelButton && <Button variant="outlined" onClick={onHandleCancel} type="primary" style={{marginRight: "20px"}}>{cancelButtonText}</Button>}
                <Button variant="contained" type={type} onClick={onHandleSuccess}>{primaryButtonText}</Button>
                </div>
            </div>
        </DialogContent>

    </Dialog>
}