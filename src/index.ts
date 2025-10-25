import './scss/styles.scss';
import { AppApi } from './components/base/AppApi';
import { EventEmitter } from './components/base/events';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { CardsModel } from './components/Model/CardsModel';
import { GalleryView } from './components/View/MainPage/GalleryView';
import { HeaderView } from './components/View/MainPage/HeaderView';
import { CardGalleryView } from './components/View/Card/CardGalleryView';
import { BasketModel } from './components/Model/BasketModel';
import { ModalView } from './components/View/Modal/ModalView';
import { CardPreviewView } from './components/View/Card/CardPreviewView';
import { CardBasketView } from './components/View/Card/CardBasketView';
import { BasketView } from './components/View/Basket/BasketView';
import { OrderModel } from './components/Model/OrderModel';
import { ContactsFormView } from './components/View/Forms/ContactsformView';
import { PaymentFormView } from './components/View/Forms/PaymentFormView';
import { ConfirmFormView } from './components/View/Forms/ConfirmFormView';

// Темплейты
const cardGalleryTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const paymentFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const confirmFormTemplate = ensureElement<HTMLTemplateElement>('#success');
//Базовые классы
const events = new EventEmitter();
const api = new AppApi(CDN_URL, API_URL);
// Модели данных
const cardsModel = new CardsModel(events);
const basketModel = new BasketModel(events);
const orderModel = new OrderModel(events);
// Представления
const header = new HeaderView(ensureElement<HTMLElement>('.header'), events);
const gallery = new GalleryView(
	ensureElement<HTMLElement>('.page__wrapper'),
	events
);
const modal = new ModalView(
	ensureElement<HTMLElement>('#modal-container'),
	events
);
const basket = new BasketView(cloneTemplate(basketTemplate), events);
const paymentForm = new PaymentFormView(
	cloneTemplate(paymentFormTemplate),
	events
);
const contactsForm = new ContactsFormView(
	cloneTemplate(contactsFormTemplate),
	events
);

// ПОЛУЧАЕМ И ЗАПИСЫВАЕМ КАРТОЧКИ С СЕРВЕРА
api
	.getCards()
	.then((cards) => {
		cardsModel.setCards(cards);
	})
	.catch((err) => {
		console.log(err);
	});

// ОТРИСОВЫВАЕМ КАРТОЧКИ В ГАЛЛЕРЕЕ
events.on('cards:changed', () => {
	const cardsGallery = cardsModel.getCards().map((card) => {
		const cardView = new CardGalleryView(
			cloneTemplate(cardGalleryTemplate),
			events
		);
		return cardView.render(card);
	});
	gallery.content = cardsGallery;
});

// ОБНОВЛЕНИЕ КАРТОЧЕК В КОРЗИНЕ
events.on('basket:changed', () => {
	header.render({ counter: basketModel.getCardsSum() });

	const cards = basketModel.getCards().map((card, index) => {
		const cardView = new CardBasketView(
			cloneTemplate(cardBasketTemplate),
			events
		);
		return cardView.render({
			id: card.id,
			title: card.title,
			price: card.price,
			cardIndex: index + 1,
		});
	});
	basket.setCards(cards);
	basket.setTotal(basketModel.getPriceSum());
});

// КНОПКА В ПРЕВЬЮ ДОБАВЛЯЕТ И УДАЛЯЕТ ТОВАРЫ В КОРЗИНУ
events.on('card:toggle', (data: { id: string }) => {
	const card = cardsModel.getCard(data.id);
	if (!card) return;
	if (basketModel.cardInBasket(card.id)) {
		basketModel.deleteCard(card.id);
	} else {
		if (card.price !== null) {
			basketModel.addCard(card);
		}
	}
});

// УДАЛЕНИЕ КАРТОЧКИ В КОРЗИНЕ
events.on('card:delete', ({ id }: { id: string }) => {
	if (basketModel.cardInBasket(id)) {
		basketModel.deleteCard(id);
	}
});

// КЛИК НА КАРТОЧКУ И ЗАПИСЫВАЕМ В СЛЕДУЮЩИЙ ЭТАП
events.on('card:open', ({ id }: { id: string }) => {
	const card = cardsModel.getCard(id);
	cardsModel.setSelectedCard(card);
});

// ОТКРЫВАЕМ ПРЕВЬЮ ВЫБРАННОЙ КАРТОЧКИ
events.on('card:selected', () => {
	const card = cardsModel.getSelectedCard();
	const cardPreviewElement = new CardPreviewView(
		cloneTemplate(cardPreviewTemplate),
		events
	);
	const previewContent = cardPreviewElement.render({
		...card,
		textButton: basketModel.cardInBasket(card.id)
			? 'Удалить из корзины'
			: 'В корзину',
	});
	modal.content = previewContent;
	modal.openModal();
});

// ОТКРЫТИЕ КОРЗИНЫ
events.on('basket:open', () => {
	const cards = basketModel.getCards().map((card, index) => {
		const cardView = new CardBasketView(
			cloneTemplate(cardBasketTemplate),
			events
		);
		return cardView.render({
			id: card.id,
			title: card.title,
			price: card.price,
			cardIndex: index + 1,
		});
	});
	basket.setCards(cards);
	basket.setTotal(basketModel.getPriceSum());
	modal.render({ content: basket.render() });
	modal.openModal();
});

// ОТКРЫТИЕ ФОРМЫ ОПЛАТЫ
events.on('order:open', () => {
	const form = paymentForm.render({
		address: '',
		valid: false,
		errorMessage: [],
	});
	modal.render({ content: form });
});

// ОБРАБОТЧИКИ ФОРМЫ ОПЛАТЫ И ДОСТАВКИ

// ИЗМЕНИЛСЯ АДРЕС
events.on('order.address:change', (data: any) => {
	orderModel.setValue('address', data.value);

	const isValid = orderModel.validatePayment();
	const errors = orderModel.errors;

	paymentForm.render({
		valid: isValid,
		errorMessage: [errors.address, errors.payment].filter(Boolean),
	});
});

// ИЗМЕНИЛСЯ СПОСОБ ОПЛАТЫ
events.on('order.payment:change', (data: any) => {
	orderModel.setValue('payment', data.value);
	paymentForm.togglePayment(data.value);

	const isValid = orderModel.validatePayment();
	const errors = orderModel.errors;

	paymentForm.render({
		valid: isValid,
		errorMessage: [errors.address, errors.payment].filter(Boolean),
	});
});

// ОБРАБОТЧИКИ ФОРМЫ КОНТАКТОВ

// ИЗМЕНИЛСЯ EMAIL
events.on('contacts.email:change', (data: any) => {
	orderModel.setValue('email', data.value);

	const isValid = orderModel.validateContacts();
	const errors = orderModel.errors;

	contactsForm.render({
		valid: isValid,
		errorMessage: [errors.email, errors.phone].filter(Boolean),
	});
});

// ИЗМЕНИЛСЯ ТЕЛЕФОН
events.on('contacts.phone:change', (data: any) => {
	orderModel.setValue('phone', data.value);

	const isValid = orderModel.validateContacts(); 
	const errors = orderModel.errors;

	contactsForm.render({
		valid: isValid,
		errorMessage: [errors.email, errors.phone].filter(Boolean),
	});
});

// ПОДТВЕРДИЛИ СПОСОБ ОПЛАТЫ И АДРЕС
events.on('order:submit', () => {
	if (!orderModel.validatePayment()){ return};

	const contactFormHTML = contactsForm.render({
		email: orderModel.email || '',
		phone: orderModel.phone || '',
		valid: false,
		errorMessage: [],
	});

	modal.render({
		content: contactFormHTML,
	});
});

// ПОДТВЕРДИЛИ EMAIL и  ТЕЛЕФОН
events.on('contacts:submit', () => {
	const orderData = orderModel.getData();

	api
		.post('/order', {
			...orderData,
			total: basketModel.getPriceSum(),
			items: basketModel.getCards().map((item) => item.id),
		})
		.then((result: any) => {
			const successHTML = new ConfirmFormView(
				cloneTemplate(confirmFormTemplate),
				() => modal.closeModal()
			).render({
				total: result.total,
			});

			modal.render({
				content: successHTML,
			});

			basketModel.clear();
			orderModel.clear();
			paymentForm.togglePayment('card');
		})
		.catch((err) => {
			console.error(err);
		});
});
// ОТКРЫТА МОДАЛКА БЛОКИРУЕМ СКРОЛЛ
events.on('modal:open', () => {
	gallery.wrapperLock = true;
});
// ЗАКРЫТА МОДАЛКА РАЗБЛОКИРУЕМ СКРОЛЛ
events.on('modal:close', () => {
	gallery.wrapperLock = false;
});
