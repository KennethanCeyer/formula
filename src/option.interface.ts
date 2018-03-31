export interface OptionText {
    formula?: string;
    error?: string;
    pass?: string;
}

export type OptionImporter = <T>(data: any) => T;

export type OptionExporter = (elem: HTMLElement) => any;
