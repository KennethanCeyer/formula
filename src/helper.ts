import { Key } from './key.enum';

export class Helper {
    public static toDecimal(value: string): string {
        const splitValue = value.split('.');
        const prefix = splitValue[0]
            .replace(/[^\d.]*/gi, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const suffix = (splitValue[1] || '').replace(/[^\d.]*/gi, '');

        return  [prefix, suffix].join('.');
    }

    public static keyCodeToString(value: string, pressedShift: boolean) {
        const keyCode = Number(value);
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

        return String.fromCharCode(keyCode);
    }
}
