import { } from "@material-ui/core";
import { Meta, Story } from "@storybook/react/types-6-0";
import { Button, ButtonProps } from './Button';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
export default {
    title: "Components / Button",
    component: Button,
    argTypes: {
        title: {
            control: "text",
        }
    }
} as Meta


export const ButtonStory: Story<ButtonProps & { title: string }> = ({ title, ...args }) => {
    return <Button {...args}>{title}</Button>
}
ButtonStory.args = {
    title: "Button"
}

ButtonStory.storyName = "Button";

const StyledWrapper = styled.div`
    display: flex;
    margin-top: 20px;
    align-items: center;
    justify-items: center;
    button {
        margin-left: 10px;
    }
`;

export const AllVariants = (args: any) => {
    return <><StyledWrapper><Button>default</Button>
    <Button variant="contained" disabled={true}>Disabled contained</Button>
    <Button variant="outlined">outlined</Button>
    <Button variant="outlined" disabled={true}>Disabled outlined</Button>

    <Button variant="outlined" type="error">Error outlined</Button>
    <Button variant="contained" type="error">Error contained</Button>
    <Button variant="contained" type="primary" endIcon={<AddIcon />}>Add</Button>
    </StyledWrapper>
    <StyledWrapper><Button curvedBorder={false}>default</Button>
    <Button variant="contained"  curvedBorder={false} disabled={true}>Disabled contained</Button>
    <Button variant="outlined"  curvedBorder={false}>outlined</Button>
    <Button variant="outlined"  curvedBorder={false} disabled={true}>Disabled outlined</Button>

    <Button variant="outlined"  curvedBorder={false} type="error">Error outlined</Button>
    <Button variant="contained"  curvedBorder={false} type="error">Error contained</Button>

    <Button variant="contained"  curvedBorder={false} type="primary" endIcon={<AddIcon />}>Error contained</Button>

    </StyledWrapper>
    </>
}