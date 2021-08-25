import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import {Select as MuiSelect,SelectProps as MuiSelectProps} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';

export type SelectProps = MuiSelectProps & {
    label?: string;
}

export function Select({id, label, children, ...props}: SelectProps) {
    return <FormControl variant="outlined">
    {label && <InputLabel id={id} >{label}</InputLabel>}
    <MuiSelect
       id={id}
        {...props}
    >
      {children}
    </MuiSelect>
  </FormControl>
}