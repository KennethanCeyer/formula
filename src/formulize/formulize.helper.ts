export class FormulizeHelper {
    public static getDataValue(elem: Element): string {
        const jQueryElement = $(elem);
        const value = jQueryElement.data('value');
        return value !== undefined
            ? value
            : elem.text();
    }
}
