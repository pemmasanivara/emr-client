import { addToList, removeFromList, updateItemInList } from "list-helper";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createNewSession, updateExistingSessionApi, deleteSessionApi, fetchSessions, Session } from "../../api/session";
import { fetchUsers } from "../../api/user";
import { fetchServices } from "../../api/service";

import { useGlobalStore, useGlobalStoreAction } from "../../AppStore";
import { addDays, addMonths, addWeeks, differenceInDays, endOfWeek, format, getISODay, parse, startOfWeek } from "date-fns";
import { WeekdayType } from "components/WeekdaySelection";


export function useSession() {
    const [currentDate, setCurrentDate] = useState(new Date());


    const queryClient = useQueryClient();
    const [showNewSession, setShowNewSession] = useState<boolean>(false);
    const [selectedSession, setSelectedSession] = useState<Session>();
    const updateGlobalStore = useGlobalStoreAction();
    const { search } = useGlobalStore();

    const { data: users, refetch: reFetchUsers } = useQuery('users', fetchUsers, {
        initialData: []
    });

    const { data: sessions = [], refetch: refetchSessions } = useQuery<Session[]>('sessions', fetchSessions, {
        initialData: [],
    });


    const { data: services } = useQuery('services', fetchServices, {
        initialData: []
    });


    const filteredSessions = useMemo(() => {
        const searchText = search && search["/session"];
        // ts-ignore
        if (!searchText || !Array.isArray(searchText)) { return sessions }

        const searchedUsers = searchText.map((item: any) => item.id);

        if (searchedUsers.length === 0) { return sessions }

        return sessions.filter((session: any) => {
            return searchedUsers.includes(session.clientId) || searchedUsers.includes(session.providerId)
        })

    }, [sessions, search, currentDate])

    const { mutate: createSession } = useMutation(createNewSession, {
        onMutate: () => {
            if (updateGlobalStore) {
                updateGlobalStore({ type: "toggleProgress", value: false })
            }
        },
        onSuccess: (data) => {
            if (updateGlobalStore) {
                updateGlobalStore({ type: "setSnackMessage", value: "Session created successfully" });
            }
            refetchSessions();
            // queryClient.setQueryData("sessions", (prevData) => {
            //     return addToList<any>((prevData || []) as any[], data)
            // });

            setShowNewSession(false);
        },
    });

    const { mutate: updateSessionApi } = useMutation(updateExistingSessionApi, {
        onMutate: () => {
            if (updateGlobalStore) {
                updateGlobalStore({ type: "toggleProgress", value: true })
            }
        },
        onSuccess: (data, variables) => {
            if (updateGlobalStore) {
                updateGlobalStore({ type: "setSnackMessage", value: "User details updated successfully" })
            }
            refetchSessions();
            // queryClient.setQueryData(["sessions"], (prevData) => {
            //     if (!prevData) { return prevData };
            //     return updateItemInList<any>(prevData as any[], data, "_id");
            // });
            setSelectedSession(undefined);
        }
    });

    const { mutate: deleteSession } = useMutation<any, APIError, any, any>(deleteSessionApi, {
        onMutate: () => {
            if (updateGlobalStore) {
                updateGlobalStore({ type: "toggleProgress", value: true })
            }
        },
        onSuccess: (data, variables) => {
            if (updateGlobalStore) {
                updateGlobalStore({ type: "setSnackMessage", value: "User deleted successfully" });
            }
            refetchSessions();
            // queryClient.setQueryData(["sessions"], (prevData) => {
            //     if (!prevData) { return prevData };
            //     const removedUser = removeFromList<any>(prevData as any[], variables, "_id");
            //     return removedUser;
            // });
            setSelectedSession(undefined);
        },
    });

    const events = useMemo(() => {
        return filteredSessions.map((session: Session) => {
            const startDate = parse(session.startDate, "yyyy-MM-dd", new Date())
            const start = parse(session.startTime, "HH:mm", startDate);
            const end = parse(session.endTime, "HH:mm", startDate);

            const endDate = session.endDate ? parse(session.endDate, "yyyy-MM-dd", new Date()) : new Date()
            const eventEndTime = parse(session.endTime, "HH:mm", endDate);

            let events: any[] = [];

            if (!session.repeatType || session.repeatType === "none") {
                events = [{
                    id: session._id,
                    start: start,
                    end: end,
                    title: session.service,
                }]
            }
            else if (session.repeatType.toLowerCase() === "workingday") {
                const workingDays = ["Monday","Tuesday","Wednesday","Thursday","Friday"]
            
                let startTime = start;
                let endTime = end;

                let i = 0;
                while (startTime < eventEndTime) {
                    const currentWeekDay = format(startTime, "EEEE");
                    if (workingDays.includes(currentWeekDay as any)) {
                        events.push({
                            id: session._id,
                            start: startTime,
                            end: endTime,
                            title: session.service
                        })
                    }
                    startTime = addDays(startTime, 1);
                    endTime = addDays(endTime, 1);
                    i += 1;
                }
            }
            else if (session.repeatType.toLowerCase() === "daily") {
                let startTime = start;
                let endTime = end;
                let i = 0;
                while (startTime < eventEndTime) {
                    events.push({
                        id: session._id,
                        start: startTime,
                        end: endTime,
                        title: session.service
                    })
                    startTime = addDays(startTime, 1);
                    endTime = addDays(endTime, 1);
                    i += 1;
                }

            }
            else if (session.repeatType.toLowerCase() === "weekly" ) {

                let startTime = start;
                let endTime = end;

                let i = 0;
                while (startTime < eventEndTime) {
                    events.push({
                        id: session._id,
                        start: startTime,
                        end: endTime,
                        title: session.service
                    })
                    startTime = addWeeks(startTime, 1);
                    endTime = addWeeks(endTime, 1);
                    i += 1;
                }
            }
            else if (session.repeatType.toLowerCase() === "monthly") {

                let startTime = start;
                let endTime = end;

                let i = 0;
                while (startTime < eventEndTime) {
                    events.push({
                        id: session._id,
                        start: startTime,
                        end: endTime,
                        title: session.service
                    })
                    startTime = addMonths(startTime, 1);
                    endTime = addMonths(endTime, 1);
                    i += 1;
                }
            } else if (session.repeatType.toLowerCase() === "custom") {

                let startTime = start;
                let endTime = end;

                let i = 0;
                while (startTime < eventEndTime) {
                    const currentWeekDay = format(startTime, "EEEE");
                    if (session.customRepeatValues?.includes(currentWeekDay as any)) {
                        events.push({
                            id: session._id,
                            start: startTime,
                            end: endTime,
                            title: session.service
                        })
                    }
                    startTime = addDays(startTime, 1);
                    endTime = addDays(endTime, 1);
                    i += 1;
                }
            }
            return events;
        }).flat().flat()
    }, [filteredSessions])

    function onEventClick(event: any) {
        const filtered = sessions.filter((session) => session._id === event.id);
        setSelectedSession(filtered[0]);
    }

    return {
        refetchSessions,
        currentDate,
        setCurrentDate,
        sessions: filteredSessions,
        searchText: search && search["/session"],
        events,
        services,
        users,
        createSession,
        showNewSession,
        setShowNewSession,
        selectedSession,
        updateSessionApi,
        setSelectedSession,
        deleteSession,
        reFetchUsers,
        onEventClick
    }
}