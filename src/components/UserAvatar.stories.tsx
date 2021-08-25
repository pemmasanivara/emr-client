import {Story, Meta} from '@storybook/react/types-6-0';
import { UserAvatar, UserAvatarProps } from './UserAvatar';
export default {
    title: "components / User Avatar",
    component: UserAvatar
}

export const UserAvatarStory: Story<UserAvatarProps> = (args) => {
    return <UserAvatar {...args} />
}


UserAvatarStory.storyName = "User Avatar";