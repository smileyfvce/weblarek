import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/events";
import { BaseCardView } from "./BaseCardView";
// +
export class CardBasketView extends BaseCardView{
  protected _index: HTMLElement;
  protected deleteButton: HTMLButtonElement;

  constructor(protected container: HTMLElement, protected events: IEvents){
    super(container, events)
    this._index = ensureElement('.basket__item-index', this.container)
    this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
    this.deleteButton.addEventListener('click', () => {
      events.emit('card: delete', {id: this._id})
    })
  }
  set index(num: number){
    this.setText(this._index, num)
  }
}