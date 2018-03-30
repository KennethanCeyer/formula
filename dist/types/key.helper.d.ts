export declare class FormulizeKeyHelper {
    static isReload(keyCode: number, pressedCtrl: boolean): boolean;
    static isSelectAll(keyCode: number, pressedCtrl: boolean): boolean;
    static isBackspace(keyCode: number): boolean;
    static isDelete(keyCode: number): boolean;
    static isLeft(keyCode: number): boolean;
    static isUp(keyCode: number): boolean;
    static isRight(keyCode: number): boolean;
    static isDown(keyCode: number): boolean;
    static isHome(keyCode: number): boolean;
    static isEnd(keyCode: number): boolean;
    static doReload(): void;
    static doAction<T>(action: () => T): () => T;
    static getValue(keyCode: number, pressedShift?: boolean): string;
}
