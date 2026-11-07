import { createContext, useContext, useReducer } from 'react';
import type { Dispatch, ReactNode } from 'react';
import type { Clinic } from '../pages/Clinics.tsx';
import type { Slot } from '../pages/Slots.tsx';

export type Appointment = {
    step: number;
    clinic: Clinic | null;
    slot: Slot | null;
};

export type ActionType =
    | { type: 'SET_STEP'; payload: number }
    | { type: 'SET_CLINIC'; payload: Clinic }
    | { type: 'SET_TIME_SLOT'; payload: Slot };

export const AppointmentContext = createContext<{
    state: Appointment;
    dispatch: Dispatch<ActionType>;
} | undefined>(undefined);

export function AppointmentProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(appointmentReducer, {
        clinic: null,
        slot: null,
        step: 1,
    });

    return (
        <AppointmentContext.Provider value={{ state, dispatch }}>
            {children}
        </AppointmentContext.Provider>
    );
}

export function useAppointmentContext() {
    const context = useContext(AppointmentContext);

    if (!context) {
        throw new Error('useAppointmentContext must be used within AppointmentProvider');
    }

    return context;
}

function appointmentReducer(state: Appointment, action: ActionType): Appointment {
    switch (action.type) {
        case 'SET_STEP':
            return { ...state, step: action.payload };
        case 'SET_CLINIC':
            return { ...state, clinic: action.payload };
        case 'SET_TIME_SLOT':
            return { ...state, slot: action.payload };
        default:
            return state;
    }
}

