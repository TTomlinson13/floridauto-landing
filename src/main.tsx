import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import './index.css'

const container = document.getElementById('root')!

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
)

/**
 * Prerendered routes arrive with markup already in #root, so hydrate them
 * rather than throwing that HTML away and re-rendering from scratch. Any route
 * that was not prerendered still mounts normally.
 */
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
