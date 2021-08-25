import axios from 'axios';
import { WeekdayType } from 'components/WeekdaySelection';
const apiURL = process.env.REACT_APP_API_URL;

export type CreateSession = {
    service: string;
    providerId: string;
  clientId: string;
  startDate: string;
  startTime: string;
  endTime: string;
  repeatType?: string;
  customRepeatValues?: WeekdayType[];
  endDate?: string | null;

}
export type Session = CreateSession & {
    _id: string;
}

export async function fetchSessions() {
    try {
        const response = await axios.get<Session[]>(`${apiURL}session/`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export async function createNewSession(userData: CreateSession) {
    try {
        const response = await axios.post<Session>(`${apiURL}session/`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export async function updateExistingSessionApi({_id, ...userData}: Partial<Session>) {
    try {
        const response = await axios.patch<Session>(`${apiURL}session/${_id}`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export async function deleteSessionApi(id: string) {
    try {
        const response = await axios.delete<{ id: string; }>(`${apiURL}session/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}