import { FormulizePlugin } from './formulize.interface';

declare global {
    interface JQuery {
        formulize: FormulizePlugin;
    }
}
