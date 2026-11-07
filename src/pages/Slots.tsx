import { useEffect, useState } from 'react';
import { getSlots } from '../api/SlotsApi';
import { useAppointmentContext } from '../contexts/AppointmentContext.tsx';

export interface Slot {
    date: string;
    time: string;
    dayOfWeek: string;
}

export function formatTo12Hour(timeStr: string): string {
    // Split "15:00:00" into ["15", "00", "00"]
    const [hourStr, minuteStr] = timeStr.split(':');

    let hours = parseInt(hourStr, 10);
    const minutes = minuteStr;

    // Determine am/pm suffix
    const ampm = hours >= 12 ? 'pm' : 'am';

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    return `${hours}:${minutes} ${ampm}`;
}

function SlotGroup({ slots, onSelect }: { slots: Slot[]; onSelect: (slot: Slot) => void }) {
    return (
        <div>
            <h3>{slots[0].date} ({slots[0].dayOfWeek})</h3>
            <div className="slot-group">
                {slots.map((slot, index) => (
                    <div className="slot-card" key={index} onClick={() => onSelect(slot)}>
                        <p>{formatTo12Hour(slot.time)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Slots() {
    const { state, dispatch } = useAppointmentContext();
    const clinicId = state.clinic?.id || null;

    const [slotGroups, setSlotGroups] = useState<Slot[][]>([]);
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

    const handleNext = () => {
        if (selectedSlot === null) return;

        dispatch({ type: "SET_TIME_SLOT", payload: selectedSlot });
        dispatch({ type: "SET_STEP", payload: 3 });
    }


    useEffect(() => {
        if (!clinicId) return;

        console.log(`Fetching slots for clinicId: ${clinicId}`);

        getSlots(clinicId).then((response) => {
            setSlotGroups(response.data);
        }).catch((error) => {
            console.error("Error fetching slots:", error);
        });
    }, [clinicId]);

    console.log("Slot Groups:", slotGroups);


    return (
        <div>
            <div>
                <h2>Slots</h2>
                {slotGroups.map((group, index) => (
                    <SlotGroup key={index} slots={group} onSelect={setSelectedSlot} />
                ))}
            </div>
            <button
                type="button"
                onClick={handleNext}
                disabled={selectedSlot === null}
            >
                Confirm Appointment
            </button>
        </div>
    );
}
