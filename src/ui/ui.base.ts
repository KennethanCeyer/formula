import { defaultOptions } from '../option.value';
import { UIHook } from './ui.hook';
import { FormulizeOptions } from '../formulize.interface';

export abstract class UIBase extends UIHook {
    public constructor(elem: HTMLElement, options: FormulizeOptions = { ...defaultOptions }) {
        super();
        this.elem = elem;
        this.options = { ...defaultOptions, ...options };

        if (this.isAlreadyInitialized())
            return;

        this.initializeDOM();
        this.attachEvents();
    }
}
