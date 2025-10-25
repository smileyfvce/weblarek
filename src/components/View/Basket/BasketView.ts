import {
	createElement,
	ensureElement,
} from '../../../utils/utils';
import { Component } from '../../base/Component';
import { IEvents } from '../../base/events';

export interface IBasketView {
	cards: HTMLElement[];
	total: number;
}
export class BasketView extends Component<IBasketView> {
	protected _list: HTMLElement;
	protected basketButton: HTMLButtonElement;
	protected _priceCounter: HTMLElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);
		this._list = ensureElement('.basket__list', this.container);
		this.basketButton = ensureElement<HTMLButtonElement>(
			'.basket__button',
			this.container
		);
		this._priceCounter = ensureElement('.basket__price', this.container);

		this.basketButton.addEventListener('click', () => {
			this.events.emit('order:open');
		});
	}

	setCards(cards: HTMLElement[]): void {
		if (cards.length) {
			this._list.replaceChildren(...cards);
			this.setDisabled(this.basketButton, false);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
			this.setDisabled(this.basketButton, true);
		}
	}

	setTotal(total: number): void {
		this.setText(this._priceCounter, `${total.toString()} синапсов`);
	}
	render(): HTMLElement {
		return super.render();
	}
}
