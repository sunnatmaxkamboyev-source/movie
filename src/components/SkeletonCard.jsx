export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-poster" />
      <div className="skeleton-info">
        <div className="skeleton-line long" />
        <div className="skeleton-line short" />
        <div className="skeleton-line medium" />
      </div>
    </div>
  )
}