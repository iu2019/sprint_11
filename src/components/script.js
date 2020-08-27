import UserInfo from './UserInfo'
import PopupHolder from './Popup'
import PhotoPopup from './PhotoPopup'
import editProfile from './Global'
import renderLoading from './Global'
import FormValidator from './FormValidator'
import CardList from './CardList'
import Card from './Card'
import Api from './Api'
import createNewCard from './Card'
import '../pages/index.css'


const userInfoButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__edit-button');
const avatarPlace = document.querySelector('.user-info__photo')

// export const formValidatorFunc = (form, initValue) => {
//   return new FormValidator (form, initValue)
// }

const popupAuthor = new PopupHolder (true, 'author', document.querySelector('.template.author-details').content);

const userInfo = new UserInfo (document.querySelector('.user-info__name').textContent, document.querySelector('.user-info__job').textContent,"", popupAuthor);

userInfo.renderUser();

const placesList = document.querySelector('.places-list');

// const popupImg = new PhotoPopup (document.querySelector('.template.bigphoto').content);

// export const createNewCard = (name, link, likes, myLike, own, cardId) => {
//   const newCard = new Card (name, link, likes, myLike, own, cardId, openPopupImg, document.querySelector('.template.card').content)
//   // cardList.cards.push(newCard);
//   // return newCard.create();
//   return newCard;
// }

// const openPopupImg = (pictureUrl) => {
//   popupImg.popupImg (event, pictureUrl);
// }



const cardList = new CardList(placesList, createNewCard);
cardList.getInitialCards();


const popupNewCard = new PopupHolder (false, 'addCard',document.querySelector('.template.new-card').content);
const popupAvatar = new PopupHolder (false, 'newAvatar', document.querySelector('.template.new-avatar').content);

function addButtonHandler() {
// открываем попап
  popupNewCard.open(["",""]);
}

function editButtonHandler() {
  const userInfoName = document.querySelector('.user-info__name');
  const userInfoJob = document.querySelector('.user-info__job');

  popupAuthor.open([userInfo.retrieveUser().name, userInfo.retrieveUser().about]);

}

function newAvatarHandler() {
  // открываем попап
  popupAvatar.open([""]);
}


// кнопка добавления карточки
userInfoButton.addEventListener('click', addButtonHandler);
// кнопка редактирования автора
editButton.addEventListener('click', editButtonHandler);
// кнопка редактирования аватара
avatarPlace.addEventListener('click', newAvatarHandler);




