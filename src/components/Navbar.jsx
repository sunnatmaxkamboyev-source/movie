import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, Heart, Sun, Moon } from 'lucide-react'
import { useState } from 'react'

export default function Navbar({ theme, toggleTheme }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/?search=${query.trim()}`)
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="logo-dot" />
        CINE<span className="logo-accent">X</span>
      </Link>

      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/favorites" className={location.pathname === '/favorites' ? 'active' : ''}>Favorites</Link>
      </div>

      <form onSubmit={handleSearch} className="search-bar">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <Link to="/favorites" className="fav-btn">
          <Heart size={16} /> Favorites
        </Link>
      </div>
    </nav>
  )
}