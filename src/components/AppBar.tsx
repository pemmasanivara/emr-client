import InputBase from '@material-ui/core/InputBase';
import searchIcon from "../assets/search_black_24dp.svg";
import format from 'date-fns/format';
import { Typography, useTheme } from '@material-ui/core';
import { UserAvatar } from './UserAvatar';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {  useMsal } from "@azure/msal-react";
import { useGlobalStoreAction } from 'AppStore';
import { useLocation, useRouteMatch } from 'react-router';
import { SessionAppBarSearch } from 'pages/Session/SessionAppBarSearch';
import { CSSProperties } from 'react';
export type AppBarProps = {}




export function AppBar(props: AppBarProps) {

    const theme = useTheme();
    const {accounts} = useMsal();
    const updateGlobalStore = useGlobalStoreAction();
    const style: CSSProperties ={marginLeft: "30px", flex: 1, transition: theme.transitions.create('width')};
    
    const location = useLocation();

    const appSearchBarConfig: any = {
        "/session": <SessionAppBarSearch  style={style} onSearchTextChange={onSearchTextChange} />,
    }
    

    function onDefaultSearchValueChange(event: any) {
        onSearchTextChange(event.target.value);
    }
    
    function onSearchTextChange(searchValue: any) {

        const searchText: {[key: string]: any} = {[`${location.pathname}`]: searchValue};

        if (updateGlobalStore) {
            updateGlobalStore({type: "setSearch", value: searchText})
        }
    }
    return <div style={{
        flex: 1,
        padding: "0px 30px",
        display: "flex", width: "6xp", justifyContent: "space-between", alignItems: "center", height: "50px", background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 4px 14px #00000008"
    }}>
        <img style={{width: "65px"}} src="https://www.lifelabkids.org/assets/images/common/logo.png" />
        <div style={{ flex: 1, display: "flex",  border: "1px solid #B7B7BB", borderRadius: "5px", alignItems: "center", margin: "0px 70px" }}>
            {appSearchBarConfig[location.pathname] || <InputBase placeholder="search" style={style} onChange={onDefaultSearchValueChange} />}
            <div style={{ width: "1px", height: "20px", margin: "0px 10px", background: "#b7b7bb" }}></div>
            <img src={searchIcon} style={{ width: "18px", marginRight: "10px" }} />
        </div>
        <div style={{display: "flex", alignItems: "center", marginRight: "20px"}}>
            <NotificationsNoneIcon style={{color:"#FF9100", width: "18px", marginRight: "25px" }} />
            <ChatBubbleOutlineIcon style={{color:"#FF9100", width: "18px", marginRight: "25px" }}  />
            <FullscreenIcon style={{color:"#FF9100", width: "18px"}}  />
        </div>
        <div style={{display: "flex", alignItems: "center"}}>
            <div>
                <Typography variant="body2">{format(new Date(), "dd MMM")}</Typography>
                <Typography variant="body2">{format(new Date(), "EEE")}</Typography>
            </div>
            <div style={{marginLeft: "20px", display:"flex", alignItems: "center"}}>
                
               <UserAvatar name={(accounts[0] as any).name} type="Client"  />
               <KeyboardArrowDownIcon  style={{color:"#FF9100", width: "18px", marginLeft: "15px"}} />
            
            </div>
        </div>
    </div >
}