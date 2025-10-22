import { EventEmitter, IEvents } from '../../base/events';
import { Component } from '../../base/Component';

//ГОТОВО
export interface IModalView {
	set content(content: HTMLElement);
	openModal(): void;
	closeModal(): void;
}

export class ModalView extends Component<IModalView> implements IModalView {
	protected _content: HTMLElement;
	protected closeButton: HTMLButtonElement;
	protected events: IEvents;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);
		this._content = container.querySelector('.modal__content');
		this.closeButton = container.querySelector('.modal__close');
		this.closeButton.addEventListener('click', () => {
			this.closeModal();
		});
		this.container.addEventListener('mousedown', (event) => {
			if (event.target === event.currentTarget) {
				this.closeModal();
			}
		});
	}
	set content(content: HTMLElement) {
		this._content.replaceChildren(content);
	}

	openModal() {
		this._content.classList.add('modal_active');
	}

	closeModal() {
		this._content.classList.remove('modal_active');
	}
}
