import {Story, Meta} from '@storybook/react/types-6-0';
import { AppBar, AppBarProps } from './AppBar';

export default {
    title: "components / App Bar",
    component: AppBar
}

export const AppBarStory: Story<AppBarProps> = (args) => {
    return <AppBar {...args} />
}

AppBarStory.storyName = "App Bar"