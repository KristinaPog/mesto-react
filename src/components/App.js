import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js'
import ImagePopup from './ImagePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import api from './../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([data, userData]) => {
        setCurrentUser(userData);
        setCards(data.map(item => ({
          name: item.name,
          link: item.link,
          likes: item.likes,
          owner: item.owner,
          _id: item._id,
        })));
      })
      .catch((error) => { console.log(`Ошибка: ${error}`) })
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(userInfo) {
    api.setAvatar(userInfo)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
  }


  function handleAddPlaceSubmit(cardData) {
    api.setNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    if (card.owner._id === currentUser._id) {
      api.deleteCard(card._id)
        .then(setCards(cards => cards.filter((c) => c._id !== card._id)))
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />
          <Main
            cards={cards}
            onEditProfile={setIsEditProfilePopupOpen}
            onAddPlace={setIsAddPlacePopupOpen}
            onEditAvatar={setIsEditAvatarPopupOpen}
            onCardClick={setSelectedCard}
            onLikeClick={handleCardLike}
            onDeleteClick={handleCardDelete}
          />
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />



          <ImagePopup card={selectedCard} isOpen={selectedCard} onClose={closeAllPopups}></ImagePopup>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
