import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import "./RadioButton.css";

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    border: "1.5px solid #5EAFB2",
    '$root.Mui-focusVisible &': {
      outline: '2px auto #5EAFB2',
      outlineOffset: 2,
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'lightgray',
    },
  },
  checkedIcon: {
    // 3px solid #5EAFB2
    '&input:checked': {
      width: "30px",
      height: "30px",
    },
    backgroundColor: '#EBF8DE 0% 0% no-repeat padding-box',

    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#EBF8DE',
    },
  },
});


// Inspired by blueprintjs
export function RadioButton(props: RadioProps) {
  const classes = useStyles();

  return (
    <label className="radio radio-before">
  <span className="radio__input">
    <input type="radio" name="radio" />
    <span className="radio__control"></span>
  </span>
  <span className="radio__label">Radio 2 - :before</span>
</label>
    
  )
}

// export function RadioButton() {
//   return (
//     <FormControl component="fieldset">
//       <FormLabel component="legend">Gender</FormLabel>
//       <RadioGroup defaultValue="female" aria-label="gender" name="customized-radios">
//         <FormControlLabel value="female" control={<StyledRadio />} label="Female" />
//         <FormControlLabel value="male" control={<StyledRadio />} label="Male" />
//         <FormControlLabel value="other" control={<StyledRadio />} label="Other" />
//         <FormControlLabel
//           value="disabled"
//           disabled
//           control={<StyledRadio />}
//           label="(Disabled option)"
//         />
//       </RadioGroup>
//     </FormControl>
//   );
// }
