import { ensureElement } from '../../../utils/utils';
import { Component } from '../../base/Component';
import { IEvents } from '../../base/events';
// +

export interface IGalleryView {
	cards: HTMLElement[];
	wrapper: boolean;
}

export class GalleryView extends Component<IGalleryView> {
	protected gallery: HTMLElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);
		this.gallery = ensureElement('.gallery', this.container);
	}
	// сеттер для карточек в галлерее
	set content(cards: HTMLElement[]) {
		this.gallery.replaceChildren(...cards);
	}
	// сеттер для блокировки прокрутки
	set wrapperLock(lock: boolean) {
		if (lock) {
			this.container.classList.add('page__wrapper_locked');
		} else this.container.classList.remove('page__wrapper_locked');
	}
}
