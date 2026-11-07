import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppointmentProvider } from './contexts/AppointmentContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppointmentProvider>
      <App />
    </AppointmentProvider>
  </StrictMode>,
)
