import { supportedCharacters } from './values';

export class FormulizeTokenHelper {
    public static toDecimal(value: string): string {
        const splitValue = value.split('.');
        const prefix = splitValue[0]
            .replace(/[^\d.]*/gi, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const suffix = (splitValue[1] || '').replace(/[^\d.]*/gi, '');

        return  [prefix, suffix].join('.');
    }

    public static isValid(value: string): boolean {
        return FormulizeTokenHelper.isNumeric(value) || FormulizeTokenHelper.supportValue(value);
    }

    public static isNumeric(value: string): boolean {
        return /[0-9\.]/.test(value);
    }

    public static isBracket(value: string): boolean {
        return /^[()]$/.test(value);
    }

    public static supportValue(value: string): boolean {
        return supportedCharacters.includes(value);
    }
}
