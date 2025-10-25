import { ICard } from '../../types';
import { IEvents } from '../base/events';

export class CardsModel {
	protected cards: ICard[] = [];
	protected preview: ICard;

	constructor(protected events: IEvents) {}

	getSelectedCard(): ICard {
		return this.preview;
	}

	getCards() {
		return this.cards;
	}

	setSelectedCard(card: ICard) {
		this.preview = card;
		this.events.emit('card:selected');
	}

	setCards(cards: ICard[]) {
		this.cards = cards;
		this.events.emit('cards:changed');
	}

	getCard(id: string) {
		return this.cards.find((card) => card.id === id);
	}
}
