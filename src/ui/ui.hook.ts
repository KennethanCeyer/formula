import { specialCharacters } from '../values';
import { Key } from '../key.enum';
import { UIManager } from './ui.manager';
import { FormulizeKeyHelper } from '../key.helper';
import { FormulizeTokenHelper } from '../token.helper';

export abstract class UIHook extends UIManager {
    protected hookKeyDown(event: JQuery.Event<KeyboardEvent>): void {
        event.preventDefault();

        if (!this.cursor || !this.cursor.length)
            return;

        this.analyzeKey(event.which, event.ctrlKey, event.shiftKey);

        const key = FormulizeKeyHelper.getValue(event.which, event.shiftKey);
        if (key === undefined)
            return;

        this.insertKey(key);
        this.validate();
    }
}
