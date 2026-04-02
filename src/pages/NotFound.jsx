import { useNavigate } from 'react-router-dom'
import { Home, Film } from 'lucide-react'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="notfound-page">
      <div className="notfound-content">
        <div className="notfound-code">
          <span>4</span>
          <Film size={80} className="notfound-icon" />
          <span>4</span>
        </div>
        <h2 className="notfound-title">Page Not Found</h2>
        <p className="notfound-desc">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button className="notfound-btn" onClick={() => navigate('/')}>
          <Home size={16} /> Back to Home
        </button>
      </div>
    </div>
  )
}