import { ICardPreView } from "../../../types";
import { IEvents } from "../../base/events";
import { DetailCardView } from "./DetailCardView";
// ГОТОВО
export class CardPreView extends DetailCardView implements ICardPreView{
  protected _description: HTMLElement;
  protected button: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents){
    super(container, events)
    this._description = container.querySelector('.card__text');
    this.button = container.querySelector('.card__button');
    this.button.addEventListener('click', () => {
      events.emit('card:add', {id: this._id})
    })
  }

  set description(description: string){
    this._description.textContent = description;
  }

  cardTextAddBasket() {
    this.button.textContent = 'Купить'
  }
  cardTextDeleteBasket() {
    this.button.textContent = 'Удалить из корзины'    
  }
}