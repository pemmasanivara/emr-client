import { Typography } from '@material-ui/core';
import profilePic from '../assets/profile_pic_small.svg';
import { UserType } from './UserType';

export type UserAvatarProps = {
    name: string;
    type: UserType;
    height?: string;
}

export function UserAvatar({name, type, height="40px"}: UserAvatarProps) {
    return <div style={{display: "flex", alignItems:"center"}}>
        <img src={profilePic} style={{height: height}} />
        <div style={{marginLeft: "10px"}}>
            <Typography variant="body2">{name}</Typography>
            <Typography variant="body2" style={{color: "#257275"}}>{type}</Typography>
        </div>
    </div>
}