import { IEvents } from '../../base/events';
import { BaseCardView } from './BaseCardView';
import { ensureElement } from '../../../utils/utils';
// +
// константа для окрашивания фона категорий добавлением класса в зависимости от ключа
const cardsCategories = {
	'софт-скил': 'card__category_soft',
	другое: 'card__category_other',
	дополнительное: 'card__category_additional',
	кнопка: 'card__category_button',
	'хард-скил': 'card__category_hard',
};

export class CardGalleryView extends BaseCardView {
	protected _category: HTMLElement;
	protected _image: HTMLImageElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container, events);
		this._category = ensureElement('.card__category', this.container);
		this._image = ensureElement<HTMLImageElement>('.card__image', this.container);
		this.container.addEventListener('click', () => {
			this.events.emit('card:open', { id: this._id });
		});
	}
	// сеттер для окрашивания категорий
	set category(value: string) {
		this.setText(this._category, value);
		if (value in cardsCategories) {
			this._category.classList.add(
				cardsCategories[value as keyof typeof cardsCategories]
			);
		}
	}
	// сеттер для изображений
	set image(url: string) {
		this.setImage(this._image, url, this.title);
	}
}
