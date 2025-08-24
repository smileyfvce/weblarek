// Интерфейс данных заказа
interface IOrder {
	address: string; // адрес
	email: string; // почта
	phone: string; // телефон
	payment: TPaymentОptions; // способы оплаты
	items: string[]; // массив id товаров
	total: number; // общая сумма заказа
}

// Интерфейс данных карточки товара
interface ICard {
	id: string; // id товара
	description: string; // описание
	image: string; // url картинки
	title: string; // название
	category: TCategoryList; // категории товара
	price: number | null; // цена товара
}

// Интерфейс данных для отображения карточки
interface CardViewData extends ICard {
	inCart: boolean; // наличие товара в корзине
}

// Интерфейс данных корзины
interface ICart {
	cards: ICard[];
}

// Интерфейс для данных карточек
interface ICardsList {
	cards: ICard[];
	preview: string | null;
}

// Интерфейс данных для предпросмотра карточки
interface ICardPreviewData extends TModalCardInfo {
	inCart: boolean; // наличие товара в корзине
}

// Интерфейс данных для отображения корзины
interface ICartModalViewData {
	items: ICard[]; // массив товаров в корзине
	totalPrice: number; // общая стоимость
}

// Интерфейс данных для модального окна

interface ModalViewData {
	title: string; // заголовок модального окна
	content: HTMLElement; // контент модального окна
	isOpen: boolean; // открыто/закрыто модальное окно
}

// Тип данных для категорий товаров
type TCategoryList =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

// Тип данных для вариантов оплаты
type TPaymentОptions = 'card' | 'cash' | null;

// Тип данных для информации товара на главной странице
type TMainCardInfo = Pick<ICard, 'category' | 'title' | 'image' | 'price'>;

// Тип данных для информации в модальном окне товара
type TModalCardInfo = Pick<
	ICard,
	'category' | 'title' | 'description' | 'image' | 'price'
>;

// Тип данных для информации товаров в корзине
type TCartCardInfo = Pick<ICard, 'id' | 'title' | 'price'>;

// Тип данных для модального окна с выбором оплаты
type TModalPayment = Pick<IOrder, 'payment' | 'address'>;

// Тип даанных для модального окно с контактами
type TModalContacts = Pick<IOrder, 'email' | 'phone'>;
