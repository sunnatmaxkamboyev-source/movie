import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import SkeletonCard from '../components/SkeletonCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const MOVIES_PER_PAGE = 4


const MOCK_MOVIES = [
  { id: 1, title: "Avengers: Endgame", year: "2019", poster: "https://via.placeholder.com/150" },
  { id: 2, title: "Inception", year: "2010", poster: "https://via.placeholder.com/150" },
  { id: 3, title: "Interstellar", year: "2014", poster: "https://via.placeholder.com/150" },
  { id: 4, title: "The Dark Knight", year: "2008", poster: "https://via.placeholder.com/150" },
  { id: 5, title: "Titanic", year: "1997", poster: "https://via.placeholder.com/150" },
  { id: 6, title: "Jurassic Park", year: "1993", poster: "https://via.placeholder.com/150" },
]

export default function Home() {
  const [searchParams] = useSearchParams()
  const urlQuery = searchParams.get('search') || ''
  const [query, setQuery] = useState(urlQuery)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites') || '[]')
  })

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [query])

  // ✅ FILTERED movies
  const filtered = MOCK_MOVIES.filter(m =>
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

  const handleSearch = (e) => {
    setQuery(e.target.value)
    setCurrentPage(1)
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
          onChange={handleSearch}
        />
      </div>

      <div className="movies-grid">
        {loading
          ? Array.from({ length: MOVIES_PER_PAGE }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
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
          <button
            className="page-btn"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
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
          <button
            className="page-btn"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  )
}