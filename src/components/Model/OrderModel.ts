import { IOrder } from '../../types';
import { IEvents } from '../base/events';
// ГОТОВО

export interface IOrderModel {
	// получить данные заказа
	getOrderInfo(): Partial<IOrder>;
	// сохранить данные заказа
	setOrderInfo(info: Partial<IOrder>): void;
	// сохранить способ оплаты
	setPayment(payment: string): void;
	// сохранить адрес
	setAddress(address: string): void;
	// сохранить почту
	setEmail(email: string): void;
	// сохранить номер телефона
	setPhone(phone: string): void;
	// проверка на валидность
	isValidOrder(order: IOrder): boolean;
	isValidOrderData(): boolean;
}

export class OrderModel implements IOrderModel {
	protected payment: string;
	protected address: string;
	protected email: string;
	protected phone: string;
	protected order: IOrder;
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	getOrderInfo() {
		return this.order;
	}

	setOrderInfo(info: Partial<IOrder>) {
		Object.assign(this.order, info);
	}

	setPayment(payment: string) {
		this.payment = payment;
		this.events.emit('payment:changed', { payment: this.payment });
	}

	setAddress(address: string) {
		this.address = address;
		this.events.emit('address:changed');
	}

	setEmail(email: string) {
		this.email = email;
	}

	setPhone(phone: string) {
		this.phone = phone;
	}

	isValidOrder(order: IOrder) {
		return true;
	}
	isValidOrderData() {
		if (this.payment && this.address) {
			return true;
		} else {
			return false;
		}
	}
}
