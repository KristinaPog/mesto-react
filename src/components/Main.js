import React from "react";
import api from "../utils/api";
import Card from './Card.js'

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([data, userData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(data.map(item=>({
          name: item.name,
          link: item.link,
          likes: item.likes.length,
          _id: item._id,
        })));
      })
      .catch((error) => { console.log(`Ошибка: ${error}`) })
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={() => { onEditAvatar(true) }}>
          <img src={userAvatar} alt="Аватар" className="profile__avatar" />
          <div className="profile__avatar-overlay"></div>
        </div>
        <div className="profile-info">
          <h1 className="profile-info__name">{userName}</h1>
          <button className="profile-info__button" id="button" aria-label="Редактировать" onClick={() => { onEditProfile(true) }}> </button>
          <p className="profile-info__status">{userDescription}</p>
        </div>
        <button className="profile__button" type="button" aria-label="Добавить изображение" onClick={() => { onAddPlace(true) }}> </button>
      </section>
      <section className="places">
        <ul className="places__list">
          {
          cards.map((card)=>(<Card key={card._id} card={card} onCardClick={onCardClick}/>))
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;