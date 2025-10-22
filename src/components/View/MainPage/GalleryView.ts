import { Component } from "../../base/Component";
import { IEvents } from "../../base/events";
// ГОТОВО

export interface IGalleryView {
// сохранить карточки в галлерее
  set content(cards: HTMLElement[]);
}

export class GalleryView extends Component<IGalleryView>{
  protected events: IEvents;

  constructor(container: HTMLElement, events: IEvents){
    super(container)
    this.events = events;
  }

    set content(cards: HTMLElement[]){
      this.container.replaceChildren(...cards);
    }
}