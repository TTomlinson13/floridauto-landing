import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import AppRoutes from './routes'

/**
 * Build-time render target. scripts/prerender.mjs imports this from the SSR
 * bundle and calls render() once per route, writing the result into a static
 * HTML file.
 */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  )
}
