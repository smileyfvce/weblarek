import { IBasicCardView, IDetailCardView } from '../../../types';
import { DetailCardView } from './DetailCardView';
import { IEvents } from '../../base/events';
// ГОТОВО
export class CardGalleryView
	extends DetailCardView
	implements IBasicCardView, IDetailCardView
{
	constructor(container: HTMLElement, events: IEvents) {
		super(container, events);
		this.container.addEventListener('click', () => {
			this.events.emit('card:open', { id: this._id });
		});
	}
}
