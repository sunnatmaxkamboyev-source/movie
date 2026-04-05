import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import SkeletonCard from '../components/SkeletonCard'
import { getPopularMovies } from '../services/api'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const MOVIES_PER_PAGE = 8

export default function Home() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem('favorites') || '[]')
  )

  useEffect(() => {
    getPopularMovies()
      .then(data => {
        setMovies(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = movies.filter(m =>
    m.title.toLowerCase().includes(query.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / MOVIES_PER_PAGE)
  const paginated = filtered.slice(
    (currentPage - 1) * MOVIES_PER_PAGE,
    currentPage * MOVIES_PER_PAGE
  )

  const toggleFavorite = (movie) => {
    const exists = favorites.find(f => f.id === movie.id)
    const updated = exists
      ? favorites.filter(f => f.id !== movie.id)
      : [...favorites, movie]
    setFavorites(updated)
    localStorage.setItem('favorites', JSON.stringify(updated))
  }

  return (
    <div className="home">
      <div className="home-hero">
        <h1 className="home-title">Discover <span>Movies</span></h1>
        <input
          className="home-search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={e => { setQuery(e.target.value); setCurrentPage(1) }}
        />
      </div>

      <div className="movies-grid">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : paginated.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={!!favorites.find(f => f.id === movie.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))
        }
      </div>

      {!loading && totalPages > 1 && (
        <div className="pagination">
          <button className="page-btn" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
            <ChevronLeft size={18} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`page-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button className="page-btn" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  )
}