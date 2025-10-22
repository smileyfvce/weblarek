import { Api } from './components/base/api';
import { AppApi } from './components/base/AppApi';
import { EventEmitter } from './components/base/events';
import './scss/styles.scss';
import { IApi } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { CardsModel } from './components/Model/CardsModel';
import { BasicCardView } from './components/View/Card/BasicCardView';
import { GalleryView } from './components/View/MainPage/GalleryView';
import { HeaderView } from './components/View/MainPage/HeaderView';
import { CardGalleryView } from './components/View/Card/CardGalleryView';
import { BasketModel } from './components/Model/BasketModel';
import { OrderModel } from './components/Model/OrderModel';
import { CardPreView } from './components/View/Card/CardPreviewView';
import { ModalView } from './components/View/Modal/ModalView';
import { BasketView } from './components/View/Basket/BasketView';

// DOM
const header = ensureElement('.header');
const gallery = ensureElement('.gallery');
const modal = ensureElement('.modal');
const basket = cloneTemplate<HTMLElement>(
	ensureElement<HTMLTemplateElement>('#basket')
);
const cardGallery = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreview = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasket = ensureElement<HTMLTemplateElement>('#card-basket');

//классы
// Базовые
const events = new EventEmitter();
const baseUrl: IApi = new Api(API_URL);
const api = new AppApi(baseUrl, CDN_URL);

// Данные
const cardsModel = new CardsModel(events);
const basketModel = new BasketModel(events);
const orderModel = new OrderModel(events);

// Представление
const headerView = new HeaderView(header, events);
const galleryView = new GalleryView(gallery, events);
const modalView = new ModalView(modal, events);
const basketView = new BasketView(basket, events);

// Получаем карточки
api
	.getCards()
	.then((cards) => {
		cardsModel.setCards(cards);
	})
	.catch((err) => {
		console.log(err);
	});

events.on('cards:changed', () => {
	const cards = cardsModel.getCards().map((card) => {
		const cardTemplate = cloneTemplate<HTMLElement>(cardGallery);
		const cardMainPage = new CardGalleryView(cardTemplate, events);
		return cardMainPage.render(card);
	});
	galleryView.content = cards;
});
