interface IOrder {
	address: string;
	email: string;
	phone: string;
	payment: TPaymentОptions;
}

interface ICard {
	id: string;
	description: string;
	image: string;
	title: string;
	category: TCategoryList;
	price: number | null;
}

interface ICardsList {
	cards: ICard[];
	preview: string | null;
}

interface ICart {
	cards: ICardsList[]
};

type TCategoryList =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';
type TPaymentОptions = 'card' | 'cash' | null;
type TMainCardInfo = Pick<ICard, 'category' | 'title' | 'image' | 'price'>;
type TModalCardInfo = Pick<
	ICard,
	'category' | 'title' | 'description' | 'image' | 'price'
>;
type TCartCardInfo = Pick<ICard, 'id' | 'title' | 'price'>;
type TModalPayment = Pick<IOrder, 'payment' | 'address'>;
type TModalContacts = Pick<IOrder, 'email' | 'phone'>;
