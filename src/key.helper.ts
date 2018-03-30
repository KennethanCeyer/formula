import { Key } from './key.enum';
import { specialCharacters } from './values';

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

    public static doReload(): void {
        location.reload();
    }

    public static doAction<T>(action: () => T): () => T {
        return action;
    }

    public static getValue(keyCode: number, pressedShift: boolean = false): string {
        if (keyCode === Key.Multiply)
            return 'x';

        if (((keyCode === Key.PlusSign || keyCode === 61) && pressedShift) || keyCode === Key.Add)
            return '+';

        if (keyCode === Key.Dash || keyCode === 173 || keyCode === Key.Subtract)
            return '-';

        if (keyCode === Key.Period || keyCode === Key.DecimalPoint)
            return '.';

        if (keyCode === Key.ForwardSlash || keyCode === Key.Divide)
            return '/';

        const numberKeyCode = keyCode >= Key.Numpad0 && keyCode <= Key.Numpad9
            ? keyCode - (Key.Numpad0 - Key.Zero)
            : keyCode;

        if (numberKeyCode >= Key.Zero && numberKeyCode <= Key.Nine) {
            const numberValue = String.fromCharCode(numberKeyCode);
            return pressedShift
                ? specialCharacters[Number(numberValue)]
                : numberValue;
        }

        return undefined;
    }
}
