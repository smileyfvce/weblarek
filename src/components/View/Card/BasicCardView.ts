import { IBasicCardView, TBasicCardInfo, TDetailCardInfo } from "../../../types";import { Component } from "../../base/Component";
import { IEvents } from "../../base/events";
// ГОТОВО
// Родительский класс всех карточек
export class BasicCardView extends Component<TBasicCardInfo & TDetailCardInfo> implements IBasicCardView{
  protected _id: string;
  protected _title: HTMLElement;
  protected _price: HTMLElement;
  protected events: IEvents;

  constructor(container: HTMLElement, events:IEvents){
    super(container);
    this._title = this.container.querySelector('.card__title');
    this._price = this.container.querySelector('.card__price');
    this.events = events;
  }

  set id(id: string){
    this._id = id
  }

  set title(title: string){
    this._title.textContent = title;
  }

  set price(price: number){
    if(price){
      this._price.textContent = `${price.toString()} синапсов`;
    }else{
      this._price.textContent = 'Бесценно'
    }
  }
}