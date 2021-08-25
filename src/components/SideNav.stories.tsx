import {Meta, Story} from '@storybook/react/types-6-0';
import { SideNav, SideNavProps } from './SideNav';

export default {
    title: "Components / Side Nav",
    component: SideNav
}

export const SideNavStory: Story<SideNavProps> = (args) => {
    return <SideNav {...args} />
}

SideNavStory.storyName = "Side Nav"