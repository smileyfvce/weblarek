import { Component } from '../components/base/Component';
// Интерфейс данных карточки
export interface ICard {
	id: string; // id товара
	description: string; // описание
	image: string; // url картинки
	title: string; // название
	category: string; // категории товара
	price: number | null; // цена товара
}

// Интерфейс данных заказа
export interface IOrder {
	address: string; // адрес
	email: string; // почта
	phone: string; // телефон
	payment: 'card' | 'cash' | ''; // способы оплаты
}

// Коммуникация с API

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface IApi {
	baseUrl: string;
	get<T>(uri: string): Promise<T>;
	post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}
