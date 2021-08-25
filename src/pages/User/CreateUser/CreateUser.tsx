import React, { useState } from 'react';
import {Button} from '../../../components/Button';
import { Required } from "../../../components/Required";
import { Typography, Dialog, RadioGroup, Radio, TextField } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { UserType, UserTypeComponent } from '../../../components/UserType';
import styled from 'styled-components';
import { GenderSelect } from 'components/GenderSelect';

const AlignCenterWrapper = styled.div`
    display: flex;
    align-items: center;
`
export type CreateUserProps = {
    handleClose: () => void;
    onSave: (userData: any) => void;
}

// type CreateUserBasicType = {
//     firstNme: string;
//     lastName: string;
//     dob: string;
//     gender: "Male" | "Female" | "Non-Binary";
//     previousTheraphy:
// }

type UserState = {
    email?: string;
    userType: UserType;
    firstName?: string;
    lastName?: string;
    dob?: string;
    gender?: string;
}

export function CreateUser({ handleClose, onSave }: CreateUserProps) {

    
    const [state, setState] = useState<UserState>({userType: "Employee"})

    function handleUserTypeChange(event: any) {
        setState((prevState)=> { 
            return {...prevState, userType: event.target.value
            }
        });
    }

    function onSelectChange(event: any){
        setState((prevState)=> { 
            return {
                ...prevState,
                gender: event.target.value
            }
        });
    }

    console.log("State", state);

    function onTextFieldChange(event: any) {
        setState((prevState)=> { 
            const newState = {...prevState};
            // @ts-ignore
            newState[`${event.target.id}`] = event.target.value;
            return newState;
        });
    }

    function handleSave() {
        const newData = {
            givenName: state.firstName,
            surname: state.lastName,
            extension_15c35030a9a64ce89a2327a12e9bf38c_gender: state.gender,
            extension_15c35030a9a64ce89a2327a12e9bf38c_dob: state.dob,
            extension_15c35030a9a64ce89a2327a12e9bf38c_userType: state.userType,
            mailNickname: state.email
        }
        onSave(newData);
    }

    return (<Dialog
        fullWidth={true}
        maxWidth="md"
        open={true}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
    >
        <DialogTitle id="max-width-dialog-title">New User</DialogTitle>
        <DialogContent>
            <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="caption" style={{ fontWeight: "bold" }}>Select User Type<Required /></Typography>
                    <RadioGroup aria-label="gender" name="gender1" value={state.userType} onChange={handleUserTypeChange}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <AlignCenterWrapper>
                                <Radio value="Employee" size="small" />
                                <UserTypeComponent variant="Employee" />
                            </AlignCenterWrapper>
                            <AlignCenterWrapper>
                                <Radio value="Client" size="small" />
                                <UserTypeComponent variant="Client" />
                            </AlignCenterWrapper>
                            <AlignCenterWrapper>
                                <Radio value="Provider" size="small" />
                                <UserTypeComponent variant="Provider" />
                            </AlignCenterWrapper>
                            <AlignCenterWrapper>
                                <Radio value="Generic" size="small" />
                                <UserTypeComponent variant="Generic" />
                            </AlignCenterWrapper>
                        </div>

                    </RadioGroup>

                </div>
                <div style={{marginTop: "20px"}}>
                    <div style={{display: "flex", marginBottom: "20px"}}>
                        <TextField id="firstName" 
                        onChange={onTextFieldChange}
                        label="First Name" value={state.firstName} required={true} variant="outlined" size="small" style={{marginRight: "20px", flex: 1}} />
                        <TextField id="lastName" label="Last Name" onChange={onTextFieldChange} value={state.lastName} variant="outlined" size="small" style={{flex: 1}} />
                    </div>
                    <div style={{display: "flex", marginBottom: "20px"}}>
                        <TextField id="dob" label="Date of Birth"  onChange={onTextFieldChange} value={state.dob}  required={true} variant="outlined" size="small" style={{marginRight: "20px", flex: 1}} />
                        {/* <div style={{flex:1}}>
                            <GenderSelect style={{flex: 1}} id="gender" value={state.gender} onChange={onSelectChange} />
                        </div> */}
                        <TextField id="gender" label="Gender"  onChange={onTextFieldChange} value={state.gender}  variant="outlined" size="small" style={{flex: 1}} />
                    </div>
                    <div style={{display: "flex", marginBottom: "20px"}}>
                        <TextField id="email" label="Email"  onChange={onTextFieldChange} value={state.email}  required={true} variant="outlined" size="small" style={{marginRight: "20px", flex: 1}} />
                    </div>
                </div>
            </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} type="primary" variant="outlined">
                Cancel
          </Button>
            <Button onClick={handleSave} type="success" variant="contained">
                Create User
          </Button>
        </DialogActions>
    </Dialog>)

    // <div>
    // </div>
}
