import Api from './Api'
import {openPopupImg} from './script'

const api = new Api;

export default class Card {
  constructor (name, link, likes, myLike, own, cardId, popupImg, template) {
      this.name = name;
      this.link = link;
      this.likes = likes;
      this.myLike = myLike;
      this.own = own;
      this.cardId = cardId;
      this.cardPopup = popupImg; // адрес функции для открывания попапа карточки
      this.template = template;
      this.cardElement = this.template.cloneNode(true).querySelector('.place-card');
      this.cardPopupBind = 'undefined';

  }

    like = (event) => {
      this.myLike? this.deleteLike(this) : this.putLike(this);
      
    }

    create() {
      
      const nameElement = this.cardElement.querySelector('.place-card__name');
      nameElement.textContent = this.name;

      const cardImage = this.cardElement.querySelector('.place-card__image');
      cardImage.style.backgroundImage = `url(${this.link})`;

      const cardLikeCount = this.cardElement.querySelector('.place-card__like-count');
      cardLikeCount.textContent = this.likes;

      if (! this.own) {
        this.cardElement.querySelector('.place-card__delete-icon').classList.add('place-card__delete-icon_none');
      }

      if (this.myLike ) {this.cardElement.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
    }

      this.setCardEventListeners ();
      this.renderLike ();
      return this.cardElement;
    }

    setCardEventListeners = () => {
      this.cardPopupBind = this.cardPopup.bind(event, this.link);
      if (this.own) {
        this
          .cardElement
          .querySelector('.place-card__delete-icon')
          .addEventListener('click', this.removeBind, {once : true});
      }
      this
        .cardElement
        .querySelector('.place-card__like-icon')
        .addEventListener('click', this.likeBind);
      this
        .cardElement
        .querySelector('.place-card__image')
        .addEventListener('click', this.cardPopupBind);
    }

    removeCardEventListeners = () => {
      if (this.own) {
        this
          .cardElement
          .querySelector('.place-card__delete-icon')
          .removeEventListener('click', this.removeBind, {once : true});
      }

      this
        .cardElement
        .querySelector('.place-card__like-icon')
        .removeEventListener('click', this.likeBind);
      this
        .cardElement
        .querySelector('.place-card__image')
        .removeEventListener('click', this.cardPopupBind);
    }

    remove = (event) => {
      if (window.confirm("Вы действительно хотите удалить эту карточку?")) { 
        event.preventDefault();
        this.deleteCard (this); 
      }
    }

    removeBind = this.remove.bind(this);
    likeBind = this.like.bind(this);
    
    renderLike = () => {
      this.cardElement.querySelector('.place-card__like-count').textContent = this.likes;
      if (this.myLike ) {this.cardElement.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');}
      else {this.cardElement.querySelector('.place-card__like-icon').classList.remove('place-card__like-icon_liked');}
    }
     
    putLike (card) {
      api.putInfo (`cards/like/${card.cardId}`)
      .then ((result) => {
          // console.log(result);
          this.likes = result.likes.length;
          this.myLike = true;
          this.cardElement.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
          this.cardElement.querySelector('.place-card__like-count').textContent = this.likes;
        })
      .catch (err=>console.log('Ошибка ', err));

    }

    deleteLike (card) {
        api.deleteInfo (`cards/like/${card.cardId}`)
          
        .then (result => {
            // console.log(result);
            this.likes = result.likes.length;
            this.myLike = false;
            this.cardElement.querySelector('.place-card__like-icon').classList.remove('place-card__like-icon_liked');
            this.cardElement.querySelector('.place-card__like-count').textContent = this.likes;

        })
        .catch (err=>console.log('Ошибка ', err));

    }

    deleteCard (card) {
      api.deleteInfo (`cards/${card.cardId}`)
      .then (res => {
        // console.log(res)
        
        this.removeCardEventListeners();
        this.cardElement.remove();
      })
      .catch (err=>console.log('Ошибка ', err))
    }
        
  }

  // export const createNewCard = (name, link, likes, myLike, own, cardId) => {
  //   const newCard = new Card (name, link, likes, myLike, own, cardId, openPopupImg, document.querySelector('.template.card').content)
  //   // cardList.cards.push(newCard);
  //   // return newCard.create();
  //   return newCard;
  // }