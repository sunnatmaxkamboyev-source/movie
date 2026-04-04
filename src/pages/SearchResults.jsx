import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { MOCK_MOVIES } from '../data/movies'
import MovieCard from '../components/MovieCard'
import SkeletonCard from '../components/SkeletonCard'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'

const MOVIES_PER_PAGE = 4

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem('favorites') || '[]')
  )
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    setCurrentPage(1)
    const t = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(t)
  }, [query])

  const filtered = MOCK_MOVIES.filter(m =>
    m.title.toLowerCase().includes(query.toLowerCase()) ||
    m.director.toLowerCase().includes(query.toLowerCase()) ||
    m.genre.toLowerCase().includes(query.toLowerCase())
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <Search size={30} color="var(--accent)" />
          <h1 className="home-title">Search <span>Results</span></h1>
        </div>
        {query && (
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '8px' }}>
            "{query}" — {filtered.length} result{filtered.length !== 1 ? 's' : ''} found
          </p>
        )}
        <input
          className="home-search"
          style={{ marginTop: '1rem' }}
          type="text"
          placeholder="Search again..."
          defaultValue={query}
          onChange={e => setSearchParams({ q: e.target.value })}
        />
      </div>

      <div className="movies-grid">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : paginated.length > 0
            ? paginated.map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isFavorite={!!favorites.find(f => f.id === movie.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))
            : (
              <div style={{ color: 'var(--text-muted)', textAlign: 'center', width: '100%', padding: '3rem 0' }}>
                <p style={{ fontSize: '48px', marginBottom: '1rem' }}>🎬</p>
                <p>No movies found for "{query}"</p>
              </div>
            )
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