import { ICard, TBasketView } from '../../../types';
import { Component } from '../../base/Component';
import { IEvents } from '../../base/events';
// ГОТОВО
export class BasketView extends Component<TBasketView> {
	protected cards: ICard[];
	protected _content: HTMLElement;
	protected button: HTMLButtonElement;
	protected _priceCounter: HTMLElement;
	protected events: IEvents;

	constructor(container: HTMLElement, evens: IEvents) {
		super(container);
		this._content = container.querySelector('.basket__list');
		this.button = container.querySelector('.basket__button');
		this._priceCounter = container.querySelector('.basket__price');
		this.button.addEventListener('click', () => {
			this.events.emit('order:open');
		});
	}

	set content(content: HTMLElement[]) {
		this._content.replaceChildren(...content);
	}

	set total(total: number) {
		this._priceCounter.textContent = `${total.toString()} синапсов`;
	}
}
