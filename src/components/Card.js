import React from "react";

function Card({ card, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(card); 
  };

  return (
    <li className="place">
      <img className="place__image" alt={card.name} src={card.link} onClick={handleCardClick}/>
      <div className="place__label">
        <h2 className="place__text">{card.name}</h2>
        <div className="like">
          <button type="button" className="like__icon" aria-label="Поставить лайк"></button>
          <p className="like__quantity">{card.likes}</p>
        </div>
      </div>
      <button type="button" className="trash"></button>
    </li>
  )
}

export default Card;