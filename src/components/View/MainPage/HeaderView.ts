import { ensureElement } from '../../../utils/utils';
import { Component } from '../../base/Component';
import { IEvents } from '../../base/events';

export interface IHeaderView {
	counter: number;
}

export class HeaderView extends Component<IHeaderView> {
	protected basketButton: HTMLButtonElement;
	protected basketCounter: HTMLElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);
		this.basketButton = ensureElement<HTMLButtonElement>(
			'.header__basket',
			this.container
		);
		this.basketCounter = ensureElement(
			'.header__basket-counter',
			this.container
		);
		this.basketButton.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	set counter(num: number) {
		this.setText(this.basketCounter, num.toString());
	}
}
