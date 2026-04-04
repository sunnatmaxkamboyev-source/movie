import { useState, useEffect } from 'react'
import { MOCK_MOVIES } from '../data/movies'
import MovieCard from '../components/MovieCard'
import SkeletonCard from '../components/SkeletonCard'
import { Trophy } from 'lucide-react'

export default function TopRated() {
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem('favorites') || '[]')
  )

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(t)
  }, [])

  const sorted = [...MOCK_MOVIES].sort((a, b) => b.rating - a.rating)

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
          <Trophy size={36} color="#f5c518" />
          <h1 className="home-title">Top <span>Rated</span></h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '8px' }}>
          Best movies ranked by rating
        </p>
      </div>

      <div className="movies-grid">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : sorted.map((movie, index) => (
              <div key={movie.id} style={{ position: 'relative' }}>
                <div className="rank-badge">#{index + 1}</div>
                <MovieCard
                  movie={movie}
                  isFavorite={!!favorites.find(f => f.id === movie.id)}
                  onToggleFavorite={toggleFavorite}
                />
              </div>
            ))
        }
      </div>
    </div>
  )
}