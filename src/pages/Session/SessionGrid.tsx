import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import calendarIcon from '../../assets/schedulelist_icon.svg';
import { UserType } from '../../components/UserType';
import React from 'react';
import { UserTypeBadge } from '../../components/UserTypeBadge';

export type SessionGridProps = {
    users: any;
    onEditUser: (data: any) => void;
    onDeleteUser: (id: any) => void;
}
const variantConfig: { [key in UserType]: React.CSSProperties } = {
    "Employee": { backgroundColor: "#DAF5F6" },
    "Generic": { backgroundColor: "#D8E2F2" },
    "Provider": { backgroundColor: "#F2E3D8" },
    "Client": { backgroundColor: "#EBF8DE" },
}

export function SessionGrid({ users,
    onDeleteUser: onUserDefinedDeleteUser,
    onEditUser: onUserDefinedEditUser }: SessionGridProps) {

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
        return <div>
            <img src={calendarIcon} onClick={(e) => { e.preventDefault(); onEditUser(params) }} style={{ width: "14px", cursor: "pointer", marginRight: "10px" }} />
        </div>
    }

    const getRowStyle = (params: any) => {
        //@ts-ignore
        return { font: "normal normal normal 12px Poppins", color: "#000 !important", borderRadius: "5px", opacity: 0.63, borderBottom: "2.5px solid #fff", borderTop: "2.5px solid #fff", ...variantConfig[params.data.extension_15c35030a9a64ce89a2327a12e9bf38c_userType || "Generic"] };
    };

    return <AgGridReact
        suppressCellSelection={true}
        getRowStyle={getRowStyle}
        rowData={users}
        headerHeight={30}
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
        <AgGridColumn width={150} cellStyle={{ display: "flex", alignItems: "Center", lineHeight: "30px" }} field="givenName" headerName="First Name" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn width={150} cellStyle={{ display: "flex", alignItems: "Center", lineHeight: "30px" }} field="surname" headerName="Last Name" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn width={150} cellStyle={{ display: "flex", alignItems: "Center", lineHeight: "30px" }} field="surname" headerName="Actions" cellRenderer="actionCellRenderer"></AgGridColumn>
    </AgGridReact>
}
