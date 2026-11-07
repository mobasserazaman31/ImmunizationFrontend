import axios from "axios";

export function getSlots(clinicId: number) {
    return axios.get(`http://localhost:8080/api/appointment-slots?clinicId=${clinicId}`);
}