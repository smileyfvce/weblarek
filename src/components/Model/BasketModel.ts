import { ICard } from '../../types';
import { IEvents } from '../base/events';

export class BasketModel {
	protected cards: ICard[] = [];

	constructor(protected events: IEvents) {}

	getCards(): ICard[] {
		return this.cards;
	}

	addCard(card: ICard): void {
		if (!this.cardInBasket(card.id)) {
			this.cards.push(card);
			this.events.emit('basket:changed');
		}
	}

	deleteCard(id: string): void {
		this.cards = this.cards.filter((card) => card.id !== id);
		this.events.emit('basket:changed');
	}

	clear(): void {
		this.cards.forEach((card) => {
			this.deleteCard(card.id);
		});
	}

	cardInBasket(id: string): boolean {
		return this.cards.some((card) => card.id === id);
	}

	getPriceSum(): number {
		return this.cards.reduce((sum, card) => sum + card.price, 0);
	}

	getCardsSum(): number {
		return this.cards.length;
	}
}
