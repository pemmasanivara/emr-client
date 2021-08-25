import { MenuItem} from "@material-ui/core";
import { Select, SelectProps } from "./Select";

export function GenderSelect(props: SelectProps) {
    return (<Select {...props}>
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Non-Binary">Non-Binary</MenuItem>
    </Select>)
}