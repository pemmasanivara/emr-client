import { } from "@material-ui/core";
import { Meta, Story } from "@storybook/react/types-6-0";
import { WeekdaySelection, WeekdaySelectionProps } from './WeekdaySelection';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
export default {
    title: "Components / Weekday",
    component: WeekdaySelection
} as Meta


export const WeekdayStory: Story<WeekdaySelectionProps & { title: string }> = ({ title, ...args }) => {
    return <WeekdaySelection onChange={()=>{}} value={[]}/>
}


WeekdayStory.storyName = "Weekday Selection";
