import { ensureElement } from '../../../utils/utils';
import { IEvents } from '../../base/events';
import { IExtendsCardView } from './BaseCardView';
import { CardGalleryView } from './CardGalleryView';

export type TCardPreviewView = {
	description: string;
	buttonText: string;
} & IExtendsCardView;

export class CardPreviewView extends CardGalleryView {
	protected _description: HTMLElement;
	protected cardButton: HTMLButtonElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container, events);
		this._description = ensureElement('.card__text', this.container);
		this.cardButton = ensureElement<HTMLButtonElement>(
			'.card__button',
			this.container
		);
		this.cardButton.addEventListener('click', () => {
			events.emit('card:toggle', { id: this._id });
		});
	}

	set description(text: string) {
		this.setText(this._description, text);
	}

	set price(price: number | null) {
		super.price = price;
		if (price !== null) {
			this.setDisabled(this.cardButton, false);
		} else {
			this.setDisabled(this.cardButton, true);
			this.setText(this.cardButton, 'Недоступно');
		}
	}

	set textButton(text: string) {
		if (this.cardButton.disabled) {
			return;
		}
		this.setText(this.cardButton, text);
	}

	render(data?: Partial<IExtendsCardView>): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}
}
