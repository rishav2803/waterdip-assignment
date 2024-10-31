import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { VisitorDataProvider } from './contexts/VisitorDataContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VisitorDataProvider>
      <App />
    </VisitorDataProvider>
  </StrictMode>
)
