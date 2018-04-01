import { OptionText, PipeParse, PipeInsert } from './option.interface';

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
