import { Film, Code2, Mail, Users } from 'lucide-react'

export default function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <Film size={52} color="var(--accent)" />
        <h1 className="home-title">About <span>CineX</span></h1>
        <p className="about-desc">
          CineX is a modern movie search app built with React.js.
          Discover, explore, and save your favorite movies!
        </p>
      </div>

      <div className="about-cards">
        <div className="about-card">
          <Users size={28} color="var(--accent)" />
          <h3>The Team</h3>
          <p>Built by 4-guruh students as a frontend project. Backend powered by a RESTful API.</p>
        </div>
        <div className="about-card">
          <Film size={28} color="var(--accent)" />
          <h3>Tech Stack</h3>
          <p>React.js, React Router, Lucide Icons, CSS Variables, LocalStorage.</p>
        </div>
        <div className="about-card">
          <Code2 size={28} color="var(--accent)" />
          <h3>Open Source</h3>
          <p>This project is made for educational purposes. Feel free to explore the code!</p>
        </div>
      </div>

      <div className="about-contact">
        <Mail size={20} color="var(--accent)" />
        <span>Sunnat & Akobir — 4-guruh</span>
      </div>
    </div>
  )
}