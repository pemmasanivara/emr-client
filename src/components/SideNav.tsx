import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import React from 'react';
import styled from 'styled-components';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import dashboardIcon from '../assets/dashboard_black_24dp.svg';
import userIcon from '../assets/contacts_black_24dp.svg';
import messagesIcon from '../assets/mail_outline_black_24dp.svg';
import filesIcon from '../assets/Files.svg';
import billingIcon from '../assets/receipt_long_black_24dp.svg';
import learnIcon from '../assets/Learn.svg';
import permissionIcon from '../assets/permission.svg';
import taskIcon from '../assets/list.svg';
import scheduleIcon from '../assets/event_available_black_24dp.svg';
import {
    NavLink
  } from "react-router-dom";

const drawerWidth = 170;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            background:"#222E3C",
            color: "#707070",
            top: "50px"
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(4) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(4) + 1,
            },
            background:"#222E3C",
            color: "#707070",
            top: "50px"
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(2),
        },
    }),
);
const StyledListItem = styled(ListItem)`
    padding-left: ${({theme}: any)=>theme.spacing(1)}px;
    padding-right: ${({theme}: any)=>theme.spacing(1)}px;
    a, a:link, a:hover, a:visited, a:focus {
        color: #707070;
        text-decoration: none;
    }
`;

const StyledListItemIcon = styled(ListItemIcon)`
    min-width:${({theme}: any)=> theme.spacing(4)}px;
    img {
        width: 16px;
    }
`;
export type SideNavProps = {
    open: boolean;
}

const activeStyle = {
    color: "#B7B7BB"
}

export function SideNav({open}: SideNavProps) {
    const classes = useStyles();


    return <Drawer variant="permanent" className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
    })}
        classes={{
            paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            }),
        }}>
            <List>
                <StyledListItem button key="dashboard">
                    <StyledListItemIcon><img src={dashboardIcon} /></StyledListItemIcon>
                    <NavLink  activeStyle={activeStyle} to="/dashboard" ><ListItemText primaryTypographyProps={{variant: "body2"}}>Dashboard</ListItemText></NavLink>
                </StyledListItem>
                <StyledListItem button key="Users">
                    <StyledListItemIcon><img src={userIcon} /></StyledListItemIcon>
                    <NavLink  activeStyle={activeStyle} to="/users"><ListItemText primaryTypographyProps={{variant: "body2"}}>Users</ListItemText></NavLink>
                </StyledListItem>
                <StyledListItem button key="messages">
                    <StyledListItemIcon><img src={messagesIcon} /></StyledListItemIcon>
                    <ListItemText primaryTypographyProps={{variant: "body2"}}>Messages</ListItemText>
                </StyledListItem>
                <StyledListItem button key="files">
                    <StyledListItemIcon><img src={filesIcon} /></StyledListItemIcon>
                    <ListItemText primaryTypographyProps={{variant: "body2"}}>Files</ListItemText>
                </StyledListItem>
                <StyledListItem button key="billing">
                    <StyledListItemIcon><img src={billingIcon} /></StyledListItemIcon>
                    <ListItemText primaryTypographyProps={{variant: "body2"}}>Billing</ListItemText>
                </StyledListItem>
                <StyledListItem button key="claims">
                    <StyledListItemIcon><img src={dashboardIcon} /></StyledListItemIcon>
                    <ListItemText primaryTypographyProps={{variant: "body2"}}>Claims</ListItemText>
                </StyledListItem>
                <StyledListItem button key="scheduling">
                    <StyledListItemIcon><img src={scheduleIcon} /></StyledListItemIcon>
                    <NavLink  activeStyle={activeStyle} to="/session"><ListItemText primaryTypographyProps={{variant: "body2"}}>Scheduling</ListItemText></NavLink>
                </StyledListItem>
                <StyledListItem button key="tasks">
                    <StyledListItemIcon><img src={taskIcon} /></StyledListItemIcon>
                    <ListItemText primaryTypographyProps={{variant: "body2"}}>Tasks</ListItemText>
                </StyledListItem>
                <StyledListItem button key="team">
                    <StyledListItemIcon><img src={learnIcon} /></StyledListItemIcon>
                    <ListItemText primaryTypographyProps={{variant: "body2"}}>Learn</ListItemText>
                </StyledListItem>
                <StyledListItem button key="permissions">
                    <StyledListItemIcon><img src={permissionIcon} /></StyledListItemIcon>
                    <ListItemText primaryTypographyProps={{variant: "body2"}}>Permissions</ListItemText>
                </StyledListItem>
            </List>
        </Drawer>
}