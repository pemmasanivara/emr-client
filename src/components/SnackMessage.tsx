import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar, { SnackbarCloseReason, SnackbarProps } from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export type SnackMessageProps = {
    message: string;
    type?: "error" | "warning" | "info" | "success",
    onClose?: SnackbarProps["onClose"];
}

export  function SnackMessage({type, message, onClose}:SnackMessageProps) {

  return (
      <Snackbar open={true} autoHideDuration={6000} onClose={onClose}>
        <Alert severity={type}> {message} </Alert>
      </Snackbar>
  );
}
