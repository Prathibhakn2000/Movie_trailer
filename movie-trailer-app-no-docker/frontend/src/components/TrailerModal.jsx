import React from 'react'

export default function TrailerModal({ youtubeKey, onClose }) {
  const src = `https://www.youtube.com/embed/${youtubeKey}?autoplay=1`;
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-inner" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={onClose}>✕</button>
        <div className="video">
          <iframe title="trailer" src={src} allow="autoplay; encrypted-media" frameBorder="0" allowFullScreen style={{width:'100%',height:'100%'}} />
        </div>
      </div>
    </div>
  )
}
