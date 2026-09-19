import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { injectWebFonts } from './utils/webFonts'
import App from './App.tsx'

injectWebFonts()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
