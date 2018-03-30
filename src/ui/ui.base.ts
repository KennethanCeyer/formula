import { FormulizeOptions } from '../../dist/types/formulize/option.interface';
import { UIHook } from './ui.hook';

export abstract class UIBase extends UIHook {
    public constructor(elem: HTMLElement, options?: FormulizeOptions) {
        super(elem, options);
        this.attachEvents();
    }
}
