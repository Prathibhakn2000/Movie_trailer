import React from 'react'

export default function MovieCard({ movie, onPlay, onFav, isFav }) {
  const img = movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : ''
  const rating = movie.vote_average ? Number(movie.vote_average).toFixed(1) : 'N/A'
  const votes = movie.vote_count ? movie.vote_count.toLocaleString() : '0'
  const stars = movie.vote_average ? Math.round(movie.vote_average / 2) : 0

  return (
    <div className="card">
      {img ? <img src={img} alt={movie.title} /> : <div className="noimg">No Image</div>}
      <div className="info">
        <h3 title={movie.title}>{movie.title}</h3>
        <p className="rating">{'★'.repeat(stars)}{'☆'.repeat(5-stars)} <span className="num">{rating} / 10</span></p>
        <p className="votes">{votes} votes</p>
        <div className="actions">
          <button className="play" onClick={onPlay}>► Trailer</button>
          <button className="fav" onClick={onFav}>{isFav ? '💔 Unfav' : '❤️ Fav'}</button>
        </div>
      </div>
    </div>
  )
}
