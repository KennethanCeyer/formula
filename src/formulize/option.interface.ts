export interface Option {
    id: string;
    cursor?: OptionCursor,
    text?: OptionText,
    import?: OptionExtractor;
    export?: OptionExport
}

export interface OptionCursor {
    time: CursorTime;
}

export interface OptionText {
    formula?: string;
    error?: string;
    pass?: string;
}

export interface OptionExport {
    filter: OptionFilter,
    node: OptionExtractor
}

export type OptionFilter = (data: any) => any;

export type OptionExtractor = (elem: Element) => any;

export interface CursorTime {
    animate?: number;
    delay?: number;
}
