import { FormulizeOptions } from '../formulize.interface';
export declare abstract class UIDom {
    protected container: JQuery;
    protected statusBox: JQuery;
    protected textBox: JQuery;
    protected cursor: JQuery;
    protected elem: HTMLElement;
    protected options: FormulizeOptions;
    protected readonly cursorIndex: number;
    protected readonly dragElem: JQuery;
    protected initializeDOM(): void;
    protected bindingDOM(): void;
    protected isAlreadyInitialized(): boolean;
    protected attachEvents(): void;
    protected getPrevUnit(elem: HTMLElement): HTMLElement;
    protected getNextUnit(elem: HTMLElement): HTMLElement;
    protected mergeUnit(baseElem: HTMLElement): void;
    protected setUnitValue(elem: HTMLElement, value: string): void;
    protected removeCursor(): void;
    protected removeUnit(): void;
}
