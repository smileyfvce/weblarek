import { EventEmitter, IEvents } from '../../base/events';
import { Component } from '../../base/Component';
import { ensureElement } from '../../../utils/utils';

export interface IModalView {
	content: HTMLElement;
}

export class ModalView extends Component<IModalView> {
	protected contentElement: HTMLElement;
	protected closeButton: HTMLButtonElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);
		this.contentElement = ensureElement('.modal__content', this.container);
		this.closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			this.container
		);
		this.closeButton.addEventListener('click', () => {
			this.closeModal();
		});

		this.container.addEventListener('click', (event: MouseEvent) => {
			if (event.target === this.container) {
				this.closeModal();
			}
		});
	}

	set content(element: HTMLElement) {
		if (element) {
			this.contentElement.replaceChildren(element);
		} else {
			this.contentElement.innerHTML = '';
		}
	}

	openModal() {
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	closeModal() {
		this.container.classList.remove('modal_active');
		this.events.emit('modal:close');
	}

	render(data?: IModalView): HTMLElement {
		if (data?.content) {
			this.content = data.content;
		}
		this.openModal();
		return this.container;
	}
}
