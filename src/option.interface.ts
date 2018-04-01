import { FormulizeData } from './ui/ui.interface';

export interface OptionText {
    formula?: string;
    error?: string;
    pass?: string;
}

export type PipeInsert = (data: FormulizeData) => any;

export type PipeParse = (elem: HTMLElement) => any;
