# Проектная работа "Веб-ларек"

Ссылка на репозиторий GitHub:

https://github.com/smileyfvce/web-larek-frontend

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Данные и типы данных используемые в приложении

### Интерфейсы:

#### Интерфейс данных заказа

```
interface IOrder {
	address: string; // адрес
	email: string; // почта
	phone: string; // телефон
	payment: TPaymentОptions; // способы оплаты
	items: string[]; // массив id товаров
	total: number; // общая сумма заказа
}
```

#### Интерфейс данных карточки

```
interface ICard {
	id: string; // id товара
	description: string; // описание
	image: string; // url картинки
	title: string; // название
	category: TCategoryList; // категории товара
	price: number | null; // цена товара
}
```

#### Интерфейс данных для модального окна
```
interface IModalViewData {
  content: HTMLElement;    // контент модального окна
  isOpen: boolean;  // открыто/закрыто модальное окно
}
```

#### Интерфейс данных для предпросмотра карточки

```
interface ICardPreviewData extends TModalCardInfo {
  inCart: boolean; // наличие товара в корзине
}
```

#### Интерфейс данных для отображения карточки

```
interface CardViewData extends ICard {
  inCart: boolean; // наличие товара в корзине
}
```

#### Интерфейс данных корзины

```
interface ICart {
  cards: ICard[];
}
```

#### Интерфейс для данных карточек

```
interface ICardsList {
  cards: ICard[];
  preview: string | null;
}
```

#### Интерфейс данных для отображения корзины

```
interface ICartModalViewData {
  items: ICard[];      // массив товаров в корзине
  totalPrice: number;  // общая стоимость
}
```

### Типы:

#### Тип данных для категорий товаров

```
type TCategoryList =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';
```

#### Тип данных для вариантов оплаты

```
type TPaymentОptions = 'card' | 'cash' | null;
```

#### Тип данных для для информации товара на главной странице

```
type TMainCardInfo = Pick<ICard, 'category' | 'title' | 'image' | 'price'>;
```

#### Тип данных для информации в модальном окне товара

```
type TModalCardInfo = Pick<
	ICard,
	'category' | 'title' | 'description' | 'image' | 'price'
>;
```

#### Тип данных для информации товаров в корзине

```
type TCartCardInfo = Pick<ICard, 'id' | 'title' | 'price'>;
```

#### Тип данных для модального окна с выбором оплаты

```
type TModalPayment = Pick<IOrder, 'payment' | 'address'>;
```

#### Тип данных для модального окно с контактами

```
type TModalContacts = Pick<IOrder, 'email' | 'phone'>;
```

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP:

- слой представления, отвечает за отображение данных на странице.
- слой данных, отвечает за хранение и изменение данных.
- презентер, отвечает за связь представления и данных.

### Базовый код

#### Класс Api

Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.
Методы:

- `get` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
- `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.

#### Класс EventEmitter

Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.  
Основные методы, реализуемые классом описаны интерфейсом `IEvents`:

- `on` - подписка на событие.
- `emit` - инициализация события.
- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие.

### Слой данных

#### Класс OrderData

Класс отвечает за хранение и логику работы с данными заказа.

##### Поля:

- `_data: Partial<IOrder>` - Поле для хранения данных заказа.
- `events: IEvents` - экземпляр класса `EventEmitter` для инициации событий при изменении данных.

##### Методы:

- `setItems(items:string[])` - сохраняет список товаров.
- `setPayment(payment:TPaymentOptions):void` - сохраняет данные способа оплаты.
- `setAddress(address:string):void` - сохраняет данные поля адреса.
- `setEmail(email:string):void` - сохраняет данные поля почты.
- `setPhone(phone:string):void` - сохраняет данные поля телефона.
- `setTotalPrice(total:number):void` - сохраняет общую стоимость.
- `validationPaymentData(data: Record<keyof TModalPayment, string>):boolean` - проверка формы оплаты.
- `validationContactsData(data: Record<keyof TModalContacts, string>):boolean` - проверка формы контакты.
- `clear():void` - очистка данных из форм после отравки.
- а так-же сеттеры и геттеры для сохранения и получения данных из полей класса.

#### Класс CardsData

Класс отвечает за хранение и логику работы с данными карточек товаров.

##### Поля:

- `cards: ICard[]` - поле для хранения массива карточек.
- `preview: string | null` - поле для предварительного просмотра по id.
- `events: IEvents` - экземпляр класса `EventEmitter` для инициации событий при изменении данных.

##### Методы:

- `getItem(itemId: string):ICard[]` - возвращаем карточку по id.
- `clearPreview():void` - очищаем предпросмотр.
- а так-же сеттеры и геттеры для сохранения и получения данных из полей класса.

#### Класс CartData

Класс отвечает за хранение и логику работы с данными корзины.

##### Поля:

- `cards: ICard[]` - поле для хранения массива карточек.
- `events: IEvents` - экземпляр класса `EventEmitter` для инициации событий при изменении данных.

##### Методы:

- `addCard(card:ICard):void` - добавление товара.
- `deleteCard(cardId:string):void` - удаление товара.
- `hasCard(cardId:string):boolean` - проверка наличия товара в корзине.
- `clear():void` - очищает корзину после отправки.
- а так-же сеттеры и геттеры для сохранени и получения данных из полей класса.

### Слой представления

#### Базовый класс Component

Класс является дженериком и родителем всех компонентов слоя представления. В дженерик принимает тип объекта, в котором данные будут передаваться в метод render для отображения данных в компоненте. В конструктор принимает элемент разметки, являющийся основным родительским контейнером компонента. Содержит метод render, отвечающий за сохранение полученных в параметре данных в полях компонентов через их сеттеры, возвращает обновленный контейнер компонента.

#### Класс ModalView

Класс отвечает за отображение и управление модальными окнами. Наследует класс `Component<IModalViewData>`.

##### Поля:

- `contentContainer: HTMLElement` - контейнер контента.
- `closeButton: HTMLButtonElement` - кнопка закрытия модального окна.

##### Методы:

- `render(data: Partial<IModalViewData>): HTMLElement` - рендерит модальное окно.
- `renderContent(content: HTMLElement): void` - рендерит контент модального окна.
- `setEventListeners(): void` - установка слушателя событий.
- `open(): void` - открывает модальное окно.
- `close(): void` - закрывает модальное окно.
- `handleEsc(evt: keyEvent): void` - обрабатывает нажатие на esc.

#### Класс CardView

Класс для отображения карточки товара в каталоге. Наследует класс `Component<ICardViewData>`.

##### Методы:

- `render(data: Partial<CardViewData>):HTMLElement` - рендерит карточку.
- `setEventListeners():void` - установка слушателя события клика по карточке.

#### Класс CardModalView

Класс для отображения полной информации в модальном окне. Наследует класс Component<ICardPreviewData>.

##### Поля:

- `buyButton`: HTMLButtonElement;

##### Методы:

- `render(data: Partial<ICardPreviewData>):HTMLElement` - рендерит предпросмотр карточки.
- `updateButtonState(inCart:boolean):void` - обновление состояния кнопки.
- `setEventListeners():void` - установка слушателей событий на нажатие кнопок.

#### Класс CartItemView

Класс для отображения товара. Наследует класс Component<TCartCardInfo>.

##### Поля:

- `deleteButton: HTMLButtonElement;` - кнопка удаления.

##### Методы:

- `render(data: Partial<TCartCardInfo>):HTMLElement`
- `setEventListeners():void` - установка слушателя события на нажатие кнопки удаления.

#### Класс CartView

Класс отвечает за отображение корзины товаров.Наследует класс `Component<ICartModalViewData>`.

##### Поля:

- `container: HTMLElement` - контейнер для элементов корзины.
- `totalElement: HTMLElement` - элемент для общей суммы.
- `confirmButton: HTMLButtonElement` - кнопка оформления.

##### Методы:

- `render(data: Partial<CartmodalViewData>): HTMLElement` - рендерим корзину.
- `renderItems(items: ICard[]):void` - рендерит список товаров.
- `renderTotal(total: number): void` - рендерит общую сумму.
- `setEventListeners():void` - устанавливает слушателя события на нажатие кнопки оформления.

#### Класс PaymentFormView

Класс отвечает за отображение формы оплаты и адреса доставки.Наслеует класс `Component<TModalPayment>`.

##### Поля:

- `addressInput: HTMLInputElement` - поле ввода адреса.
- `cardPayment: HTMLButtonElement` - кнопка онлайн оплаты.
- `cashPayment: HTMLButtonElement` - кнопка оплаты при получении.
- `submitButton: HTMLElement` - кнопка продолжения оформления заказа.
- `errorElement: HTMLElement` - элемент отображения ошибки.

##### Методы:

- `render(data: Partial<TModalPayent>):HTMLElement` - рендерит форму оплаты и адреса доставки.
- `setEventListeners():void` - устанавливает слушателя события на input, кнопки выбора оплаты и продалжения оформления заказа.
- `setValidationState(isValid: boolean, errorMessage: string):void` - устанавливает состояние валиации формы

#### Класс ContactsFormView

Класс отвечает за отображение формы контактных данных. Наследует класс `Component<TModalContacts>`.

##### Поля:

- `emailInput: HTMLInputElement` - поле ввода email.
- `phoneInput: HTMLInputElement` - поле ввода телефона.
- `submitButton: HTMLButtonElement` - кнопка оформления заказа.
- `errorElement: HTMLElement` - элемент отображения ошибки.

##### Методы:

- `render(data: Partial<TModalContacts>):HTMLElement` - рендерит форму контактов.
- `setEventListeners():void` - устанавливает слушателя события на input и продолжения оформления заказа.
- `setValidationState(isValid: boolean, errorMessage: string):void` - устанавливает состояние валиации формы.

#### Класс ConfirmView

Класс отвечает за отображенние финального окна оформления заказа. Наследует класс `Component<{totalPrice: number}>`

##### Поля:

- `closeButton: HTMLButtonElement` -  кнопка закрытия.

##### Методы:

- `render(data: Partial<{totalPrice: number}>): HTMLElement` - рендерит финальное модальное окно.
- `setEventListeners():void` - установка слушателя на кнопку закрытия финального модального окна.

### Слой коммуникации

#### Класс AppApi

Принимает в конструктор экземпляр класса Api и предоставляет методы реализующие взаимодействие с бэкендом сервиса.

## Взаимодействие компонентов

Код, описывающий взаимодействие представления и данных между собой находится в файле `index.ts`, выполняющем роль презентера.\
Взаимодействие осуществляется за счет событий генерируемых с помощью брокера событий и обработчиков этих событий, описанных в `index.ts`\
В `index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.

#### Список всех событий, которые могут генерироваться в системе:

##### События с классами слоя представления.

- `card:open` - открыть карточку.
- `card:submit` - добавить товар в корзину.

- `cart:open` - открыть корзину.
- `cart:submit` - оформить список заказа.
- `cart:delete` - удалить товар из корзины.

- `order:open` - открыть модалку способа оплаты.
- `order-address:input` - изменение данных адреса в форме способа оплаты.
- `order-address:validate` - валидация формы с адресом.
- `order-payment:changed` - переключение способа оплаты.
- `order:submit` - подтверждение формы способа оплаты.

- `order-contacts:open` - открыть модалку с контактами.
- `order-email:input` - изменение данных почты.
- `order-email:validate` - валидация формы с почтой.
- `order-phone:input` - изменение данных телефона.
- `order-phone:validate` - валидация формы с телефоном.
- `order-contacts:submit` - подтверждение формы контактов.

- `confirm:submit` - подтверждение формы успешного заказа.
- `modal:close` - закрыть модальное окно.

##### События с классами слоя данных.

- `card:changed` - изменение данных модалки карточки.
- `cart:changed` - изменение данных модалки корзины.
- `count:changed` - изменение счётчика товаров.
- `totalPrice:changed` - изменение суммы товаров в корзине.
