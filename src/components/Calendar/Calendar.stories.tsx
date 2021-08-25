import { Meta, Story } from "@storybook/react/types-6-0";
import { Calendar, CalendarProps } from './Calendar';
import styled from 'styled-components';
export default {
    title: "Components / Calendar",
    component: Calendar,
    argTypes: {
        title: {
            control: "text",
        }
    }
} as Meta


export const CalendarStory: Story<CalendarProps & { title: string }> = ({ title, ...args }) => {
    return <div style={{width: "100%",flex: 1, height: "500px", display: "flex"}}>
    <Calendar {...args} />
    </div>
}


CalendarStory.storyName = "Calendar";
 