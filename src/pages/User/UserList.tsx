import { useUsers } from "./useUsers";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { Typography, Paper } from '@material-ui/core';
import { Button } from '../../components/Button';
import { CreateUser } from './CreateUser/CreateUser';
import { useState } from "react";
import { EditUser } from "./EditUser";
import { UserGrid } from "./UserGrid";
import RefreshIcon from '@material-ui/icons/Refresh';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddIcon from '@material-ui/icons/Add';
import { ErrorDialog } from "components/ErrorDialog";

export function UserList() {
    const {reFetchUsers, users, createUser, showNewUser, setShowNewUser, selectedUser, editUser, updateUserApi, setSelectedUser, deleteUser } = useUsers();
    const [deleteUserId, setDeleteUserId] = useState<string | undefined>(undefined);
    function onCloseNewUserDialog() {
        setShowNewUser(false);
    }

    function onCloseEditUserDialog() {
        setSelectedUser(undefined)
    }

    function onSave(data: any) {
        createUser(data)
    }


    function onUpdate(data: any) {
        updateUserApi(data);
    }

    function onConfirmDeleteUser() {
        if (deleteUserId) {
            deleteUser(deleteUserId)
            setDeleteUserId(undefined)
        }
    }

    function onCancelDelete() {
        setDeleteUserId(undefined);
    }
    function onDeleteUser(userId: any) {
        setDeleteUserId(userId);
    }


    return (
        <Paper style={{ padding: "10px", margin: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center"  }}><Typography variant="h6">Users</Typography>
                <div style={{ flex: "1"}} />
                <RefreshIcon style={{marginRight: "10px"}} onClick={()=>{reFetchUsers()}} />
                <Button variant="contained" type="primary" curvedBorder={false}
                    endIcon={<AddIcon />}
                    onClick={() => { setShowNewUser(true) }}
                >Add User</Button>
            </div>
            <div className="ag-theme-material" style={{ flex: 1, height: "100%" }}>
                <UserGrid
                    users={users}
                    onEditUser={editUser}
                    onDeleteUser={onDeleteUser}
                />
            </div>
            {
                showNewUser && <CreateUser handleClose={onCloseNewUserDialog} onSave={onSave} />
            }
            {
                selectedUser && <EditUser handleClose={onCloseEditUserDialog} onSave={onUpdate} userData={selectedUser} />
            }
            {
                deleteUserId && <ErrorDialog type="error" onHandleSuccess={onConfirmDeleteUser} onHandleCancel={onCancelDelete} primaryButtonText="Confirm delete" showCancelButton={true} message="Are you sure?  This action cannot be undone." />
            }
        </Paper>
    )
}