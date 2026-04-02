import { useState, useEffect } from 'react'
import { Heart, Trash2 } from 'lucide-react'
import MovieCard from '../components/MovieCard'

export default function Favorites() {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites') || '[]')
  })

  const toggleFavorite = (movie) => {
    const updated = favorites.filter(f => f.id !== movie.id)
    setFavorites(updated)
    localStorage.setItem('favorites', JSON.stringify(updated))
  }

  const clearAll = () => {
    setFavorites([])
    localStorage.setItem('favorites', JSON.stringify([]))
  }

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <div className="fav-title-wrap">
          <Heart size={28} fill="#ff6b8a" color="#ff6b8a" />
          <h1 className="fav-title">My Favorites</h1>
        </div>
        {favorites.length > 0 && (
          <button className="clear-btn" onClick={clearAll}>
            <Trash2 size={15} /> Clear All
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="fav-empty">
          <div className="fav-empty-icon">♡</div>
          <h2>No favorites yet</h2>
          <p>Go find some movies you love!</p>
        </div>
      ) : (
        <>
          <p className="fav-count">{favorites.length} movie{favorites.length > 1 ? 's' : ''} saved</p>
          <div className="movies-grid">
            {favorites.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={true}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}