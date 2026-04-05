import { useParams, useNavigate } from 'react-router-dom'
import { Heart, ArrowLeft, Star, Clock, Calendar, User, Download, Play, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getMovieById } from '../services/api'

export default function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [showDownload, setShowDownload] = useState(false)

  useEffect(() => {
    setLoading(true)
    getMovieById(id)
      .then(data => {
        setMovie(data)
        setLoading(false)
        const watched = JSON.parse(localStorage.getItem('watched') || '[]')
        const filtered = watched.filter(w => w.id !== data.id)
        localStorage.setItem('watched', JSON.stringify([data, ...filtered].slice(0, 10)))
        const favs = JSON.parse(localStorage.getItem('favorites') || '[]')
        setIsFavorite(favs.some(f => f.id === data.id))
        const ratings = JSON.parse(localStorage.getItem('ratings') || '{}')
        setUserRating(ratings[id] || 0)
      })
      .catch(() => setLoading(false))
  }, [id])

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

  const handleTrailer = () => {
    window.open(
      'https://www.youtube.com/results?search_query=' +
      encodeURIComponent(movie.title + ' ' + movie.year + ' official trailer'),
      '_blank'
    )
  }

  const openYoutube = () => {
    window.open(
      'https://www.youtube.com/results?search_query=' +
      encodeURIComponent(movie.title + ' ' + movie.year + ' full movie'),
      '_blank'
    )
  }

  const openImdb = () => {
    window.open('https://www.imdb.com/title/' + movie.id + '/', '_blank')
  }

  const openDownload = () => {
    window.open(
      'https://archive.org/search?query=' +
      encodeURIComponent(movie.title + ' ' + movie.year) +
      '&and[]=mediatype%3A%22movies%22',
      '_blank'
    )
  }

  if (loading) return (
    <div className="detail-page">
      <div className="detail-overlay" />
      <div className="detail-content">
        <div className="detail-loading">
          <div className="loading-spinner" />
          <p>Loading...</p>
        </div>
      </div>
    </div>
  )

  if (!movie) return (
    <div className="detail-notfound">
      <h2>Movie not found</h2>
      <button onClick={() => navigate('/')}>Go back</button>
    </div>
  )

  return (
    <div className="detail-page">
      <div className="detail-bg" style={{ backgroundImage: 'url(' + movie.poster + ')' }} />
      <div className="detail-overlay" />

      <div className="detail-content">
        <button className="detail-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back
        </button>

        <div className="detail-main">
          <img
            src={movie.poster || 'https://via.placeholder.com/260x380?text=No+Poster'}
            alt={movie.title}
            className="detail-poster"
          />

          <div className="detail-info">
            <h1 className="detail-title">{movie.title}</h1>

            <div className="detail-meta">
              <span><Star size={14} className="meta-icon" /> {movie.rating} / 10</span>
              <span><Clock size={14} className="meta-icon" /> {movie.duration}</span>
              <span><Calendar size={14} className="meta-icon" /> {movie.year}</span>
              <span><User size={14} className="meta-icon" /> {movie.director}</span>
            </div>

            <div className="detail-genres">
              {movie.genre && movie.genre !== 'N/A'
                ? movie.genre.split(', ').map(g => (
                    <span key={g} className="genre-tag">{g}</span>
                  ))
                : <span className="genre-tag">N/A</span>
              }
            </div>

            <p className="detail-desc">
              {movie.description !== 'N/A' ? movie.description : 'No description available.'}
            </p>

            <div className="rating-section">
              <p className="rating-label">Your Rating:</p>
              <div className="stars-wrap">
                {Array.from({ length: 10 }, (_, i) => i + 1).map(star => (
                  <button
                    key={star}
                    className={'star-btn ' + (star <= (hoverRating || userRating) ? 'active' : '')}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleRating(star)}
                  >★</button>
                ))}
                {userRating > 0 && <span className="rating-val">{userRating} / 10</span>}
              </div>
            </div>

            <div className="detail-btns">
              <button className="trailer-btn" onClick={handleTrailer}>
                <Play size={17} fill="currentColor" /> Watch Trailer
              </button>
              <button
                className={'detail-fav-btn ' + (isFavorite ? 'active' : '')}
                onClick={toggleFavorite}
              >
                <Heart size={17} fill={isFavorite ? '#ff6b8a' : 'none'} />
                {isFavorite ? 'Saved' : 'Favorite'}
              </button>
              <button className="download-btn" onClick={() => setShowDownload(true)}>
                <Download size={17} /> Watch Full
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDownload && (
        <div className="trailer-modal" onClick={() => setShowDownload(false)}>
          <div className="download-modal-box" onClick={e => e.stopPropagation()}>
            <button className="trailer-close" onClick={() => setShowDownload(false)}>
              <X size={22} />
            </button>
            <h2 className="download-title">{movie.title}</h2>
            <p className="download-desc">Choose how you want to watch:</p>
            <div className="download-options">
              <button className="download-option-btn youtube" onClick={openYoutube}>
                <Play size={20} /> Watch on YouTube
              </button>
              <button className="download-option-btn imdb" onClick={openImdb}>
                <Star size={20} /> View on IMDb
              </button>
              <button className="download-option-btn archive" onClick={openDownload}>
                <Download size={20} /> Download on Archive.org
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}