import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import Favorites from './pages/Favorites'
import NotFound from './pages/NotFound'
import TopRated from './pages/TopRated'
import GenreFilter from './pages/GenreFilter'
import SearchResults from './pages/SearchResults'
import About from './pages/About'
import RecentlyWatched from './pages/RecentlyWatched'

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  return (
    <BrowserRouter>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/genres" element={<GenreFilter />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/about" element={<About />} />
        <Route path="/watched" element={<RecentlyWatched />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}