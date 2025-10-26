import { IOrder, TOrderFormData } from '../../types';
import { IEvents } from '../base/events';

export type TPaymentOptions = 'card' | 'cash' | '';

export class OrderModel {
	payment: TPaymentOptions = '';
	address: string = '';
	phone: string = '';
	email: string = '';
	errors: Partial<Record<keyof TOrderFormData, string>> = {};

	constructor(protected events: IEvents) {}

	setValue(field: keyof TOrderFormData, value: string) {
		if (field === 'payment') {
			this[field] = value as TPaymentOptions;
			this.events.emit('payment:change', { value: value });
		} else {
			this[field] = value;
		}
	}

	getData(): TOrderFormData {
		return {
			payment: this.payment,
			address: this.address,
			phone: this.phone,
			email: this.email,
		};
	}

	getOrderData(total: number, cards: string[]): IOrder {
		return {
			payment: this.payment,
			address: this.address,
			phone: this.phone,
			email: this.email,
			total: total,
			items: cards
		};
	}

	private isValidEmail(email: string): boolean {
		return email.includes('@') && email.length > 3;
	}

	private isValidPhone(phone: string): boolean {
		return /^\d+$/.test(phone.replace(/\s/g, '')); // только цифры, пробелы игнорируем
	}

	validatePayment(): boolean {
		this.errors = {};

		if (!this.payment) {
			this.errors.payment = 'Выберите способ оплаты';
		}
		if (!this.address?.trim()) {
			this.errors.address = 'Укажите адрес';
		}

		return Object.keys(this.errors).length === 0;
	}

	validateContacts(): boolean {
		this.errors = {};

		if (!this.email?.trim()) {
			this.errors.email = 'Укажите email';
		} else if (!this.isValidEmail(this.email)) {
			this.errors.email = 'Email должен содержать @';
		}

		if (!this.phone?.trim()) {
			this.errors.phone = 'Укажите телефон';
		} else if (!this.isValidPhone(this.phone)) {
			this.errors.phone = 'Телефон должен содержать только цифры';
		}

		return Object.keys(this.errors).length === 0;
	}

	clear() {
		this.payment = '';
		this.address = '';
		this.phone = '';
		this.email = '';
		this.errors = {};
	}
}
