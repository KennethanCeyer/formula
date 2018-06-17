export interface Position {
    x: number;
    y: number;
}
export interface ElementPosition extends Position {
    elem: HTMLElement;
    diff?: {
        x: number;
        y: number;
    };
}
export interface Behavior {
    predicate: (...args: any[]) => boolean;
    doBehavior: () => any;
}
export declare type FormulizeData = string | number | HTMLElement | JQuery | any;
