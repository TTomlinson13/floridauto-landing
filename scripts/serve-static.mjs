/**
 * Local preview that mirrors production routing.
 *
 * `vite preview` serves dist/ with its own SPA fallback, which does not apply
 * public/.htaccess. That difference is not cosmetic: a prerendered post loaded
 * at its .html path hydrates against the wrong slug and throws React error
 * #418, while the same page at its canonical extensionless URL is fine. To see
 * what visitors and crawlers actually get, the rewrite rules have to be in play.
 *
 * This implements the same chain as public/.htaccess. Keep the two in step.
 *
 *   node scripts/serve-static.mjs [port]
 */
import { createServer } from 'node:http'
import { readFileSync, statSync, existsSync } from 'node:fs'
import { join, extname, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const PORT = Number(process.argv[2] || 4180)

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
}

const isFile = (p) => existsSync(p) && statSync(p).isFile()

/** Returns {status, location} for a redirect, or {status, file} to serve. */
function resolveRequest(urlPath) {
  const clean = urlPath.split('?')[0]

  // 2. /get-quote canonicalisation
  if (/^\/get-quote(\/(index\.html)?)?$/.test(clean) && clean !== '/get-quote') {
    return { status: 301, location: '/get-quote' }
  }
  if (clean === '/get-quote') {
    return { status: 200, file: join(DIST, 'get-quote', 'index.html') }
  }

  // 3. index.html is never its own URL
  if (/^\/index(\.html)?$/.test(clean)) return { status: 301, location: '/' }
  const nestedIndex = clean.match(/^\/(.+)\/index(\.html)?$/)
  if (nestedIndex) return { status: 301, location: `/${nestedIndex[1]}` }

  // 4. .html -> extensionless
  const htmlSuffix = clean.match(/^\/(.+)\.html$/)
  if (htmlSuffix) return { status: 301, location: `/${htmlSuffix[1]}` }

  // 5. blog index
  if (clean === '/blog/') return { status: 301, location: '/blog' }
  if (clean === '/blog') {
    return { status: 200, file: join(DIST, 'blog', 'index.html') }
  }

  // root
  if (clean === '/') return { status: 200, file: join(DIST, 'index.html') }

  const direct = join(DIST, clean)
  if (isFile(direct)) return { status: 200, file: direct }

  // 6. serve the prerendered file behind its extensionless URL
  if (!clean.startsWith('/404') && isFile(`${direct}.html`)) {
    return { status: 200, file: `${direct}.html` }
  }

  // 7. genuine 404
  return { status: 404, file: join(DIST, '404.html') }
}

createServer((req, res) => {
  const { status, location, file } = resolveRequest(req.url)

  if (location) {
    res.writeHead(status, { Location: location })
    res.end()
    console.log(`${status} ${req.url} -> ${location}`)
    return
  }

  if (!isFile(file)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not found')
    console.log(`404 ${req.url} (missing ${file})`)
    return
  }

  res.writeHead(status, {
    'Content-Type': TYPES[extname(file)] || 'application/octet-stream',
  })
  res.end(readFileSync(file))
  console.log(`${status} ${req.url}`)
}).listen(PORT, () => {
  console.log(`serving dist/ with production routing on http://localhost:${PORT}`)
})
