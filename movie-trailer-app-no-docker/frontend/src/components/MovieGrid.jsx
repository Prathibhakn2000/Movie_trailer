import React from 'react'
import MovieCard from './MovieCard'

export default function MovieGrid({ movies = [], onPlay, onFav, favIds = [] }) {
  if (!movies.length) return <div className="empty">No movies found</div>
  return (
    <div className="grid">
      {movies.map(m => (
        <MovieCard key={m.id} movie={m} onPlay={() => onPlay(m.id)} onFav={() => onFav(m)} isFav={favIds.includes(m.id)} />
      ))}
    </div>
  )
}
