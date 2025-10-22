import { IDetailCardView } from "../../../types";
import { BasicCardView } from "./BasicCardView";
import { EventEmitter, IEvents } from '../../base/events';

// ГОТОВО
export class DetailCardView extends BasicCardView implements IDetailCardView{
  protected _category: HTMLElement;
  protected _image: HTMLImageElement;

  constructor(container: HTMLElement, events: IEvents){
    super(container, events)
    this._category = container.querySelector('.card__category');
    this._image = container.querySelector('.card__image');
  }

  set category(category: string){
    this._category.textContent = category;
  }

  set image(url: string){
    this._image.src = url;
  }
}