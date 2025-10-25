import { Component } from '../../base/Component';
import { cloneTemplate, ensureElement } from '../../../utils/utils';
import { IEvents } from '../../base/events';

interface IFormState {
	valid?: boolean;
	errorMessage?: string[];
}

export class BaseFormView<T> extends Component<IFormState> {
	protected submit: HTMLButtonElement;
	protected _errors: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);
		this.submit = ensureElement<HTMLButtonElement>(
			'button[type="submit"]',
			this.container
		);
		this._errors = ensureElement('.form__errors', this.container);

		this.container.addEventListener('input', (evt: Event) => {
			const input = evt.target as HTMLInputElement;
			const name = input.name as keyof T;
			const value = input.value;
			this._change(name, value);
		});

		this.submit.addEventListener('click', (evt: Event) => {
			evt.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});
	}

	protected _change(name: keyof T, value: string) {
		this.events.emit(`${this.container.name}.${String(name)}:change`, {
			name,
			value,
		});
	}

	set valid(state: boolean) {
		this.submit.disabled = !state;
	}

	set errors(messages: string[]) {
		this.setText(this._errors, messages.filter((z) => !!z).join('; '));
	}

	render(state: Partial<T> & Partial<IFormState>) {
		const { valid, errorMessage, ...inputs } = state;
		super.render({ valid, errorMessage });
		if (errorMessage) {
			this.errors = errorMessage;
		}
		Object.assign(this, inputs);
		return this.container;
	}
}
