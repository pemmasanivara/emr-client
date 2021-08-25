import { SettingsInputAntennaTwoTone } from '@material-ui/icons';
import { useEffect, useState } from 'react';
export const CUSTOM_WEEKDAY_REPEAT_LIST = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const
export type WeekdayType = typeof CUSTOM_WEEKDAY_REPEAT_LIST[number];

export type WeekdaySelectionProps = {
    onChange: (value: WeekdayType[]) => void;
    value?: WeekdayType[]
}

export function WeekdaySelection({onChange,  value}: WeekdaySelectionProps) {
    const [state, setState] = useState<WeekdayType[]>(value || []);

    function onItemSelection(value: WeekdayType) {
        setState((prevState) => {
            const items = [...prevState];
            // @ts-ignore
            const index = items.findIndex((item)=> item===value);
            if (index !== -1) {
                items.splice(index, 1);
            } else {
                items.push(value);
            }
            return items;
        })
    }

    useEffect(()=> {
        onChange(state)
    },[state])
    return (<div style={{display: "flex"}}>
        <WeekdayItem style={{marginRight: "5px"}} onClick={onItemSelection} selected={state.includes("Sunday")} value="Sunday" />
        <WeekdayItem style={{marginRight: "5px"}} onClick={onItemSelection}  selected={state.includes("Monday")} value="Monday" />
        <WeekdayItem style={{marginRight: "5px"}} onClick={onItemSelection}  selected={state.includes("Tuesday")} value="Tuesday" />
        <WeekdayItem style={{marginRight: "5px"}} onClick={onItemSelection}  selected={state.includes("Wednesday")} value="Wednesday" />
        <WeekdayItem style={{marginRight: "5px"}} onClick={onItemSelection}  selected={state.includes("Thursday")} value="Thursday" />
        <WeekdayItem style={{marginRight: "5px"}} onClick={onItemSelection}  selected={state.includes("Friday")} value="Friday" />
        <WeekdayItem onClick={onItemSelection}  selected={state.includes("Saturday")} value="Saturday" />

    </div>)
}

export type WeekdayItemProps = { style?: React.CSSProperties, selected?: boolean, value: WeekdayType, onClick: (selected: WeekdayType) => void; }

export function WeekdayItem({ style={}, value, selected = false, onClick }: WeekdayItemProps) {
    const selectedStyle = selected ? { color: "#ffffff", background: "#2D56B2", border: "1px solid #182554" } : { border: "1px solid #707070", background: "#B7B7BB" }
    return <div style={{
        display: "flex",
        width: "34px", height: "34px", alignItems: "center",
        justifyContent: "center", borderRadius: "50%",
        ...selectedStyle,
        ...style
    }}
        onClick={() => { onClick(value) }}
    >
    { value[0]}
    </div >
}