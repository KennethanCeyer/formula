export class StringHelper {
    public static isNumeric(value: string): boolean {
        return /^-?[\d,]+\.?\d*$/.test(value) && typeof value !== 'object';
    }

    public static toNumber(value: string): string {
        return value.replace(/[^\d-\.]/g, '');
    }
}
