import { createElement, ensureAllElements, ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/events";

// +
export interface IBasketView {
  cards: HTMLElement[];
  total: number;
}
export class BasketView extends Component<IBasketView> {
	protected _content: HTMLElement;
	protected basketButton: HTMLButtonElement;
	protected _priceCounter: HTMLElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);
		this._content = ensureElement('.basket__list', this.container);
		this.basketButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this._priceCounter = ensureElement('.basket__price', this.container);
		this.basketButton.addEventListener('click', () => {
			this.events.emit('order:open');
		});
	}

  	set content(cards: HTMLElement[]) {
		if(cards.length){
      this._content.replaceChildren(...cards)
      this.setDisabled(this.basketButton, false);
    }else {
      this._content.replaceChildren(createElement<HTMLParagraphElement>('p', {textContent: 'Корзина пуста'}))
    this.setDisabled(this.basketButton,true)
    }
	}

	set total(total: number) {
	this.setText(this._priceCounter, `${total.toString()} синапсов`);
	}
}
