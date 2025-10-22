import { ICard } from '../../types';
import { IEvents } from '../base/events';
// ГОТОВО

export interface IBasketModel {
	// получить товары
	getCards(): ICard[];
	// добавить товар
	addCard(card: ICard): void;
	// удалить товар
	deleteCard(id: string): void;
	// проверка товаров на наличие в корзине
	cardInBasket(id: string): boolean;
	// получить общую сумму
	getTotal(cards: ICard[]): number;
	// получить колличество товаров в корзине
	getCardsLength(): number;
}

export class BasketModel implements IBasketModel {
	protected cards: ICard[] = [];
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	getCards() {
		return this.cards;
	}

	addCard(card: ICard) {
		if (!this.cardInBasket(card.id)) {
			this.cards.push(card);
			this.events.emit('basket:changed');
		}
	}

	deleteCard(id: string) {
		this.cards = this.cards.filter((item) => item.id !== id);
		this.events.emit('basket:changed');
	}

	cardInBasket(id: string) {
		return this.cards.some((item) => item.id === id);
	}

	getTotal(cards: ICard[]) {
		return this.cards.reduce((price, card) => price + card.price, 0);
	}

	getCardsLength() {
		return this.cards.length;
	}
}
