
export default class PhotoPopup {

        constructor (template) {
            this.template = template;
            
            this.popupEl = this.template.cloneNode(true).querySelector('.popup');
            this.popupEl.querySelector('.popup__close').addEventListener ('click', this.popupImgClose);
            document.querySelector('.root').appendChild(this.popupEl);
        }


        open = () => {
            // задаем попапу модификатор "открыт" и обнуляем сообщения ошибок ввода
            this.popupEl.classList.add('popup_is-opened');
        }

        close = () => {
            // удаляем у попапа модификатор "открыт", обнуляем флажки валидации и обнуляем сообщения ошибок ввода
            this.popupEl.classList.remove('popup_is-opened');
        }

        popupImg (event, link) {

            const card = event.target.closest('.place-card');


            if ( !event.target.classList.contains('place-card__delete-icon') ){

                this.popupEl.querySelector('img.image').src = link;
                this.open();

            }

        }

        popupImgClose = () => {
            this.close();

        }
}

// const popupImg = new PhotoPopup (document.querySelector('.template.bigphoto').content);

// export const openPopupImg = (pictureUrl) => {
//   popupImg.popupImg (event, pictureUrl);
// }