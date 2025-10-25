import { IOrder } from '../../../types';
import { ensureElement } from '../../../utils/utils';
import { IEvents } from '../../base/events';
import { BaseFormView } from './BaseFormView';

export class ContactsFormView extends BaseFormView<Partial<IOrder>> {
	protected _email: HTMLInputElement;
	protected _phone: HTMLInputElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container, events);
		this._email = ensureElement<HTMLInputElement>(
			'input[name="email"]',
			this.container
		);
		this._phone = ensureElement<HTMLInputElement>(
			'input[name="phone"]',
			this.container
		);
	}

	set email(value: string) {
		this._email.value = value;
	}

	set phone(value: string) {
		this._phone.value = value;
	}
}
