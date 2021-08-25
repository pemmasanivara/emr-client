import {Button as MuiButton, ButtonProps as MuiButtonProps} from '@material-ui/core';
import React from 'react';
import styled from  'styled-components';



export type ButtonProps = {
    onClick?: () => void;
    style?: React.CSSProperties
    children: React.ReactNode;
    curvedBorder?: boolean;
    variant?: "outlined" | "contained";
    disabled?: boolean;
    type?: "success" | "primary" | "error" | "warning" | "secondary";
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}

export const colorConfig: {[key: string]: {color: string,  textColor: string}} = {
    "secondary": {color: "#2D56B2", textColor:"#fff"},
    "success": {color: "#6EB329", textColor: "#fff" },
    "primary": {color: "#182554", textColor: "#fff"},
    "error": {color: "#FF0000", textColor: "#fff"},
    "disabled": {color: "#B7B7BB", textColor: "#fff"},
    "warning": {color: "#ff9800", textColor: "#fff"},
}


export function Button({onClick, style: UserDefinedStyle={},type="success",curvedBorder=true, children, variant="contained", disabled=false,...props}: ButtonProps) {
    const config = colorConfig[disabled ? "disabled" : (type || "primary")];
    const style = {border: `1px solid ${config.color}`}
    const borderRadiusStyle = curvedBorder ? {borderRadius: `30px`} : {};
    const variantStyle = variant === "outlined" ? {
        color: config.color
    } : {
        background: config.color,
        color: config.textColor
    }

    const finalStyle = {...style, ...variantStyle,...borderRadiusStyle, ...UserDefinedStyle};
    return <MuiButton onClick={onClick} disabled={disabled} disableElevation={true} variant={variant} style={finalStyle} {...props}>{children}</MuiButton>
}
