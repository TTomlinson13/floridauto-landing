import rawPosts from '../public/blog/posts.json'

export interface Post {
  id: string
  slug: string
  title: string
  date: string
  summary: string
  body: string
  tags: string[]
}

/**
 * Posts are imported rather than fetched at runtime.
 *
 * Both blog components used to `fetch('/blog/posts.json')` inside an effect.
 * Effects do not run during server rendering, so a prerendered page would have
 * contained nothing but the loading spinner — which defeats the entire point of
 * prerendering. Importing the data makes it available synchronously in both the
 * build-time render and the browser, and removes a network round-trip on load.
 *
 * public/blog/posts.json stays the single source of truth so the existing
 * blog-publishing automation keeps working untouched.
 */
export const posts: Post[] = (rawPosts as Post[])
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date))

export function getPost(slug: string | undefined): Post | undefined {
  if (!slug) return undefined
  return posts.find((p) => p.slug === slug)
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/**
 * Deterministic date formatting.
 *
 * toLocaleDateString depends on the host's ICU data, so Node and the browser
 * can disagree and produce a hydration mismatch on every post page. Dates are
 * plain YYYY-MM-DD strings, so format them directly instead.
 */
export function formatDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number)
  if (!y || !m || !d) return isoDate
  return `${MONTHS[m - 1]} ${d}, ${y}`
}
