import { Calendar, CalendarViewMode } from "components/Calendar";
import RefreshIcon from "@material-ui/icons/Refresh";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "../../components/Button";
import {
  Typography,
  Paper,
  Select,
  MenuItem,
  Menu,
  Button as MuiButton,
} from "@material-ui/core";
import { useSession } from "./useSession";
import { NewSession } from "./NewSession";
import { useState } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import { addWeeks, format } from "date-fns";
import CalendarChangeView from "assets/calendar_change_view.svg";
import GroupIcon from '@material-ui/icons/Group';

const now = new Date();

// const events = [
//   {
//     id: 14,
//     title: 'Today',
//     start: new Date(new Date().setHours(new Date().getHours() + 3)),
//     end: new Date(new Date().setHours(new Date().getHours() + 4)),
//   },
//   {
//     id: 15,
//     title: 'Point in Time Event',
//     start: now,
//     end: now,
//   },
// ]

export function SessionCalendar() {
  const {
    currentDate,
    setCurrentDate,
    refetchSessions,
    events,
    onEventClick,
    users,
    services,
    createSession,
    showNewSession,
    setShowNewSession,
    selectedSession,
    updateSessionApi,
    setSelectedSession,
    deleteSession,
    searchText,
  } = useSession();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [calendarViewMode, setCalendarViewMode] = useState<CalendarViewMode>(
    "week"
  );

  function onCloseNewSessionDialog() {
    setShowNewSession(false);
    setSelectedSession(undefined);
  }

  function onCloseEditUserDialog() {
    setSelectedSession(undefined);
  }

  function onSave(data: any) {
    createSession(data);
  }

  function onUpdate(data: any) {
    // updateUserApi(data);
  }

  function onShowCalendarMode(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function onCalendarModeChange(value: any) {
    setCalendarViewMode(value);
    setAnchorEl(null);
  }
  function onCalenderModeCancel() {
    setAnchorEl(null);
  }

  function onCancelDelete() {}
  function onDeleteUser(userId: any) {}

  const dateLabel =
    format(new Date(), "MMMM dd, yyyy") === format(currentDate, "MMMM dd, yyyy")
      ? "Today"
      : format(currentDate, "MMM dd, yyyy");

  function onCanlendarPrevious() {
    setCurrentDate(addWeeks(currentDate, -1));
  }

  function onCalendarNext() {
    setCurrentDate(addWeeks(currentDate, 1));
  }

  console.log("Calendar View Mode", searchText);
  return (
    <Paper
      style={{
        padding: "10px",
        margin: "20px",
        flex: "1 1 1px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        minWidth: 0,
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "40px" }}
        >
          <ChevronLeftIcon
            style={{ cursor: "pointer" }}
            onClick={onCanlendarPrevious}
          />
          <Typography variant="body2">{dateLabel}</Typography>
          <ChevronRightIcon
            style={{ cursor: "pointer" }}
            onClick={onCalendarNext}
          />
        </div>
        <div style={{ flex: "1" }} />
        <Typography variant="h6">User Schedule</Typography>

        <div style={{ flex: "1" }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            width: "150px",
            justifyContent: "flex-end",
          }}
        >
          <img src={CalendarChangeView} />
          <MuiButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={onShowCalendarMode}
            endIcon={<ExpandMoreOutlinedIcon />}
          >
            {calendarViewMode.replace("_", "")}
          </MuiButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={onCalenderModeCancel}
          >
            <MenuItem onClick={() => onCalendarModeChange("Week")}>
              Week
            </MenuItem>
            <MenuItem onClick={() => onCalendarModeChange("work_week")}>
              Work Week
            </MenuItem>
            <MenuItem onClick={() => onCalendarModeChange("Month")}>
              Month
            </MenuItem>
            <MenuItem onClick={() => onCalendarModeChange("Agenda")}>
              Agenda
            </MenuItem>
          </Menu>
        </div>
        <RefreshIcon
          style={{ marginRight: "10px" }}
          onClick={() => {
            refetchSessions();
          }}
        />
        <Button
          variant="contained"
          type="primary"
          curvedBorder={false}
          endIcon={<AddIcon />}
          onClick={() => {
            setShowNewSession(true);
          }}
        >
          Schedule{" "}
        </Button>
      </div>
      
        {/* {!searchText || searchText.length === 0 ? ( */}
          <div
          style={{
            flex: "1 1 1px",
            display: "flex",
            minWidth: 0,
            overflowY: "scroll",
          }}
        >
          <Calendar
            viewMode={calendarViewMode.toLowerCase() as any}
            date={currentDate}
            events={events}
            onEventClick={onEventClick}
          />
          </div>
        { // ) : 
        //   <div
        //   style={{
        //     flex: "1 1 1px",
        //     display: "flex",
        //     minWidth: 0,
        //     overflowY: "scroll",
        //     gap: "5px"
        //   }}
        // >
        //  { searchText.map((text: any) => {
        //     return <Calendar
        //       viewMode={calendarViewMode.toLowerCase() as any}
        //       date={currentDate}
        //       events={events}
        //       onEventClick={onEventClick}
        //       calendarTitle={`${text.givenName}`}
        //     />
        //   }
        //   )
        // }
        // </div>
        }
      {(showNewSession || selectedSession) && (
        <NewSession
          session={selectedSession}
          updateSession={updateSessionApi}
          deleteSession={deleteSession}
          handleClose={onCloseNewSessionDialog}
          onSave={onSave}
          users={users}
          services={services}
        />
      )}
    </Paper>
  );
}
