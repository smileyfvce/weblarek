import { ICard } from "../../types";
import { IEvents } from "../base/events";
//+
export class CardsModel {
	protected cards: ICard[] = [];
	protected preview: ICard;

	constructor(protected events: IEvents) {}
	// получить выбранную карточку
	getSelectedCard():ICard{
		return this.preview;
	}
	// получить карточки
	getCards() {
		return this.cards;
	}
	// сохранить выбранную карточку
	setSelectedCard(card:ICard){
		this.preview = card;
		this.events.emit('card:selected')
	}
	// установить карточки
	setCards(cards: ICard[]) {
		this.cards = cards;
		this.events.emit('cards:changed');
	}
	// получить карточку по id
	getCard(id: string) {
		return this.cards.find((card) => card.id === id);
	}
}
