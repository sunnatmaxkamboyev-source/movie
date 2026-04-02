import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

export default function MovieCard({ movie, onToggleFavorite, isFavorite }) {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="card-poster-wrap">
        <img
          src={movie.poster || '/no-poster.png'}
          alt={movie.title}
          className="card-poster"
        />
        <span className="card-badge">{movie.year}</span>
        <button
          className={`card-heart ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault()
            onToggleFavorite(movie)
          }}
        >
          <Heart size={15} fill={isFavorite ? '#ff6b8a' : 'none'} />
        </button>
      </div>
      <div className="card-info">
        <div className="card-title">{movie.title}</div>
        <div className="card-director">{movie.director}</div>
        <div className="card-rating">
          <span className="star">★</span>
          <span>{movie.rating} / 10</span>
        </div>
      </div>
    </Link>
  )
}