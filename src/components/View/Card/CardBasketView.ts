import { IBasicCardView } from "../../../types";
import { IEvents } from "../../base/events";
import { BasicCardView } from "./BasicCardView";
// ГОТОВО
export class CardBasketView extends BasicCardView implements IBasicCardView{
  protected button: HTMLButtonElement;
  
  constructor(container: HTMLElement, events: IEvents){
    super(container, events)
    this.button = container.querySelector('.basket__item-delete');
    this.events = events
    this.button.addEventListener('click', () => {
      events.emit('card: delete', {id: this._id})
    })

  }
}