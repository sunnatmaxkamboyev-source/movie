import { useState } from 'react'
import { Clock, Trash2 } from 'lucide-react'
import MovieCard from '../components/MovieCard'

export default function RecentlyWatched() {
  const [watched, setWatched] = useState(() =>
    JSON.parse(localStorage.getItem('watched') || '[]')
  )
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem('favorites') || '[]')
  )

  const toggleFavorite = (movie) => {
    const exists = favorites.find(f => f.id === movie.id)
    const updated = exists
      ? favorites.filter(f => f.id !== movie.id)
      : [...favorites, movie]
    setFavorites(updated)
    localStorage.setItem('favorites', JSON.stringify(updated))
  }

  const clearAll = () => {
    setWatched([])
    localStorage.setItem('watched', JSON.stringify([]))
  }

  return (
    <div className="home">
      <div className="home-hero">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <Clock size={34} color="var(--accent)" />
          <h1 className="home-title">Recently <span>Watched</span></h1>
        </div>
        {watched.length > 0 && (
          <button
            className="clear-btn"
            style={{ margin: '1rem auto 0', display: 'flex' }}
            onClick={clearAll}
          >
            <Trash2 size={15} /> Clear History
          </button>
        )}
      </div>

      {watched.length === 0 ? (
        <div className="fav-empty">
          <div className="fav-empty-icon">🎬</div>
          <h2>No history yet</h2>
          <p>Movies you watch will appear here.</p>
        </div>
      ) : (
        <div className="movies-grid">
          {watched.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={!!favorites.find(f => f.id === movie.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  )
}