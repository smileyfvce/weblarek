import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/events";

// ГОТОВО

export interface IHeaderView{
   // сохранить счётчик
  set counter(counter: number)
}

export class HeaderView extends Component<IHeaderView>{
  protected basketButton: HTMLButtonElement;
  protected basketCounter: HTMLElement;
  protected events: IEvents;
  
  constructor(container: HTMLElement, events: IEvents){
    super(container)
    this.basketButton = ensureElement<HTMLButtonElement>('.header__basket')
    this.basketCounter = ensureElement('.header__basket-counter')
    this.basketButton.addEventListener('click', () => {
      events.emit('basket:open')
    })
  }
 
  set counter(counter: number){
    this.basketCounter.textContent = counter.toString();
  }
}