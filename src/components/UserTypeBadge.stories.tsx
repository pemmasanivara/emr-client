import { Meta, Story} from '@storybook/react/types-6-0';
import { UserTypeBadge, UserTypeBadgeProps } from './UserTypeBadge';

export default {
    title: "Components  / User Type Badge",
    component: UserTypeBadge
} as Meta;




export const UserTypeStory: Story<UserTypeBadgeProps> = (args) => {
    return <UserTypeBadge {...args} />
}

UserTypeStory.args = {
    variant: "Client"
}

UserTypeStory.storyName = "User Type Badge"