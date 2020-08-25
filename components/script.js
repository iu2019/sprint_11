const userInfoButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__edit-button');
const avatarPlace = document.querySelector('.user-info__photo')

const formValidator = (form, initValue) => {
  return new FormValidator (form, initValue)
}

const popupAuthor = new PopupHolder (true, 'author', document.querySelector('.template.author-details').content);

const userInfo = new UserInfo (document.querySelector('.user-info__name').textContent, document.querySelector('.user-info__job').textContent,"", popupAuthor);
const api = new Api;
userInfo.renderUser();

const placesList = document.querySelector('.places-list');

const popupImg = new PhotoPopup (document.querySelector('.template.bigphoto').content);

const createNewCard = (name, link, likes, myLike, own, cardId) => {
  const newCard = new Card (name, link, likes, myLike, own, cardId, openPopupImg, document.querySelector('.template.card').content)
  // cardList.cards.push(newCard);
  // return newCard.create();
  return newCard;
}

const openPopupImg = (pictureUrl) => {
  popupImg.popupImg (event, pictureUrl);
}

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

/*REVIEW. Резюме.

Неплохая работа. Сделаны дополнительные задания.
Взаимодействие с сервером происходит.

Но, надо сделать работу с сервером более логически строгой и в большей степени учитывать асинхронность работы сервера.

Что надо исправить.


1. Нужно подкорректировать структуру методов класса Api (подробный комментарий и образец в классе Api).   ИУ: исправил

2.  Методы, содержащие обработку ответа сервера не должны быть методами класса Api (комментарий в классе Api).  ИУ: учел, исправил

3.  Инструкция закрытия форм при сабмите должна быть в методе then обработки ответа сервера (подробный комментарий в классе Api).  ИУ: исправил

4. Сохранять данные, введённые пользователем в форме профиля, в свойствах класса, можно только после получения положительного  ИУ: исправил
ответа от сервера, а не до обращения к серверу  (подробный комментарий в классе UserInfo).


_________________________________________________________________________________________________________________________________________

REVIEW2. Резюме2.

Вы хорошо потрудились над проектом. Надеюсь, приобрели полезные для себя знания.

Что можно усовершенствовать.

1. Лучше новую карточку, когда Вы её добавляете из формы, добавлять в начало списка с помощью метода prepend, чтобы пользователь
сразу увидел введённую карточку на экране и ему не надо было прокручивать до конца весь список на экране, чтобы увидеть новую карточку.
Представлять же карточки на экране при загрузке страницы надо, как Вы и делаете, через append, опять же для того, чтобы более свежие
карточки были в начале списка.

2. Лучше при работе с сервером цепочку промисов оставлять именно в таком виде:
api.methodApi(параметры).then(обработка ответа силами методов других классов).catch(...).finally();
и не оборачивать её без необходимости в какую-либо ещё функцию, чтобы не увеличивать объём кода и не делать его менее понятным.
Возможно, код будет проще и лаконичнее, если всю структуру общения  с сервером (в том числе обработчики сабмита форм, в которые, в основном,
и помещаются цепочки промисов) вынести в файл-точку входа в проект script.js. В методах других классов (не класса Api) при этом, я думаю, лучше
не делать вызовы методов Api, оставив за этими методами только функцию обработки ответов сервера, и вызывать эти методы в блоке then обработки
ответа в script.js.
Думаю при такой структуре код будет проще и его проще будет сопровождать и вводить новые функции для расширения проекта.


Задание принимается.

Желаю удачи и дальнейших успехов в учёбе!


*/


