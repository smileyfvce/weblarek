import { IApi, IOrder, IOrderRes } from '../../types';
import { ICard } from '../../types/index';
import { Api, ApiListResponse } from './api';
export class AppApi extends Api {
	private cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getCards(): Promise<ICard[]> {
		return this.get('/product').then((response: ApiListResponse<ICard>) =>
			response.items.map((item) => ({
				...item,
				image: this.cdn + item.image.replace(/\.\w+$/, '') + '.png',
			}))
		);
	}
	postOrder(order: IOrder): Promise<IOrderRes> {
		return this.post('/order', order).then((data: IOrderRes) => data);
	}
}
