import { FormulizeOptions } from '../formulize.interface';
export declare abstract class UIDom {
    protected elem: HTMLElement;
    protected options: FormulizeOptions;
    protected container: JQuery;
    protected statusBox: JQuery;
    protected textBox: JQuery;
    protected cursor: JQuery;
    protected readonly cursorIndex: number;
    protected readonly dragElem: JQuery;
    constructor(elem: HTMLElement, options?: FormulizeOptions);
    protected attachEvents(): void;
    protected removeCursor(): void;
    protected removeUnit(): void;
}
