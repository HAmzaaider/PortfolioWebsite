import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // our global styles + tailwind

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import App from './App.tsx'