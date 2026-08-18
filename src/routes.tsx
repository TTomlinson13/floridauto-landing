import { Routes, Route } from 'react-router-dom'
import App from './App'
import Blog from './Blog'
import BlogPost from './BlogPost'

/**
 * Single route table, shared by the browser entry (main.tsx) and the
 * build-time render (entry-server.tsx), so the prerendered HTML and the
 * hydrated app can never drift apart.
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  )
}
