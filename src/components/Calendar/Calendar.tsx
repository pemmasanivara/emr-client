import addDays from "date-fns/addDays";
import calenderIcon from 'assets/calendar-clock.svg';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import "./calendar-style.css";
require('react-big-calendar/lib/css/react-big-calendar.css');

export type CalendarViewMode = 'month' | 'week' | 'work_week' | 'day' | 'agenda'

const locales = {
    'en-US': require('date-fns/locale/en-US'),
}
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

const StyledWrapper = styled.div`
    height: 100%;
    background: #f1f1f1;
    color: #182554;
    flex: 1;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    &.active {
        color: #2D56B2
    }

`;


export type CalendarProps = {  
    date?: Date;
    onEventClick: (event: any) => void;
    calendarTitle?: string;
    events: any[];
    viewMode?: CalendarViewMode;
}

function Header({ date, localizer }: any) {
    const day = localizer.format(date, localizer.formats.dateFormat);
    const dayOfWeek = localizer.format(date, localizer.formats.weekdayFormat);
    return <StyledWrapper><div>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>{day}</Typography>
        <Typography variant="overline" style={{ lineHeight: "0.85em" }}>{dayOfWeek}</Typography>
    </div></StyledWrapper>
}

const today = new Date();

export function Calendar({viewMode="week", onEventClick, calendarTitle, date, events=[]}: CalendarProps) {

    const calendarTitleBorder = calendarTitle ? "1px solid #FF9100" : 0;
    
    return (<div style={{ height: "100%", flex: "1 1 1px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{
            marginLeft: "51px", minHeight:"31px", borderRadius: "5px 5px 0px 0px", border: calendarTitleBorder, borderBottom: 0, padding: "5px 32px"
        }}>
            {calendarTitle && <Typography variant="body2" style={{ fontWeight: "bold" }}>{calendarTitle}</Typography>}
        </div>
        <BigCalendar
            date ={date}
            onDoubleClickEvent={onEventClick}
            drilldownView={null}
            toolbar={false}
            views={['month', 'week', 'work_week', 'day', 'agenda']}
            view={viewMode}
            timeslots={2}
            min={
                new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    8
                )
            }
            // end time 5:00pm
            max={
                new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate(),
                    17
                )
            }
            components={{
                header: Header,
                timeGutterHeader: () => <img src={calenderIcon} />,
            }}
            formats={{
                timeGutterFormat: (date, culture, localizer) =>
                    //@ts-ignore
                    localizer.format(date, "h aaaaa'm'", culture),
            }}
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
        />
        {/* Calendar
        <CalendarHeader startDate={startDate} endDate={endDate} /> */}

    </div>)
}