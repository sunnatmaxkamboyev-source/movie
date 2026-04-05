import { useState, useEffect } from 'react'
import { Film, Users, Star, TrendingUp, Database, Clock } from 'lucide-react'

export default function About() {
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalFavorites: 0,
    totalWatched: 0,
    totalRatings: 0,
    avgRating: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    const watched = JSON.parse(localStorage.getItem('watched') || '[]')
    const ratings = JSON.parse(localStorage.getItem('ratings') || '{}')
    const ratingValues = Object.values(ratings)
    const avg = ratingValues.length > 0
      ? (ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length).toFixed(1)
      : 0

    setStats({
      totalMovies: 1000000,
      totalFavorites: favorites.length,
      totalWatched: watched.length,
      totalRatings: ratingValues.length,
      avgRating: avg,
    })
    setLoading(false)
  }, [])

  const statCards = [
    { icon: <Database size={28} color="var(--accent)" />, label: 'Movies in Database', value: '1,000,000+' },
    { icon: <Film size={28} color="#f5c518" />, label: 'Your Watched', value: stats.totalWatched },
    { icon: <Star size={28} color="#ff6b8a" />, label: 'Your Favorites', value: stats.totalFavorites },
    { icon: <TrendingUp size={28} color="#00b478" />, label: 'Your Ratings', value: stats.totalRatings },
    { icon: <Users size={28} color="var(--accent)" />, label: 'Avg Your Rating', value: stats.avgRating > 0 ? stats.avgRating + ' / 10' : 'N/A' },
    { icon: <Clock size={28} color="#f5c518" />, label: 'API Response', value: '< 1sec' },
  ]

  return (
    <div className="about-page">
      <div className="about-hero">
        <Film size={52} color="var(--accent)" />
        <h1 className="home-title">CINE<span>X</span> Stats</h1>
        <p className="about-desc">
          Your personal movie statistics and platform overview.
        </p>
      </div>

      {loading ? (
        <div className="detail-loading">
          <div className="loading-spinner" />
        </div>
      ) : (
        <div className="stats-grid">
          {statCards.map((card, i) => (
            <div key={i} className="stat-card">
              <div className="stat-icon">{card.icon}</div>
              <div className="stat-value">{card.value}</div>
              <div className="stat-label">{card.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="stats-footer">
        <p>Data is stored locally on your device.</p>
        <p>Powered by <span>MoviesDatabase API</span> & <span>MongoDB Atlas</span></p>
      </div>
    </div>
  )
}