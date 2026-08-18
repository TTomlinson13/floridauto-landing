import { Link } from 'react-router-dom'
import { posts, formatDate } from './posts'

export default function Blog() {

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

      {/* Hero */}
      <section className="bg-blue-900 py-14 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-blue-300 font-semibold uppercase tracking-wider mb-2 text-sm">Florida Auto Insurance News</p>
          <h1 className="text-4xl font-bold text-white mb-3">The FloridAuto Blog</h1>
          <p className="text-blue-100 text-lg">Expert insights on Florida auto insurance, PIP coverage, SR-22s, and navigating the state's unique driving laws.</p>
        </div>
      </section>

      {/* Post Grid */}
      <section className="py-14 px-4">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center text-gray-500 py-20">No posts found.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <article key={post.id} className="bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col hover:shadow-xl transition-shadow">
                  <div className="p-6 flex flex-col flex-1">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <h2 className="text-lg font-bold text-blue-900 mb-2 leading-snug">{post.title}</h2>
                    <p className="text-gray-500 text-xs mb-3">{formatDate(post.date)}</p>
                    <p className="text-gray-600 text-sm flex-1 mb-5">{post.summary}</p>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm py-2 px-5 rounded-lg transition self-start"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-yellow-400 py-10 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Ready to Save on Florida Auto Insurance?</h2>
          <p className="text-blue-800 mb-5">We shop top carriers to find you the best rate. Call or get a quote online — it's free.</p>
          <a href="tel:800-616-1418" className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition">📞 Call 800-616-1418</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
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
