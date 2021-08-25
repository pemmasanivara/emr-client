import {Story, Meta} from '@storybook/react/types-6-0';
import { SnackMessage, SnackMessageProps } from './SnackMessage';
export default {
    title: "Components / Snack Message",
    component: SnackMessage
}

export const SnackMessageStory: Story<SnackMessageProps> = (args) => {
    return <SnackMessage {...args} />
}

SnackMessageStory.storyName = "Snack Message"