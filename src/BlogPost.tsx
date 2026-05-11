import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

interface Post {
  id: number
  slug: string
  title: string
  date: string
  summary: string
  body: string
  tags: string[]
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch('/blog/posts.json')
      .then(r => r.json())
      .then((data: Post[]) => {
        const found = data.find(p => p.slug === slug)
        if (found) {
          setPost(found)
        } else {
          setNotFound(true)
        }
        setLoading(false)
      })
      .catch(() => {
        setNotFound(true)
        setLoading(false)
      })
  }, [slug])

  // Inject JSON-LD schema once post loads
  useEffect(() => {
    if (!post) return
    const existingScript = document.getElementById('blog-jsonld')
    if (existingScript) existingScript.remove()

    const script = document.createElement('script')
    script.id = 'blog-jsonld'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.summary,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        '@type': 'Organization',
        name: 'FloridAuto.com — Tomlinson & Co',
        url: 'https://floridauto.com'
      },
      publisher: {
        '@type': 'Organization',
        name: 'FloridAuto.com',
        url: 'https://floridauto.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://floridauto.com/assets/logos/floridauto/tc-logo-medium.jpg'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://floridauto.com/blog/${post.slug}`
      },
      keywords: post.tags.join(', ')
    })
    document.head.appendChild(script)

    // Update page title
    document.title = `${post.title} | FloridAuto.com`

    return () => {
      const s = document.getElementById('blog-jsonld')
      if (s) s.remove()
    }
  }, [post])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/logos/floridauto/tc-logo-medium.jpg" alt="FloridAuto" className="h-12" />
            <div>
              <Link to="/" className="text-2xl font-bold text-blue-900 hover:text-blue-700 transition">FloridAuto.com</Link>
              <p className="text-sm text-gray-600">Florida Auto Insurance Specialists</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/blog" className="hidden sm:inline text-blue-700 font-semibold hover:text-blue-900 transition">Blog</Link>
            <a href="tel:800-616-1418" className="hidden sm:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition">
              📞 800-616-1418
            </a>
          </div>
        </div>
      </header>

      {loading && (
        <div className="text-center text-gray-500 py-32">Loading…</div>
      )}

      {notFound && !loading && (
        <div className="text-center py-32">
          <h1 className="text-3xl font-bold text-gray-700 mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-blue-600 underline hover:text-blue-800">← Back to Blog</Link>
        </div>
      )}

      {post && !loading && (
        <>
          {/* Back Link + Hero */}
          <section className="bg-blue-900 py-10 px-4">
            <div className="max-w-3xl mx-auto">
              <Link to="/blog" className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm font-semibold mb-5 transition">
                ← Back to Blog
              </Link>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map(tag => (
                  <span key={tag} className="bg-blue-700 text-blue-100 text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">{post.title}</h1>
              <p className="text-blue-300 text-sm">
                {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                {' · '}FloridAuto.com
              </p>
            </div>
          </section>

          {/* Post Body */}
          <section className="py-12 px-4">
            <div className="max-w-3xl mx-auto">
              <div
                className="prose prose-lg prose-headings:text-blue-900 prose-a:text-blue-600 prose-strong:text-blue-900 max-w-none text-gray-700 leading-relaxed
                  [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2
                  [&_li]:text-gray-700
                  [&_p]:mb-4"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />

              {/* CTA Box */}
              <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Questions About Your Florida Auto Insurance?</h3>
                <p className="text-blue-700 mb-4">Our team specializes in Florida auto insurance. We shop top carriers to find you the best rate — even with tickets, DUIs, or SR-22s.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="tel:800-616-1418"
                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl transition"
                  >
                    📞 Call 800-616-1418
                  </a>
                  <a
                    href="https://app.usecanopy.com/c/tomlinson-and-co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-xl transition"
                  >
                    Get Free Quote →
                  </a>
                </div>
              </div>

              {/* Back to blog */}
              <div className="mt-8 text-center">
                <Link to="/blog" className="text-blue-600 hover:text-blue-800 font-semibold underline text-sm">
                  ← Back to Blog
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 mt-8">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-lg text-white mb-2">Every Policy We Sell Comes With A Satisfied Policyholder!</p>
          <p className="text-sm">FloridAuto.com • Florida Auto Insurance Specialists<br/>A Tomlinson &amp; Co Agency</p>
          <p className="text-xs mt-4">© {new Date().getFullYear()} Tomlinson &amp; Co Inc. All rights reserved.</p>
          <p className="text-xs mt-2">
            <Link to="/" className="text-gray-400 hover:text-white underline mr-4">Home</Link>
            <Link to="/blog" className="text-gray-400 hover:text-white underline mr-4">Blog</Link>
            <a href="/privacy-policy.html" className="text-gray-400 hover:text-white underline">Privacy Policy</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
