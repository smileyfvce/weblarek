import { IOrder } from '../../../types';
import { ensureElement } from '../../../utils/utils';
import { IEvents } from '../../base/events';
import { BaseFormView } from './BaseFormView';

export class PaymentFormView extends BaseFormView<Partial<IOrder>> {
	protected cardButton: HTMLButtonElement;
	protected cashButton: HTMLButtonElement;
	protected _address: HTMLInputElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container, events);
		this.cardButton = ensureElement<HTMLButtonElement>(
			'button[name="card"]',
			this.container
		);
		this.cashButton = ensureElement<HTMLButtonElement>(
			'button[name="cash"]',
			this.container
		);
		this._address = ensureElement<HTMLInputElement>(
			'input[name="address"]',
			this.container
		);

		this.cardButton.addEventListener('click', (evt: Event) => {
			this._change('payment' as keyof IOrder, 'card');
		});

		this.cashButton.addEventListener('click', (evt: Event) => {
			this._change('payment' as keyof IOrder, 'cash');
		});
	}

	togglePayment(selected: 'card' | 'cash') {
		this.toggleClass(this.cardButton, 'button_alt-active', selected === 'card');
		this.toggleClass(this.cashButton, 'button_alt-active', selected === 'cash');
	}

	set address(value: string) {
		this._address.value = value;
	}
}
