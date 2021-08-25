import {Meta, Story } from "@storybook/react/types-6-0";
import { UserTypeComponentProps, UserTypeComponent } from "./UserType";

export default {
    title: "Components  / User Type",
    component: UserTypeComponent
} as Meta;


export const UserTypeStory: Story<UserTypeComponentProps> = (args) => {
    return <UserTypeComponent {...args} />
}

UserTypeStory.args = {
    variant: "Client"
}

UserTypeStory.storyName = "User Type"