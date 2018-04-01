import { FormulizeData } from './ui/ui.interface';

export interface OptionText {
    formula?: string;
    error?: string;
    pass?: string;
}

export type OptionImporter = (elem: HTMLElement) => HTMLElement;

export type OptionExporter = (elem: HTMLElement) => any;
