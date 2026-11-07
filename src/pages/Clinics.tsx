import { useEffect, useState } from "react";
import { getClinics } from "../api/ClinicsApi";
import { useAppointmentContext } from "../contexts/AppointmentContext.tsx";

export interface Clinic {
    id: number;
    name: string;
    address: string;
    city: string;
    province: string;
}

function ClinicCard({
    clinic,
    isSelected,
    onSelect,
}: {
    clinic: Clinic;
    isSelected: boolean;
    onSelect: (clinic: Clinic) => void;
}) {
    return (
        <button
            type="button"
            className={`clinic-card ${isSelected ? "selected" : ""}`}
            onClick={() => onSelect(clinic)}
        >
            <h3>{clinic.name}</h3>
            <p>{clinic.address}</p>
            <p>{clinic.city}, {clinic.province}</p>
        </button>
    );
}

export default function Clinics() {
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
    const { dispatch } = useAppointmentContext();

    useEffect(() => {
        getClinics().then((response) => {
            setClinics(response.data);
        }).catch((error) => {
            console.error("Error fetching clinics:", error);
        });
    }, []);

    const handleNext = () => {
        if (selectedClinic === null) return;

        dispatch({ type: "SET_CLINIC", payload: selectedClinic });
        dispatch({ type: "SET_STEP", payload: 2 });
    };

    return (
        <div>
            <h2>Clinics</h2>
            {clinics.map((clinic) => (
                <li key={clinic.id}>
                    <ClinicCard
                        clinic={clinic}
                        isSelected={selectedClinic?.id === clinic.id}
                        onSelect={setSelectedClinic}
                    />
                </li>
            ))}

            <button
                type="button"
                onClick={handleNext}
                disabled={selectedClinic === null}
            >
                Next
            </button>
        </div>
    );
}