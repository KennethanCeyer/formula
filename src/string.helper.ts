export class StringHelper {
    public static isNumeric(value: string): boolean {
        return /^-?[\d,]+\.?\d*$/.test(value);
    }

    public static toNumber(value: string): string {
        return value.replace(/[^\d-\.]/g, '');
    }
}
