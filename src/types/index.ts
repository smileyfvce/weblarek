import { ApiPostMethods } from '../components/base/api';

export interface ICard {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}
export interface IOrder {
	address: string;
	email: string;
	phone: string;
	payment: 'card' | 'cash' | '';
	total: number;
	items: string[];
}

export type TOrderFormData = Pick<
	IOrder,
	'address' | 'email' | 'phone' | 'payment'
>;

export interface IOrderRes {
	id: string;
	totalPrice: number;
}

export interface IApi {
	baseUrl: string;
	get<T>(uri: string): Promise<T>;
	post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

// ИНТЕРФЕЙСЫ МОДЕЛЕЙ ДАННЫХ

export interface ICardsModel {
	getSelectedCard(): ICard;
	getCards(): ICard[];
	setSelectedCard(card: ICard): void;
	setCards(cards: ICard[]): void;
	getCard(id: string): ICard;
}

export interface IBasketModel {
	getCards(): ICard[];
	addCard(card: ICard): void;
	deleteCard(id: string): void;
	clear(): void;
	cardInBasket(id: string): boolean;
	getPriceSum(): number;
	getCardsSum(): number;
}

export interface IOrderModel {
	setValue(field: keyof TOrderFormData, value: string): void;
	getData(): TOrderFormData;
	validatePayment(): boolean;
	validateContacts(): boolean;
	clear(): void;
}
