import { useParams, useNavigate } from 'react-router-dom'
import { Heart, ArrowLeft, Star, Clock, Calendar, User } from 'lucide-react'
import { useState, useEffect } from 'react'

const MOCK_MOVIES = [
  { id: 1, title: 'Inception', year: '2010', director: 'Christopher Nolan', rating: '8.8', duration: '148 min', genre: 'Sci-Fi, Thriller', description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg' },
  { id: 2, title: 'Interstellar', year: '2014', director: 'Christopher Nolan', rating: '8.6', duration: '169 min', genre: 'Sci-Fi, Drama', description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanitys survival.', poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg' },
  { id: 3, title: 'The Dark Knight', year: '2008', director: 'Christopher Nolan', rating: '9.0', duration: '152 min', genre: 'Action, Crime', description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.', poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
  { id: 4, title: 'Oppenheimer', year: '2023', director: 'Christopher Nolan', rating: '8.5', duration: '180 min', genre: 'Biography, Drama', description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg' },
  { id: 5, title: 'The Matrix', year: '1999', director: 'Wachowski', rating: '8.7', duration: '136 min', genre: 'Sci-Fi, Action', description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.', poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg' },
  { id: 6, title: 'Dune', year: '2021', director: 'Denis Villeneuve', rating: '8.0', duration: '155 min', genre: 'Sci-Fi, Adventure', description: 'A noble family becomes embroiled in a war for control over the galaxys most valuable asset while its heir becomes troubled by visions of a dark future.', poster: 'https://image.tmdb.org/t/p/w500/d5NXSklpcvkD6xB32bn2V5dIo5g.jpg' },
]

export default function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const movie = MOCK_MOVIES.find(m => m.id === Number(id))

  const [isFavorite, setIsFavorite] = useState(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]')
    return favs.some(f => f.id === Number(id))
  })

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]')
    const updated = isFavorite
      ? favs.filter(f => f.id !== movie.id)
      : [...favs, movie]
    localStorage.setItem('favorites', JSON.stringify(updated))
    setIsFavorite(!isFavorite)
  }

  if (!movie) return (
    <div className="detail-notfound">
      <h2>Movie not found</h2>
      <button onClick={() => navigate('/')}>Go back</button>
    </div>
  )

  return (
    <div className="detail-page">
      <div
        className="detail-bg"
        style={{ backgroundImage: `url(${movie.poster})` }}
      />
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

            <button
              className={`detail-fav-btn ${isFavorite ? 'active' : ''}`}
              onClick={toggleFavorite}
            >
              <Heart size={18} fill={isFavorite ? '#ff6b8a' : 'none'} />
              {isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}