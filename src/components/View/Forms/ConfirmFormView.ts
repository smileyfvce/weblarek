import { ensureElement } from '../../../utils/utils';
import { Component } from '../../base/Component';

interface IConfirmFormView {
	total: number;
}

export class ConfirmFormView extends Component<IConfirmFormView> {
	protected closeButton: HTMLButtonElement;
	protected description: HTMLElement;

	constructor(protected container: HTMLElement, onClick: () => void) {
		super(container);

		this.closeButton = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			this.container
		);
		this.description = ensureElement(
			'.order-success__description',
			this.container
		);

		this.closeButton.addEventListener('click', onClick);
	}

	set total(value: number) {
		this.setText(this.description, `Списано ${value} синапсов`);
	}
}
