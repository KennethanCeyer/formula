import { specialCharacters } from '../values';
import { Key } from '../key.enum';
import { UIManager } from './ui.manager';
import { FormulizeKeyHelper } from '../key.helper';

export abstract class UIHook extends UIManager {
    protected hookKeyDown(event: JQuery.Event<KeyboardEvent>): void {
        event.preventDefault();

        if (!this.cursor || !this.cursor.length)
            return;

        const keyCode = event.which >= Key.Numpad0 && event.which <= Key.Numpad9
            ? event.which - Key.Zero
            : event.which;

        this.analyzeKey(keyCode, event.ctrlKey, event.shiftKey);

        const key = FormulizeKeyHelper.getValue(keyCode, event.shiftKey);
        const realKey = event.shiftKey && /[0-9]/.test(key) && specialCharacters[Number(key)]
            ? specialCharacters[Number(key)]
            : key;
        this.insertKey(realKey);
        this.validate();
    }
}
