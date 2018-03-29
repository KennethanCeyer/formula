export interface FormulizeOptions {
    id: string;
    cursor?: OptionCursor;
    text?: OptionText;
    import?: OptionImporter;
    export?: OptionExporter;
}
export interface OptionCursor {
    time: CursorTime;
}
export interface OptionText {
    formula?: string;
    error?: string;
    pass?: string;
}
export declare type OptionImporter = <T>(data: any) => T;
export declare type OptionExporter = (elem: HTMLElement) => any;
export interface CursorTime {
    animate?: number;
    delay?: number;
}
