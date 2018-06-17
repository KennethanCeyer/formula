/// <reference types="node" />
/// <reference types="mocha" />
/// <reference types="jquery" />
import { OptionText, PipeParse, PipeInsert } from './option.interface';
import { Tree } from 'metric-parser/dist/types/tree/simple.tree/type';
export * from 'metric-parser/dist/types/ast.d';
export * from 'metric-parser/dist/types/tree/simple.tree/type.d';
export interface FormulizeGlobal extends NodeJS.Global {
    window: Window;
    document: Document;
    HTMLElement: typeof HTMLElement;
    $: JQueryStatic;
    jQuery: JQueryStatic;
}
export interface FormulizeOptions extends FormulizeEventOptions {
    id?: string;
    text?: OptionText;
    pipe?: OptionPipe;
}
export interface FormulizeEventOptions {
    input?<T extends Tree>(value: T): void;
}
export interface OptionPipe {
    insert?: PipeInsert;
    parse?: PipeParse;
}
export interface FormulizeFunction {
    (options?: FormulizeOptions): JQuery;
}
