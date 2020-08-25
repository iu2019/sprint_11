class CardList {
    constructor (container, card) {

      this.placesList = container;
      this.cards = [];   //  здесь храним cards
      this.card = card;     //  сюда передаем функцию генерации карточки
      this.cardId = "";

    }

    addCard = (name, link, likes, myLike, own, cardId) => {
      
      const cardHolder = this.card(name, link, likes, myLike, own, cardId);
      this.placesList.appendChild(cardHolder.create());
      return cardHolder;
      
    }

    render = () => {
      this.cards.forEach((elem) => {
        this.addCard(elem.name, elem.link, elem.likes, elem.myLike, elem.own, elem.cardId)
      })
    }

    addCardProc (event) {
      event.preventDefault();
      const popupForm = popupNewCard.popupEl.querySelector('.popup__form');
      // забираем текстовые поля карточки из полей ввода
      const name = popupForm.querySelector('.name');
      const link = popupForm.querySelector('.url');
      // создаем новую карточку и сразу добавляем в список
      //const card = this.addCard(name.value, link.value, 0, false, true, this.cardId);
      //api.transmitNewCard (card, popupNewCard, event);
      this.transmitNewCard (name.value, link.value, popupNewCard, event);
      // сбрасываем форму
      // popupForm.reset();
      // закрывавем попап
      // popupNewCard.close(event);

    }

    // updateCardListAndRender = (card) => {
    //   const instance = this.cards.find ( (item) => {return item.cardId === card.cardId});
    //   instance.likes = card.likes;
    //   instance.myLike = card.myLike;
    //   instance.renderLike();
    // }

    getInitialCards () {
      // let initialCards =[];
      api.getInfo ('cards')
      
      .then ((res) => {
          // console.log(res);
          Array.from(res).map ((item, index) => {
              this.cards.push(

                  createNewCard (
                      item.name,
                      item.link,
                      item.likes.length,
                      item.likes.some (
                          (fan) => {return (fan.name === api.me)}
                      ),
                      (item.owner.name === api.me),
                      item._id
                  )
              )
          });

          this.render();
      })

   }

    transmitNewCard (name, link, popup, event) {
      event.preventDefault();
      const popupForm = popup.popupEl.querySelector('.popup__form');
      renderLoading(true, popup, "+");
      
      api.postInfo ('cards', JSON.stringify({
          name: name,
          link: link
      }) )

      .then (res => {
          this.addCard(name, link, 0, false, true, res._id);
          
          popupForm.reset();
          popup.close(event);
          
          // console.log(res);
      })
      .catch (err=>console.log('Ошибка ', err))
      .finally (() => renderLoading(false, popup, "+"));
    
    }

    



}

