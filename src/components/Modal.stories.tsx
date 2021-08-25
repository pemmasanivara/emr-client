import {Meta, Story} from "@storybook/react/types-6-0";
import { ErrorDialog, ErrorDialogProps } from "./ErrorDialog";
export default {
    component: ErrorDialog,
    title: "Components / Error Dialog"
} as Meta;

export const ModalDialogStory: Story<ErrorDialogProps> = (args) => {
    return <ErrorDialog {...args} />
}

ModalDialogStory.storyName = "Error Dialog";