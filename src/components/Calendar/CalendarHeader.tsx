import format from 'date-fns/format'
import differenceInDays from 'date-fns/differenceInDays'
import addDays from 'date-fns/addDays';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';



type CalendarHeaderProps = {
    startDate: Date;
    endDate: Date;
}

function getDatesBetween(startDate: Date, endDate: Date) {
    const differnece = differenceInDays(endDate, startDate);
    const dates = [];
    for (let i = 0; i < differnece; i++) {
        dates.push(addDays(startDate, i));
    }

    return dates;
}
export function CalendarHeader({ startDate, endDate }: CalendarHeaderProps) {

    const dates = getDatesBetween(startDate, endDate);

    return (<div style={{ display: "flex", alignItems: "center", height: "70px" }}>
        {
            dates.map((date) => {
                return <CalendarHeaderItem date={date} isActive={false} />
            })
        }
    </div>)
}

type CalendarHeaderItemProps = {
    date: Date;
    isActive: boolean;
}


const StyledWrapper = styled.div`
    background: #f1f1f1;
    border: 1px solid #B7B7B7;
    color: ${({ theme }) => theme.palette.primary.main};
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    &.active {
        color: #2D56B2
    }

`;

export function CalendarHeaderItem({ date, isActive }: CalendarHeaderItemProps) {
    const day = format(date, "dd");
    const dayOfWeek = format(date, "EEEE");
    return <StyledWrapper>
        <div>
            <Typography variant="h6" style={{fontWeight: "bold"}}>{day}</Typography>
            <Typography>{dayOfWeek}</Typography>
        </div>
    </StyledWrapper>

}