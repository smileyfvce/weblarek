import { IApi } from '../../types';
import { ICard } from '../../types/index';
import { ApiListResponse } from './api';
export class AppApi {
	private _baseApi: IApi;
	private _cdn: string;

	constructor(baseApi: IApi, cdn: string) {
		this._baseApi = baseApi;
		this._cdn = cdn;
	}

	getCards(): Promise<ICard[]> {
		return this._baseApi
			.get<ApiListResponse<ICard>>(`/product`)
			.then((response) =>
				response.items.map((item) => ({
					...item,
					image: this._cdn + item.image,
				}))
			);
	}
}
