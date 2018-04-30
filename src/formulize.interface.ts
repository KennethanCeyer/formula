import { OptionText, PipeParse, PipeInsert } from './option.interface';

export * from 'metric-parser/dist/types/ast.d';
export * from 'metric-parser/dist/types/tree/simple.tree/type.d';

export interface FormulizeGlobal extends NodeJS.Global {
    window: Window;
    document: Document;
    $: JQueryStatic;
    jQuery: JQueryStatic;
}

export interface FormulizeOptions {
    id?: string;
    text?: OptionText,
    pipe?: OptionPipe
}

export interface OptionPipe {
    insert?: PipeInsert;
    parse?: PipeParse;
}

export interface FormulizeFunction {
    (options?: FormulizeOptions): JQuery;
}
