import { FormulizeData } from './ui/ui.interface';
export interface OptionText {
    formula?: string;
    error?: string;
    pass?: string;
}
export declare type PipeInsert = (data: FormulizeData) => any;
export declare type PipeParse = (elem: HTMLElement) => any;
