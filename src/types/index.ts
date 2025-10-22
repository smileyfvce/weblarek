import { Component } from '../components/base/Component';
// Интерфейс данных карточки
export interface ICard {
	id: string; // id товара
	description: string; // описание
	image: string; // url картинки
	title: string; // название
	category: string; // категории товара
	price: number | null; // цена товара
	index: number;
}

// Интерфейс данных заказа
export interface IOrder {
	address: string; // адрес
	email: string; // почта
	phone: string; // телефон
	payment: TPaymentОptions; // способы оплаты
	items: string[]; // массив id товаров
	total: number; // общая сумма заказа
}
// Тип данных для вариантов оплаты заказа
export type TPaymentОptions = 'card' | 'cash' | '';

// Типы представления карточер товаров
// Базовые поля всех карточек
export type TBasicCardInfo = {
	title: string;
	price: number | null;
};
// Все остальные поля
export type TDetailCardInfo = {
	category?: string; // только в галерее и превью
	image?: string; // только в галерее и превью
	index?: number; // только в галерее и превью
};
// Интерфейсы представления карточек товаров
// Базовый интерфейс с сетерами всех карточек его буду расширять
export interface IBasicCardView {
	set id(id: string);
	set title(title: string);
	set price(price: number);
}
// Детальный интерфейс карточки расширяет базовый
export interface IDetailCardView extends IBasicCardView {
	set category(category: string);
	set image(url: string);
}

// Интерфейс для превью карточки
export interface ICardPreView extends IBasicCardView, IDetailCardView{
	set description(descrtiption: string);
	cardTextAddBasket():void;
	cardTextDeleteBasket():void;
}

// Тип корзины
export type TBasketView = {
	content: HTMLElement;
	total: number;
}

// Коммуникация с API

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface IApi {
	baseUrl: string;
	get<T>(uri: string): Promise<T>;
	post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}
