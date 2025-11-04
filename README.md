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

## Данные и типы данных используемые в приложении:

#### Тип данных для вариантов оплаты заказа

```
type TPaymentОptions = 'card' | 'cash' | null;
```

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

#### Тип данных для категорий товаров карточки

```
type TCategoryList =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';
```

#### Интерфейс модели данных карточки

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

#### Интерфейс для данных карточек на главной странице

```
interface ICardsList {
  cards: ICard[];
}
```

#### Модальное окно

```
interface IModalView {
  content: HTMLElement;    // контент модального окна
  isOpen: boolean;  // открыто/закрыто модальное окно
}
```

#### Интерфейс данных для карточки в модальном окне

```
interface ICardModalView extends ICard {
  inCart: boolean; // наличие товара в корзине
}
```

#### Интерфейс данных для карточки в модальном окне

```
interface ICartCount {
	count: number;
}
```

#### Тип данных корзины в модальном окне

```
type TCartModalView = Pick<IOrder, 'items' | 'total'>
```

#### Тип данных для для информации товара на главной странице

```
type TMainCardInfo = Pick<ICard, 'id' | 'category' | 'title' | 'image' | 'price'>;
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

#### Класс CardsModel

Класс отвечает за хранение и логику работы с данными карточек товаров.

##### Поля:

- `cards: ICard[]` - массив карточек
- `preview: ICard` - выбранная для просмотра карточка

##### Методы:

- `getCards():ICard[]` - получить все карточки
- `getCard(id: string): ICard` - получить карточку по id
- `setSelectedCard(card: ICard): void` - установить выбранную карточку
- `getSelectedCard(): ICard` - получить выбранную карточку

#### Класс BasketModel

Класс отвечает за хранение и логику работы с данными корзины.

##### Поля:

- `cards: ICard[]` - товары в корзине

##### Методы:

- `addCard(card: ICard)` - добавить товар в корзину
- `deleteCard(id: string): void` - удалить товар из корзины
- `getCards(): ICard[]` - получить товары корзины
- `getPriceSum(): number` - получить общую сумму
- `getCardsSum(): number` - получить количество товаров
- `cardInBasket(id: string): boolean` - проверка наличия товара
- `clear(): void` - очистить корзину

#### Класс OrderModel

Класс отвечает за хранение и логику работы с данными заказа.

##### Поля:

- `payment: 'card' | 'cash'` - способ оплаты
- `address: string` - адрес доставки
- `email: string` - email покупателя
- `phone: string` - телефон покупателя
- `errors` - ошибки валидации

##### Методы:

- `getData(): IOrder` - получить данные заказа
- `setValue(field: keyof IOrder, value: string): void` - установить значение поля
- `validatePayment(): boolean` - валидация оплаты и адреса
- `validateContacts(): boolean` - валидация контактов
- `clear(): void` - очистить данные

### Слой представления

#### Базовый класс Component

Класс является дженериком и родителем всех компонентов слоя представления. В дженерик принимает тип объекта, в котором данные будут передаваться в метод render для отображения данных в компоненте. В конструктор принимает элемент разметки, являющийся основным родительским контейнером компонента. Содержит метод render, отвечающий за сохранение полученных в параметре данных в полях компонентов через их сеттеры, возвращает обновленный контейнер компонента.

#### BaseFormView<T> - базовая форма

##### Поля:

- `submit: HTMLButtonElement` - кнопка отправки формы

- `_errors: HTMLElement` - элемент для отображения ошибок

- `container: HTMLFormElement` - форма

- `events: IEvents` - система событий

##### Методы:

- `render(state: Partial<T> & Partial<IFormState>): HTMLElement` - отрисовка формы

- `set valid(state: boolean)` - установить валидность формы
- `set errors(messages: string[])` - установить ошибки
- `_change(name: keyof T, value: string): void` - обработчик изменения поля

#### BaseCardView - базовый класс карточек

##### Поля:

- `_id: string` - идентификатор карточки
- `_title: HTMLElement` - элемент заголовка
- `_price: HTMLElement` - элемент цены
- `container: HTMLElement` - контейнер карточки
- `events: IEvents` - система событий

##### Методы:

- `set id(id: string)` - установить ID
- `set title(text: string)` - установить заголовок
- `set price(price: number)` - установить цену

#### CardGalleryView - карточка в галерее, наследует все поля BaseCardView

##### Поля:

- `_category: HTMLElement` - элемент категории
- `_image: HTMLImageElement` - элемент изображения

##### Методы:

- `set category(value: string)` - установить категорию
- `set image(url: string)` - установить изображение

#### CardPreviewView - превью карточки, наследует все поля CardGalleryView

##### Поля:

- `_description: HTMLElement` - элемент описания
- `cardButton: HTMLButtonElement` - кнопка действия

##### Методы:

- `set description(text: string)` - установить описание
- `set textButton(text: string)` - установить текст кнопки
- `set price(price: number | null)` - установить цену

#### CardBasketView - карточка в корзине, наследует все поля BaseCardView

##### Поля:

- `_index: HTMLElement` - элемент индекса
- `deleteButton: HTMLButtonElement` - кнопка удаления карточки из корзины

##### Методы:

- `set cardIndex(num: number)` - сеттер установки индекса карточки в корзине

#### GalleryView - главная страница с товарами

##### Поля:

- `gallery: HTMLElement` - контейнер галереи
- `container: HTMLElement` - основной контейнер
- `events: IEvents` - система событий

##### Методы:

- `set content(cards: HTMLElement[])` - установить карточки
- `set wrapperLock(lock: boolean)` - блокировка скролла

#### BasketView - корзина товаров

##### Поля:

- `_list: HTMLElement` - список товаров
- `basketButton: HTMLButtonElement` - кнопка оформления
- `_priceCounter: HTMLElement` - элемент общей суммы
- `container: HTMLElement` - контейнер корзины
- `events: IEvents` - система событий

##### Методы:

- `setCards(cards: HTMLElement[]): void` - установить карточки корзины
- `setTotal(total: number): void` - установить общую сумму

#### HeaderView - шапка приложения

##### Поля:

- `basketButton: HTMLButtonElement` - кнопка корзины
- `basketCounter: HTMLElement` - счетчик корзины
- `container: HTMLElement` - контейнер шапки
- `events: IEvents` - система событий

##### Методы:

- `set counter(num: number)` - установить счетчик корзины

#### ModalView - модальное окно

##### Поля:

- `contentElement: HTMLElement` - контейнер контента
- `closeButton: HTMLButtonElement` - кнопка закрытия
- `container: HTMLElement` - контейнер модалки
- `events: IEvents` - система событий

##### Методы:

- `set content(element: HTMLElement)` - установить контент
- `openModal(): void` - открыть модальное окно
- `closeModal(): void` - закрыть модальное окно

#### PaymentFormView - форма оплаты и адреса, наследует все поля BaseFormView

##### Поля:

- `cardButton: HTMLButtonElement` - кнопка оплаты картой
- `cashButton: HTMLButtonElement` - кнопка оплаты наличными
- `_address: HTMLInputElement` - поле адреса

##### Методы:

- `togglePayment(selected: 'card' | 'cash'): void` - переключить способ оплаты
- `set address(value: string)` - установить адрес

#### ContactsFormView - форма контактов, наследует все поля BaseFormView

#### Поля:

- `_email: HTMLInputElement` - поле email
- `_phone: HTMLInputElement` - поле телефона

#### Методы:

- `set email(value: string)` - установить email
- `set phone(value: string)` - установить телефон

#### ConfirmFormView - подтверждение заказа

##### Поля:

- `closeButton: HTMLButtonElement` - кнопка закрытия
- `description: HTMLElement` - элемент описания
- `container: HTMLElement` - контейнер подтверждения

##### Методы:

- `set total(value: number)` - установить итоговую сумму

### Слой коммуникации

#### Класс AppApi

Принимает в конструктор экземпляр класса Api и предоставляет методы реализующие взаимодействие с бэкендом сервиса.

## Взаимодействие компонентов

Код, описывающий взаимодействие представления и данных между собой находится в файле `index.ts`, выполняющем роль презентера.\
Взаимодействие осуществляется за счет событий генерируемых с помощью брокера событий и обработчиков этих событий, описанных в `index.ts`\
В `index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.

#### Список всех событий, которые могут генерироваться в системе:

##### События с классами слоя представления.
#### Работа с товарами:

- `cards:changed` - обновлен список карточек

`card:open` - открыть карточку товара

`card:selected` - карточка выбрана для просмотра

`card:toggle` - добавить/удалить из корзины

`card:delete` - удалить из корзины

#### Работа с корзиной:

`basket:changed` - изменилось содержимое корзины

`basket:open` - открыть корзину

`order:open` - начать оформление заказа

#### Формы заказа:

`order.address:change` - изменился адрес

`order.payment:change` - изменился способ оплаты

`contacts.email:change` - изменился email

`contacts.phone:change` - изменился телефон

`order:submit` - отправка формы оплаты

`contacts:submit` - отправка формы контактов

`validate:payment` - валидация формы способа оплаты

`validate:contacts` - валидация формы контактов

#### Модальные окна:

`modal:open` - открытие модалки

`modal:close` - закрытие модалки

