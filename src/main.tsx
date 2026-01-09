import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {StoriesProvider} from "./context/StoriesContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoriesProvider>
        <App />
    </StoriesProvider>
  </StrictMode>,
)
