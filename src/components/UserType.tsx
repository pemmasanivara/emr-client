import React from "react";
import styled from 'styled-components';
export const USER_TYPES = ["Employee", "Client", "Provider", "Generic"] as const;

export type UserType = typeof USER_TYPES[number];

export type UserTypeComponentProps = {
    variant: UserType
}

export const userTypeVariantConfig: { [key in UserType]: React.CSSProperties } = {
    "Employee": {
        background: "#DAF5F6 0% 0% no-repeat padding-box",
        border: "1px solid #299498",
    },
    "Client": {
        background: "#EBF8DE 0% 0% no-repeat padding-box",
        border: "1px solid #6EB329",
    },
    "Provider": {
        background: "#F2E3D8 0% 0% no-repeat padding-box",
        border: "1px solid #D68E59",
    },
    "Generic": {
        background: "#D8E2F2 0% 0% no-repeat padding-box",
        border: "1px solid #2F4C7D",
    },
    
}

const Wrapper = styled.div`
        width: 83px;
        height: 26px;
        border-radius: 5px;
        opacity: 1;
        display: flex;
        align-items: center;
        justify-content: center;
`;

export function UserTypeComponent({ variant }: UserTypeComponentProps) {
    return <Wrapper style={{...userTypeVariantConfig[variant]}}>
        {variant}
    </Wrapper>
}