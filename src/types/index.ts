// Тип данных для вариантов оплаты заказа

type TPaymentОptions = 'card' | 'cash' | null;

// Интерфейс данных заказа

interface IOrder {
	address: string; // адрес
	email: string; // почта
	phone: string; // телефон
	payment: TPaymentОptions; // способы оплаты
	items: string[]; // массив id товаров
	total: number; // общая сумма заказа
}

// Тип данных для категорий товаров карточки

type TCategoryList =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

// Интерфейс модели данных карточки

interface ICard {
	id: string; // id товара
	description: string; // описание
	image: string; // url картинки
	title: string; // название
	category: TCategoryList; // категории товара
	price: number | null; // цена товара
}

// Интерфейс для данных карточек на главной странице

interface ICardsList {
  cards: ICard[];
}

// Модальное окно

interface IModalView {
  content: HTMLElement;    // контент модального окна
  isOpen: boolean;  // открыто/закрыто модальное окно
}

// Интерфейс данных для карточки в модальном окне

interface ICardModalView extends ICard {
  inCart: boolean; // наличие товара в корзине
}

// Интерфейс счетчика товаров в корзине

interface ICartCount {
	count: number;
}

// Тип данных корзины в модальном окне

type TCartModalView = Pick<IOrder, 'items' | 'total'>;

// Тип данных для для информации товара на главной странице

type TMainCardInfo = Pick<ICard, 'id' | 'category' | 'title' | 'image' | 'price'>;

// Тип данных для информации товаров в корзине

type TCartCardInfo = Pick<ICard, 'id' | 'title' | 'price'>;

// Тип данных для модального окна с выбором оплаты

type TModalPayment = Pick<IOrder, 'payment' | 'address'>;

// Тип данных для модального окно с контактами

type TModalContacts = Pick<IOrder, 'email' | 'phone'>;
