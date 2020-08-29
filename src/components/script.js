import {UserInfo, userInfo, popupAuthor} from './UserInfo'
import {PopupHolder} from './Popup'
import {PhotoPopup} from './PhotoPopup'
// import {editProfile} from './Global'
import {renderLoading} from './renderLoading'
import FormValidator from './FormValidator'
import {CardList, cardList, popupNewCard} from './CardList'
import {Card} from './Card'
import Api from './Api'
import {createNewCard} from './Card'

import '../pages/index.css'


const userInfoButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__edit-button');
const avatarPlace = document.querySelector('.user-info__photo')

userInfo.renderUser();

cardList.getInitialCards();

const popupAvatar = new PopupHolder (false, 'newAvatar', document.querySelector('.template.new-avatar').content, userInfo.newAvatar, 'undefined'
  // .bind(event, popup)
);

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




