import {Meta, Story} from '@storybook/react/types-6-0';
import { UserGrid } from './UserGrid';
import {UserData} from './user-data';

export default {
    title: "Components / User Grid",
    component: UserGrid
}

export const UserGridStory = (args: any) => {
    return (<div className="ag-theme-material" style={{ height: 700, width: 960, padding: "10px" }}><UserGrid users={UserData} 
        onEditUser={()=>{}}
        onDeleteUser={()=>{}}
        {...args} />
        </div>)
}

UserGridStory.storyName = "User Grid"