import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import DeleteIcon from '@material-ui/icons/Delete';
import editIcon from '../../assets/edit_btn.svg';
import deleteIcon from '../../assets/delete_btn.svg';
import IconButton from '@material-ui/core/IconButton';
import { UserType } from '../../components/UserType';
import React from 'react';
import { UserTypeBadge } from '../../components/UserTypeBadge';
import calendarIcon from '../../assets/schedulelist_icon.svg';

import {
    Link
} from "react-router-dom";




export type UserGridProps = {
    users: any;
    onEditUser: (data: any) => void;
    onDeleteUser: (id: any) => void;
}
const variantConfig: { [key in UserType]: React.CSSProperties } = {
    "Employee": { backgroundColor: 'rgba(218, 245, 246, 0.63)' },
    "Generic": { backgroundColor: 'rgba(216, 226, 242, 0.63)' },
    "Provider": { backgroundColor: "rgba(242, 227, 216, 0.63)" },
    "Client": { backgroundColor: "rgba(235, 248, 222, 0.63)" },
}

export function UserGrid({ users,
    onDeleteUser: onUserDefinedDeleteUser,
    onEditUser: onUserDefinedEditUser }: UserGridProps) {

    function onEditUser(params: any) {
        onUserDefinedEditUser(params.data)
    }

    function onDelete(params: any) {
        onUserDefinedDeleteUser(params.data.id)
    }

    const UserBadgeCellRenderer = (params: any) => {
        return <UserTypeBadge variant={params.data.extension_15c35030a9a64ce89a2327a12e9bf38c_userType || "Generic"} />
    }


    const ActionCellRenderer = (params: any) => {
        console.log(params);
        return <div>
            <Link
                to={{
                    pathname: "/session",
                    search: `?id=${params.data.id}`,
                    state: { selectedUser: params.data }
                }}
            ><img src={calendarIcon} style={{ width: "14px", cursor: "pointer", marginRight: "10px" }} /></Link>
            <img src={editIcon} onClick={(e) => { e.preventDefault(); onEditUser(params) }} style={{ width: "14px", cursor: "pointer", marginRight: "10px" }} />
            <img src={deleteIcon} onClick={(e) => { e.preventDefault(); onDelete(params) }} style={{ width: "14px", cursor: "pointer" }} />
        </div>
    }

    const getRowStyle = (params: any) => {
        //@ts-ignore
        return { font: "normal normal normal 12px Poppins", color: "#000 !important", borderRadius: "5px", borderBottom: "2.5px solid #fff", borderTop: "2.5px solid #fff", ...variantConfig[params.data.extension_15c35030a9a64ce89a2327a12e9bf38c_userType || "Generic"] };
    };

    return <AgGridReact
        suppressCellSelection={true}
        getRowStyle={getRowStyle}
        headerHeight={30}
        rowData={users}
        rowHeight={40}
        frameworkComponents={{
            userBadgeCellRenderer: UserBadgeCellRenderer,
            actionCellRenderer: ActionCellRenderer
        }}
    >
        <AgGridColumn width={80} cellStyle={{ display: "flex", alignItems: "Center", lineHeight: "30px" }} field="id" headerName="Id" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn width={120} cellStyle={{ display: "flex", alignItems: "Center", lineHeight: "30px" }} cellRenderer="userBadgeCellRenderer" field="extension_15c35030a9a64ce89a2327a12e9bf38c_userType" headerName="Type" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn width={120} cellStyle={{ display: "flex", alignItems: "Center", lineHeight: "30px" }} field="extension_15c35030a9a64ce89a2327a12e9bf38c_dob" headerName="Dob" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn width={120} cellStyle={{ display: "flex", alignItems: "Center", lineHeight: "30px" }} field="extension_15c35030a9a64ce89a2327a12e9bf38c_gender" headerName="Gender" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn width={150} flex={1} cellStyle={{ display: "flex", alignItems: "Center", lineHeight: "30px" }} field="givenName" headerName="First Name" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn width={150} flex={1} cellStyle={{ display: "flex", alignItems: "Center", lineHeight: "30px" }} field="surname" headerName="Last Name" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn width={150} cellStyle={{ display: "flex", alignItems: "Center", lineHeight: "30px" }} field="surname" headerName="Actions" cellRenderer="actionCellRenderer"></AgGridColumn>
    </AgGridReact>
}
