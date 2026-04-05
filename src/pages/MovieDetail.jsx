import { useParams, useNavigate } from 'react-router-dom'
import { Heart, ArrowLeft, Star, Clock, Calendar, User, Download, Play, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { MOCK_MOVIES } from '../data/movies'
import MovieCard from '../components/MovieCard'

export default function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const movie = MOCK_MOVIES.find(m => m.id === Number(id))

  const [isFavorite, setIsFavorite] = useState(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]')
    return favs.some(f => f.id === Number(id))
  })

  const [userRating, setUserRating] = useState(() => {
    const ratings = JSON.parse(localStorage.getItem('ratings') || '{}')
    return ratings[id] || 0
  })

  const [hoverRating, setHoverRating] = useState(0)
  const [showTrailer, setShowTrailer] = useState(false)

  useEffect(() => {
    if (!movie) return
    const watched = JSON.parse(localStorage.getItem('watched') || '[]')
    const filtered = watched.filter(w => w.id !== movie.id)
    const updated = [movie, ...filtered].slice(0, 10)
    localStorage.setItem('watched', JSON.stringify(updated))
  }, [movie])

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]')
    const updated = isFavorite
      ? favs.filter(f => f.id !== movie.id)
      : [...favs, movie]
    localStorage.setItem('favorites', JSON.stringify(updated))
    setIsFavorite(!isFavorite)
  }

  const handleRating = (star) => {
    const ratings = JSON.parse(localStorage.getItem('ratings') || '{}')
    ratings[id] = star
    localStorage.setItem('ratings', JSON.stringify(ratings))
    setUserRating(star)
  }

  const handleDownload = () => {
    alert('Backend ulangandan so\'ng yuklab olish ishlaydi! 🎬')
  }

  const similarMovies = MOCK_MOVIES.filter(m =>
    m.id !== movie?.id &&
    m.genre.split(', ').some(g => movie?.genre.includes(g))
  ).slice(0, 4)

  if (!movie) return (
    <div className="detail-notfound">
      <h2>Movie not found</h2>
      <button onClick={() => navigate('/')}>Go back</button>
    </div>
  )

  return (
    <div className="detail-page">
      <div className="detail-bg" style={{ backgroundImage: `url(${movie.poster})` }} />
      <div className="detail-overlay" />

      <div className="detail-content">
        <button className="detail-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back
        </button>

        <div className="detail-main">
          <img src={movie.poster} alt={movie.title} className="detail-poster" />

          <div className="detail-info">
            <h1 className="detail-title">{movie.title}</h1>

            <div className="detail-meta">
              <span><Star size={14} className="meta-icon" /> {movie.rating} / 10</span>
              <span><Clock size={14} className="meta-icon" /> {movie.duration}</span>
              <span><Calendar size={14} className="meta-icon" /> {movie.year}</span>
              <span><User size={14} className="meta-icon" /> {movie.director}</span>
            </div>

            <div className="detail-genres">
              {movie.genre.split(', ').map(g => (
                <span key={g} className="genre-tag">{g}</span>
              ))}
            </div>

            <p className="detail-desc">{movie.description}</p>

            {/* RATING */}
            <div className="rating-section">
              <p className="rating-label">Your Rating:</p>
              <div className="stars-wrap">
                {Array.from({ length: 10 }, (_, i) => i + 1).map(star => (
                  <button
                    key={star}
                    className={`star-btn ${star <= (hoverRating || userRating) ? 'active' : ''}`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleRating(star)}
                  >
                    ★
                  </button>
                ))}
                {userRating > 0 && (
                  <span className="rating-val">{userRating} / 10</span>
                )}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="detail-btns">
              <button className="trailer-btn" onClick={() => setShowTrailer(true)}>
                <Play size={17} fill="currentColor" /> Watch Trailer
              </button>
              <button className={`detail-fav-btn ${isFavorite ? 'active' : ''}`} onClick={toggleFavorite}>
                <Heart size={17} fill={isFavorite ? '#ff6b8a' : 'none'} />
                {isFavorite ? 'Saved' : 'Favorite'}
              </button>
              <button className="download-btn" onClick={handleDownload}>
                <Download size={17} /> Download
              </button>
            </div>
          </div>
        </div>

        {/* SIMILAR MOVIES */}
        {similarMovies.length > 0 && (
          <div className="similar-section">
            <h2 className="similar-title">Similar <span>Movies</span></h2>
            <div className="similar-grid">
              {similarMovies.map(m => (
                <MovieCard
                  key={m.id}
                  movie={m}
                  isFavorite={!!JSON.parse(localStorage.getItem('favorites') || '[]').find(f => f.id === m.id)}
                  onToggleFavorite={(mov) => {
                    const favs = JSON.parse(localStorage.getItem('favorites') || '[]')
                    const exists = favs.find(f => f.id === mov.id)
                    const updated = exists ? favs.filter(f => f.id !== mov.id) : [...favs, mov]
                    localStorage.setItem('favorites', JSON.stringify(updated))
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* TRAILER MODAL */}
      {showTrailer && (
        <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
          <div className="trailer-box" onClick={e => e.stopPropagation()}>
            <button className="trailer-close" onClick={() => setShowTrailer(false)}>
              <X size={22} />
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed?search=${movie.title}+official+trailer&autoplay=1`}
              title="Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  )
}