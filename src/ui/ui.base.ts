import { FormulizeOptions } from '../../dist/types/formulize/option.interface';
import { UIHook } from './ui.hook';
import { defaultOptions } from '../option.value';

export abstract class UIBase extends UIHook {
    public constructor(elem: HTMLElement, options: FormulizeOptions = { ...defaultOptions }) {
        super();
        this.elem = elem;
        this.options = options;

        if (this.isAlreadyInitialized())
            return;

        this.initializeDOM();
        this.attachEvents();
    }
}
