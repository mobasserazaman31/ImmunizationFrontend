
import './App.css';
import Clinics from './pages/Clinics';
import Slots from './pages/Slots';
import Confirmation from './pages/Confirmation';
import { useAppointmentContext } from './contexts/AppointmentContext.tsx';

function App() {
  const { state } = useAppointmentContext();
  console.log("Current step:", state.step);

  return (
    <div>
      {state.step === 1 && <Clinics />}
      {state.step === 2 && <Slots />}
      {state.step === 3 && <Confirmation />}
    </div>
  );
  
}

export default App;
