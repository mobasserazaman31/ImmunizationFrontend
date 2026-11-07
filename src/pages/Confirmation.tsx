import { useAppointmentContext } from "../contexts/AppointmentContext.tsx";
import {formatTo12Hour} from "./Slots.tsx";

export default function Confirmation() {

    const { state } = useAppointmentContext();
    return (
        <div>
            <h1>Confirmation</h1>
            <p>Your appointment has been successfully booked!</p>
            <p>Clinic: {state.clinic?.name}</p>
            <p>Address: {state.clinic?.address}, {state.clinic?.city}, {state.clinic?.province}</p>
            <p>Date: {state.slot?.date} ({state.slot?.dayOfWeek})</p>
            <p>Time: {state.slot? formatTo12Hour(state.slot.time) : "" }</p>
    
        </div>
    );
}
