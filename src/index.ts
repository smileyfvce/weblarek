import './scss/styles.scss';

import { AppApi } from './components/base/AppApi';
import { EventEmitter } from './components/base/events';

import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { CardsModel } from './components/Model/CardsModel';
import { BaseCardView } from './components/View/Card/BaseCardView';
import { GalleryView } from './components/View/MainPage/GalleryView';
import { HeaderView } from './components/View/MainPage/HeaderView';
import { CardGalleryView } from './components/View/Card/CardGalleryView';
import { BasketModel } from './components/Model/BasketModel';
import { ModalView } from './components/View/Modal/ModalView';
//import { BasketView } from './components/View/Basket/BasketView';
import {
	CardPreviewView,
	TCardPreviewView,
} from './components/View/Card/CardPreviewView';
import { CardBasketView } from './components/View/Card/CardBasketView';
import { BasketView } from './components/View/Basket/BasketView';

// Шаблоны
// Карточки
const cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
// Формы

//классы
// Базовые
const events = new EventEmitter();
const api = new AppApi(CDN_URL, API_URL);

// Данные
const cardsModel = new CardsModel(events);
const basketModel = new BasketModel(events);
//const orderModel = new OrderModel(events);

// Представление
const header = new HeaderView(
	document.querySelector('.header') as HTMLElement,
	events
);
const gallery = new GalleryView(
	document.querySelector('.page__wrapper') as HTMLElement,
	events
);
const modal = new ModalView(
	document.querySelector('#modal-container') as HTMLElement,
	events
);
const basketView = new BasketView(cloneTemplate(basketTemplate), events);

// Получаем карточки с сервера
api
	.getCards()
	.then((cards) => {
		cardsModel.setCards(cards);
	})
	.catch((err) => {
		console.log(err);
	});

// Событие отрисовки карточек товаров в галлерее
events.on('cards:changed', () => {
	const cardsGallery = cardsModel
		.getCards()
		.map((card) =>
			new CardGalleryView(cloneTemplate(cardTemplate), events).render(card)
		);
	gallery.content = cardsGallery;
});
// Событие когда модалка открыта мы блокируем скролл
events.on('modal:open', () => {
	gallery.wrapperLock = true;
});
events.on('modal:close', () => {
	gallery.wrapperLock = false;
});

// Событие пользователь нажал на карточку
events.on('card:open', ({ id }: { id: string }) => {
	const card = cardsModel.getCard(id);
	cardsModel.setSelectedCard(card);
});
// Событие выбранная карточка сохраняется
events.on('card:selected', () => {
	const card = cardsModel.getSelectedCard();
	const cardPreviewElement = new CardPreviewView(
		cloneTemplate(cardPreviewTemplate),
		events
	);
	cardPreviewElement.render({
		...card,
		textButton: basketModel.cardInBasket(card.id)
			? 'Удалить из корзины'
			: 'В корзину',
	} as Partial<TCardPreviewView>);
	modal.content = cardPreviewElement.render();
	modal.openModal();
});
// Событие открытия корзины
events.on('basket:open', () => {
	const cards = basketModel.getCards().map((card, index) => {
		const cardIndex = index + 1;
		return new CardBasketView(cloneTemplate(cardBasketTemplate), events).render(
			Object.assign({ ...card, cardIndex }))
	});
	basketView.render({cards: cards, total: basketModel.getPriceSum()})
	modal.render({content: basketView.render()})
});
