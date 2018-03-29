export interface Option {
    id: string;
    cursor?: OptionCursor,
    text?: OptionText,
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

export type OptionImporter<T> = (data: any) => T;

export type OptionExporter = (elem: Element) => any;

export interface CursorTime {
    animate?: number;
    delay?: number;
}
