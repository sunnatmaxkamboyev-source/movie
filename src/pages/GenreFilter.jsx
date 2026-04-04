import { useState, useEffect } from 'react'
import { MOCK_MOVIES } from '../data/movies'
import MovieCard from '../components/MovieCard'
import SkeletonCard from '../components/SkeletonCard'
import { Filter } from 'lucide-react'

const ALL_GENRES = ['All', 'Sci-Fi', 'Thriller', 'Drama', 'Action', 'Crime', 'Biography', 'Adventure']

export default function GenreFilter() {
  const [selected, setSelected] = useState('All')
  const [loading, setLoading] = useState(false)
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem('favorites') || '[]')
  )

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [selected])

  const filtered = selected === 'All'
    ? MOCK_MOVIES
    : MOCK_MOVIES.filter(m => m.genre.includes(selected))

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
          <Filter size={30} color="var(--accent)" />
          <h1 className="home-title">Browse by <span>Genre</span></h1>
        </div>

        <div className="genre-filters">
          {ALL_GENRES.map(genre => (
            <button
              key={genre}
              className={`genre-filter-btn ${selected === genre ? 'active' : ''}`}
              onClick={() => setSelected(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div className="movies-grid">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : filtered.length > 0
            ? filtered.map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isFavorite={!!favorites.find(f => f.id === movie.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))
            : (
              <div style={{ color: 'var(--text-muted)', textAlign: 'center', width: '100%', padding: '3rem' }}>
                No movies found for this genre.
              </div>
            )
        }
      </div>
    </div>
  )
}