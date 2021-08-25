
import React, { useState } from 'react';
import { Button } from 'components/Button';
import { Select, MenuItem, Dialog, TextField, } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import theraphyImage from 'assets/therapy.svg'
import organiserImage from 'assets/organiser.svg'
import attendeeImag from 'assets/attendee.svg'
import clockImage from 'assets/clock.svg'
import repeatImage from 'assets/repeat.svg'
import DateFnsUtils from '@date-io/date-fns';
import rightArrowImage from 'assets/right-arrow.svg';
import { ErrorDialog } from "components/ErrorDialog";

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { WeekdaySelection, WeekdayType } from 'components/WeekdaySelection';
import { addMinutes, format } from 'date-fns';
import { Session } from 'api/session';
import { parse } from 'date-fns/esm';

const RowItem = styled.div`
    display:flex;
    flex: 1;
    margin-bottom: 20px;
    .MuiAutocomplete-root {
        flex: 1;
        margin-left: 16px;
    }
    .MuiSelect-select {
        padding-top: 12px;
        padding-bottom: 12px;
    }
`;

const StyledImg = styled.img`
    width: 24px
`;

const DateSelectionWrapper = styled.div`
    display: flex;
    margin-left: 16px;
`;

export type NewSessionProps = {
    session?: Session,
    users: any[];
    handleClose: () => void;
    services: any[];
    onSave: (userData: any) => void;
    deleteSession?: (id: string) => void;
    updateSession?: (session: Session) => void;
}

type SessionState = {
    service?: any;
    providerId?: any;
    clientId?: any;
    startDate?: Date;
    startTime?: Date;
    endTime?: Date;
    repeatType?: string;
    customRepeatValues?: WeekdayType[];
    endDate?: Date | null;
}


export function NewSession({ updateSession, session, handleClose, deleteSession, onSave, users, services }: NewSessionProps) {

    const [errorMsg, setErrorMsg] = useState<any>({});
    const [deleteSessionId, setDeleteSessionId] = useState<string>();

    const initialState = session ? {
        service: services.filter((service) => service.label === session.service)[0],
        clientId: users.filter((user) => user.id === session.clientId)[0],
        providerId: users.filter((user) => user.id === session.providerId)[0],
        startDate: parse(session.startDate, "yyyy-MM-dd", new Date()),
        startTime: session.startTime ? parse(session.startTime, "HH:mm", parse(session.startDate, "yyyy-MM-dd", new Date())) : new Date(),
        endTime: session.startTime ? parse(session.endTime, "HH:mm", parse(session.startDate, "yyyy-MM-dd", new Date())) : new Date(),
        endDate: session.endDate ? parse(session.endDate, "yyyy-MM-dd", new Date()) : undefined,
        repeatType: session.repeatType,
        customRepeatValues: session.customRepeatValues
    } : {
        startDate: new Date(),
        startTime: new Date(),
        endTime: (addMinutes(new Date(), 30)),
        endDate: null,
        repeatType: "none"
    }


    const [state, setState] = useState<SessionState>(initialState)

    function onStartDateChange(date: any) {
        setState((prevState) => {
            return {
                ...prevState,
                startDate: date
            }
        })
    }

    function onStartTimeChange(date: any) {
        setState((prevState) => {
            return {
                ...prevState,
                startTime: date
            }
        })
    }

    function onEndTimeChange(date: any) {
        setState((prevState) => {
            return {
                ...prevState,
                endTime: date
            }
        })
    }

    function onEndDateChange(date: any) {
        setState((prevState) => {
            return {
                ...prevState,
                endDate: date
            }
        })
    }

    function onTextFieldChange(event: any) {
        setState((prevState) => {
            const newState = { ...prevState };
            // @ts-ignore
            newState[`${event.target.id}`] = event.target.value;
            return newState;
        });
    }

    function onServiceChange(event: any, value: any) {
        setState((prevState) => {
            return {
                ...prevState,
                service: value
            }
        })
    }

    function onProviderChange(event: any, value: any) {
        setState((prevState) => {
            return {
                ...prevState,
                providerId: value
            }
        })
    }

    function onClientChange(event: any, value: any) {
        setState((prevState) => {
            return {
                ...prevState,
                clientId: value
            }
        })
    }

    function onRepeatTypeChange(event: any) {
        setState((prevState) => {
            return {
                ...prevState,
                repeatType: event.target.value as string
            }
        });
    }



    function handleSave() {
        const newSession = {
            service: state.service!.label,
            providerId: state.providerId!.id,
            clientId: state.clientId!.id,
            startDate: format(state.startDate!, "yyyy-MM-dd"),
            endDate: state.endDate ? format(state.endDate!, "yyyy-MM-dd") : null,
            startTime: format(state.startTime!, "HH:mm"),
            endTime: format(state.endTime!, "HH:mm"),
            repeatType: state.repeatType,
            customRepeatValues: state.customRepeatValues

        }

        if (session && updateSession) {
            const sessionDetails: Session = {
                ...session,
                ...newSession
            }
            updateSession(sessionDetails)
        } else {
            console.log("new session", newSession);
            onSave(newSession);
        }
    }

    function onDeleteSession() {
        setDeleteSessionId(session?._id);
    }

    function onConfirmDeleteUser() {
        if (deleteSession && session) {
            deleteSession(session._id);
        }
    }

    function onCancelDelete() {
        setDeleteSessionId(undefined)
    }

    function onCustomRepeatValuesChange(values: WeekdayType[]) {
        setState((prevState) => {
            return {
                ...prevState,
                customRepeatValues: values
            }
        });
    }

    return (<Dialog
        fullWidth={true}
        maxWidth="md"
        open={true}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
    >
        <DialogTitle id="max-width-dialog-title" style={{ fontWeight: "bold", fontSize: "18px" }}>
            {session ? "Edit Session" : "New Session"}</DialogTitle>
        <DialogContent>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <RowItem>
                        <StyledImg src={theraphyImage} />
                        <Autocomplete options={services}
                            value={state.service}
                            onChange={onServiceChange}
                            getOptionLabel={(option: any) => option.label}
                            renderInput={(params) => <TextField {...params} label="Services" variant="outlined" size="small" />} />
                    </RowItem>
                    <RowItem>
                        <StyledImg src={organiserImage} />
                        <Autocomplete options={users}
                            value={state.providerId}
                            onChange={onProviderChange}
                            getOptionLabel={(option: any) => `${option.givenName} ${option.surname}`}
                            renderInput={(params) => <TextField {...params} label="Provider" variant="outlined" size="small" />} />
                    </RowItem>
                    <RowItem>
                        <StyledImg src={attendeeImag} />
                        <Autocomplete options={users}
                            value={state.clientId}
                            onChange={onClientChange}
                            getOptionLabel={(option: any) => `${option.givenName} ${option.surname}`}
                            renderInput={(params) => <TextField {...params} label="Client" variant="outlined" size="small" />} />
                    </RowItem>
                    <RowItem>
                        <StyledImg src={clockImage} />
                        <DateSelectionWrapper>
                            <KeyboardDatePicker
                                style={{ width: "180px", marginRight: "10px" }}
                                size="small"
                                disableToolbar
                                variant="inline"
                                format="yyyy-MM-dd"
                                margin="normal"
                                id="date-picker-inline"
                                label="Start Date"
                                value={state.startDate}
                                onChange={onStartDateChange}
                                inputVariant="outlined"
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardTimePicker
                                style={{ width: "180px", marginRight: "10px" }}
                                inputVariant="outlined"
                                size="small"
                                margin="normal"
                                id="time-picker"
                                label="Start Time"
                                value={state.startTime}
                                onChange={onStartTimeChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                            <img src={rightArrowImage} style={{ margin: "0px 16px" }} />
                            <KeyboardTimePicker
                                style={{ width: "180px", marginRight: "10px" }}
                                inputVariant="outlined"
                                size="small"
                                margin="normal"
                                id="time-picker"
                                label="End Time"
                                value={state.endTime}
                                onChange={onEndTimeChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </DateSelectionWrapper>
                    </RowItem>
                    <RowItem>
                        <StyledImg src={repeatImage} />
                        <div style={{ marginLeft: "16px", display:"flex", flex: 1 }}>
                            <Select
                                variant="outlined"
                                inputProps={{ size: "small" }}
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                value={state.repeatType}
                                onChange={onRepeatTypeChange}

                            >
                                <MenuItem value="none">
                                    <em>Does not repeat</em>
                                </MenuItem>
                                <MenuItem value={"Workingday"}>Every Weekday (Mon - Fri)</MenuItem>
                                <MenuItem value={"Daily"}>Daily</MenuItem>
                                <MenuItem value={"Weekly"}>Weekly</MenuItem>
                                <MenuItem value={"Monthly"}>Monthly</MenuItem>
                                <MenuItem value={"Custom"}>Custom</MenuItem>
                            </Select>
                            {
                                state.repeatType === "Custom" &&
                                <div style={{ marginLeft: "38px" }}>
                                    <WeekdaySelection onChange={onCustomRepeatValuesChange} value={state.customRepeatValues}/>
                                </div>
                            }
                        </div>
                    </RowItem>
                    {/* {
                        state.repeatType === "Custom" && <RowItem style={{ display: "flex", flexDirection: "column" }}>
                            <label>Range of Occurence</label>
                            <div style={{ marginLeft: "38px" }}>
                                <WeekdaySelection />
                            </div>
                        </RowItem>
                    } */}

                    {
                        state.repeatType !== "none" && <RowItem>
                            <StyledImg src={clockImage} />
                            <DateSelectionWrapper>
                                <KeyboardDatePicker
                                    style={{ width: "180px", marginRight: "10px" }}
                                    inputVariant="outlined"
                                    size="small"
                                    disableToolbar
                                    variant="inline"
                                    format="yyyy-MM-dd"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="End Date"
                                    value={state.endDate}
                                    onChange={onEndDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </DateSelectionWrapper>
                        </RowItem>
                    }
                </div>
            </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} type="primary" variant="outlined">
                Cancel
          </Button>
            {
                session &&

                <Button onClick={onDeleteSession} type="error" variant="outlined">
                    Delete
          </Button>

            }

            <Button onClick={handleSave} type="success" variant="contained">
                {session ? "Update Session" : "Schedule Session"}
            </Button>
        </DialogActions>
        {deleteSessionId && <ErrorDialog type="error" onHandleSuccess={onConfirmDeleteUser} onHandleCancel={onCancelDelete} primaryButtonText="Confirm delete" showCancelButton={true} message="Are you sure?  This action cannot be undone." />}
    </Dialog>)

}
