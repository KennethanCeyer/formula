import { FormulizeOptions } from '../../dist/types/formulize/option.interface';
import { UIHook } from './ui.hook';
export declare abstract class UIBase extends UIHook {
    constructor(elem: HTMLElement, options?: FormulizeOptions);
}
