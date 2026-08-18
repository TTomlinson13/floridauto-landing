/**
 * Build-time prerenderer.
 *
 * The site is a client-rendered SPA: every URL used to return the same shell
 * whose entire body was `<div id="root"></div>`. Google renders JavaScript, but
 * defers it and treats it unreliably; the AI crawlers that matter here —
 * ClaudeBot, PerplexityBot, OAI-SearchBot, CCBot, meta-externalagent — do not
 * execute JavaScript at all, so they saw an empty page with one meta
 * description and nothing else.
 *
 * This renders each route to real HTML at build time and writes it to disk, so
 * the content is in the initial response. The client bundle then hydrates it,
 * leaving the SPA behaviour intact.
 *
 * Run after `vite build` and `vite build --ssr`. See package.json.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const SSR_ENTRY = join(ROOT, 'dist-ssr', 'entry-server.js')
const ORIGIN = 'https://floridauto.com'

const OG_IMAGE = `${ORIGIN}/og-image.png`
const LOGO = `${ORIGIN}/og-image.png`
const PHONE = '+1-800-616-1418'

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

const escapeAttr = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const escapeText = (s) =>
    String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** `</script>` inside JSON-LD would close the tag early. */
const jsonLd = (obj) =>
  JSON.stringify(obj).replace(/</g, '\\u003c').replace(/>/g, '\\u003e')

const stripTags = (html) => String(html).replace(/<[^>]*>/g, ' ')

const wordCount = (html) =>
  stripTags(html).split(/\s+/).filter(Boolean).length

// ---------------------------------------------------------------------------
// shared structured data
// ---------------------------------------------------------------------------

/**
 * The address must match the visible NAP block in src/Nap.tsx character for
 * character, and both must match the Google Business Profile — Google
 * cross-checks all three, and a mismatch is worse than an omission.
 */
const AGENCY = {
  '@type': 'InsuranceAgency',
  '@id': `${ORIGIN}/#agency`,
  name: 'FloridAuto.com',
  legalName: 'Tomlinson & Co Inc.',
  url: ORIGIN,
  logo: { '@type': 'ImageObject', url: LOGO },
  image: OG_IMAGE,
  telephone: PHONE,
  foundingDate: '1966',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '921 Douglas Ave #102',
    addressLocality: 'Altamonte Springs',
    addressRegion: 'FL',
    postalCode: '32714',
    addressCountry: 'US',
  },
  description:
    'Independent Florida auto insurance agency. Same-day coverage, SR-22 and non-standard risk, and drivers other agents turn away. Part of Tomlinson & Co, licensed since 1966.',
  areaServed: [
    { '@type': 'State', name: 'Florida' },
    { '@type': 'State', name: 'North Carolina' },
    { '@type': 'State', name: 'Georgia' },
    { '@type': 'State', name: 'Texas' },
    { '@type': 'State', name: 'New York' },
    { '@type': 'State', name: 'Pennsylvania' },
    { '@type': 'State', name: 'Ohio' },
    { '@type': 'State', name: 'Michigan' },
    { '@type': 'State', name: 'Illinois' },
    { '@type': 'State', name: 'California' },
  ],
  knowsAbout: [
    'Florida auto insurance',
    'Florida no-fault and PIP coverage',
    'Uninsured and underinsured motorist coverage',
    'SR-22 filings',
    'Non-standard and high-risk auto insurance',
    'Florida tort reform and auto claims',
    'Same-day auto coverage',
  ],
  sameAs: [
    'https://tomlinsonandco.com',
    'https://hoinsurance.com',
    'https://flawc.com',
    'https://e-bikeins.com',
  ],
}

const PUBLISHER = {
  '@type': 'Organization',
  '@id': `${ORIGIN}/#agency`,
  name: 'FloridAuto.com',
  url: ORIGIN,
  logo: { '@type': 'ImageObject', url: LOGO },
}

const breadcrumbs = (trail) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${ORIGIN}${item.path}`,
  })),
})

// ---------------------------------------------------------------------------
// head rewriting
// ---------------------------------------------------------------------------

function applyHead(html, { title, description, canonical, ogType, schemas }) {
  let out = html

  const swap = (pattern, replacement) => {
    if (pattern.test(out)) out = out.replace(pattern, replacement)
  }

  swap(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(title)}</title>`)
  swap(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeAttr(description)}" />`,
  )
  swap(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
  )
  swap(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
  )
  swap(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${escapeAttr(canonical)}" />`,
  )
  swap(
    /<meta property="og:type" content="[^"]*" \/>/,
    `<meta property="og:type" content="${escapeAttr(ogType)}" />`,
  )
  swap(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
  )
  swap(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
  )

  const injected = [
    `<link rel="canonical" href="${escapeAttr(canonical)}" />`,
    ...schemas.map(
      (s) =>
        `<script type="application/ld+json">${jsonLd({
          '@context': 'https://schema.org',
          ...s,
        })}</script>`,
    ),
  ].join('\n    ')

  return out.replace('</head>', `  ${injected}\n  </head>`)
}

function applyBody(html, appHtml) {
  const marker = '<div id="root"></div>'
  if (!html.includes(marker)) {
    throw new Error('root marker not found in template — cannot inject markup')
  }
  return html.replace(marker, `<div id="root">${appHtml}</div>`)
}

// ---------------------------------------------------------------------------
// routes
// ---------------------------------------------------------------------------

const posts = JSON.parse(
  readFileSync(join(ROOT, 'public', 'blog', 'posts.json'), 'utf-8'),
).slice().sort((a, b) => b.date.localeCompare(a.date))

const BLOG_DESCRIPTION =
  'Florida auto insurance news and plain-English guides: PIP and no-fault rules, uninsured motorist coverage, SR-22 filings, tort reform, and what driving uninsured really costs.'

const routes = [
  {
    url: '/',
    out: 'index.html',
    title:
      'FloridAuto.com - Florida Auto Insurance | Same Day Coverage | 800-616-1418',
    description:
      'Florida Auto Insurance Quotes - Same Day Coverage! Save over 35% on auto insurance. Unlucky driver? DUI? We can help. Call 800-616-1418 for instant quotes.',
    ogType: 'website',
    schemas: [
      AGENCY,
      {
        '@type': 'WebSite',
        '@id': `${ORIGIN}/#website`,
        url: ORIGIN,
        name: 'HOInsurance.com',
        publisher: { '@id': `${ORIGIN}/#agency` },
      },
    ],
  },
  {
    url: '/blog',
    out: join('blog', 'index.html'),
    title: 'Florida Auto Insurance News & Guides | FloridAuto.com',
    description: BLOG_DESCRIPTION,
    ogType: 'website',
    schemas: [
      {
        '@type': 'Blog',
        '@id': `${ORIGIN}/blog#blog`,
        url: `${ORIGIN}/blog`,
        name: 'The FloridAuto Blog',
        description: BLOG_DESCRIPTION,
        publisher: { '@id': `${ORIGIN}/#agency` },
        blogPost: posts.map((p) => ({
          '@type': 'BlogPosting',
          headline: p.title,
          url: `${ORIGIN}/blog/${p.slug}`,
          datePublished: p.date,
        })),
      },
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
      ]),
    ],
  },
  ...posts.map((post) => ({
    url: `/blog/${post.slug}`,
    out: join('blog', `${post.slug}.html`),
    title: `${post.title} | FloridAuto.com`,
    description: post.summary,
    ogType: 'article',
    schemas: [
      {
        '@type': 'BlogPosting',
        '@id': `${ORIGIN}/blog/${post.slug}#post`,
        headline: post.title,
        description: post.summary,
        datePublished: post.date,
        dateModified: post.date,
        wordCount: wordCount(post.body),
        keywords: post.tags.join(', '),
        articleSection: 'Florida Auto Insurance',
        inLanguage: 'en-US',
        image: OG_IMAGE,
        author: { '@id': `${ORIGIN}/#agency` },
        publisher: PUBLISHER,
        isPartOf: { '@id': `${ORIGIN}/blog#blog` },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${ORIGIN}/blog/${post.slug}`,
        },
      },
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.title, path: `/blog/${post.slug}` },
      ]),
    ],
  })),
]

// ---------------------------------------------------------------------------
// run
// ---------------------------------------------------------------------------

if (!existsSync(SSR_ENTRY)) {
  console.error(`prerender: SSR bundle missing at ${SSR_ENTRY}`)
  process.exit(1)
}

const template = readFileSync(join(DIST, 'index.html'), 'utf-8')
const { render } = await import(pathToFileURL(SSR_ENTRY).href)

let failures = 0

for (const route of routes) {
  let appHtml
  try {
    appHtml = render(route.url)
  } catch (err) {
    console.error(`prerender: FAILED to render ${route.url}\n  ${err.stack || err}`)
    failures++
    continue
  }

  // A route that renders to almost nothing means the data did not reach the
  // component — exactly the failure prerendering exists to prevent. Better to
  // break the build than to ship empty pages that look fine in a browser.
  if (appHtml.replace(/<[^>]*>/g, '').trim().length < 200) {
    console.error(
      `prerender: FAILED ${route.url} produced ${appHtml.length} bytes of markup ` +
        `but almost no text — data likely missing`,
    )
    failures++
    continue
  }

  const canonical = route.url === '/' ? `${ORIGIN}/` : `${ORIGIN}${route.url}`
  let html = applyBody(template, appHtml)
  html = applyHead(html, { ...route, canonical })

  const target = join(DIST, route.out)
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, html, 'utf-8')

  const kb = (Buffer.byteLength(html) / 1024).toFixed(1)
  console.log(`prerender: ${route.out.padEnd(58)} ${kb.padStart(7)} kB  ${route.url}`)
}

// ---------------------------------------------------------------------------
// sitemap
// ---------------------------------------------------------------------------
//
// Generated from the same route list that was just rendered, so it cannot drift
// from the content again. The previous hand-maintained sitemap listed five
// posts while posts.json held ten -- the five newest were absent entirely.

const PRIORITY = { '/': 1.0, '/blog': 0.7 }
const CHANGEFREQ = { '/': 'weekly', '/blog': 'weekly' }
const postDate = Object.fromEntries(posts.map((p) => [`/blog/${p.slug}`, p.date]))

const sitemapUrls = routes.map((r) => {
  const loc = r.url === '/' ? `${ORIGIN}/` : `${ORIGIN}${r.url}`
  const priority = PRIORITY[r.url] ?? 0.6
  const changefreq = CHANGEFREQ[r.url] ?? 'monthly'
  const lastmod = postDate[r.url]
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority.toFixed(1)}</priority>`,
    '  </url>',
  ]
    .filter(Boolean)
    .join('\n')
})

writeFileSync(
  join(DIST, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    sitemapUrls.join('\n') +
    '\n</urlset>\n',
  'utf-8',
)
console.log(`prerender: sitemap.xml written with ${sitemapUrls.length} URLs`)

if (failures) {
  console.error(`\nprerender: ${failures} route(s) failed`)
  process.exit(1)
}

console.log(`\nprerender: ${routes.length} routes written`)
