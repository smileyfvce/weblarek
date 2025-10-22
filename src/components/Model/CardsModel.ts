import { ICard } from "../../types";
import { IEvents } from "../base/events";
// ГОТОВО

export interface ICardsModel {
	// получает карточки
	getCards(): ICard[];
	// сохраняет карточки
	setCards (cards: ICard[]): void;
	// получает карточку по id
	getCard(id: string): ICard;
}

export class CardsModel implements ICardsModel {
	protected cards: ICard[];
	protected preview: ICard;
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	getCards() {
		return this.cards;
	}

	setCards(cards: ICard[]) {
		this.cards = cards;
		this.events.emit('cards:changed');
	}

	getCard(id: string) {
		return this.cards.find((card) => card.id === id);
	}
}
