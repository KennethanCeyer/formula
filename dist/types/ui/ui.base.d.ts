import { UIHook } from './ui.hook';
import { FormulizeOptions } from '../formulize.interface';
export declare abstract class UIBase extends UIHook {
    constructor(elem: HTMLElement, options?: FormulizeOptions);
}
