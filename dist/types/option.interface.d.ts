export interface OptionText {
    formula?: string;
    error?: string;
    pass?: string;
}
export declare type OptionImporter = <T>(data: any) => T;
export declare type OptionExporter = (elem: HTMLElement) => any;
