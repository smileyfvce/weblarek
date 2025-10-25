import { ICard } from '../../../types';
import { ensureElement } from '../../../utils/utils';
import { Component } from '../../base/Component';
import { IEvents } from '../../base/events';

export interface IExtendsCardView extends ICard {
	textButton: string;
	cardIndex: number;
}

export class BaseCardView extends Component<IExtendsCardView> {
	protected _id: string;
	protected _title: HTMLElement;
	protected _price: HTMLElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);
		this._title = ensureElement('.card__title', this.container);
		this._price = ensureElement('.card__price', this.container);
	}

	set id(id: string) {
		this._id = id;
	}

	set title(text: string) {
		this.setText(this._title, text);
	}

	set price(price: number) {
		if (price) {
			this.setText(this._price, `${price.toString()} синапсов`);
		} else {
			this.setText(this._price, 'Бесценно');
		}
	}
}
