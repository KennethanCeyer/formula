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
        if (keyCode === 106)
            return 'x';

        if (((keyCode === 187 || keyCode === 61) && pressedShift === true) || keyCode === 107)
            return '+';

        if (keyCode === 189 || keyCode === 173 || keyCode === 109)
            return '-';

        if (keyCode === 190 || keyCode === 110)
            return '.';

        if (keyCode === 191 || keyCode === 111)
            return '/';

        return String.fromCharCode(keyCode);
    }
}
