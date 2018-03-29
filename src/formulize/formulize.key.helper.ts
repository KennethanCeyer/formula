import { Key } from '../key.enum';

export class FormulizeKeyHelper {
    public static isReload(keyCode: number, pressedCtrl: boolean): boolean {
        return keyCode === Key.F5 || pressedCtrl && keyCode === Key.R;
    }

    public static isSelectAll(keyCode: number, pressedCtrl: boolean): boolean {
        return keyCode === Key.A && pressedCtrl;
    }

    public static isBackspace(keyCode: number): boolean {
        return keyCode === Key.Backspace;
    }

    public static isDelete(keyCode: number): boolean {
        return keyCode === Key.Delete;
    }

    public static isLeft(keyCode: number): boolean {
        return keyCode === Key.LeftArrow;
    }

    public static isUp(keyCode: number): boolean {
        return keyCode === Key.UpArrow;
    }

    public static isRight(keyCode: number): boolean {
        return keyCode === Key.RightArrow;
    }

    public static isDown(keyCode: number): boolean {
        return keyCode === Key.DownArrow;
    }

    public static isHome(keyCode: number): boolean {
        return keyCode === Key.Home;
    }

    public static isEnd(keyCode: number): boolean {
        return keyCode === Key.End;
    }

    public static doReload() {
        location.reload();
    }

    public static doAction<T>(action: () => T) {
        return action();
    }
}
