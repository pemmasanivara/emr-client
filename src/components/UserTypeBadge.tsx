import { UserType, UserTypeComponentProps } from "./UserType"

export type UserTypeBadgeProps = UserTypeComponentProps

export const userTypeVariantConfig: { [key in UserType]: React.CSSProperties } = {
    "Employee": {
        background: "#5EAFB1 0% 0% no-repeat padding-box",
        border: "1px solid #5EAFB1",
    },
    "Client": {
        background: "#6EB329 0% 0% no-repeat padding-box",
        border: "1px solid #6EB329",
    },
    "Provider": {
        background: "#D68E59 0% 0% no-repeat padding-box",
        border: "1px solid #D68E59",
    },
    "Generic": {
        background: "#182554 0% 0% no-repeat padding-box",
        border: "1px solid #182554",
    },
    
}

const componentStyle: React.CSSProperties = {
    display: "flex",
    width: "20px",
    height: "20px",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
    color: "#fff"
}

export function UserTypeBadge({variant}: UserTypeBadgeProps) {
    const style = userTypeVariantConfig[variant]
    return (<div style={{...style, ...componentStyle}}>{variant.substring(0,1)}</div>)
}