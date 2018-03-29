import { FormulizeKeyHelper } from '../key.helper';
import { UIBase } from './ui.base';
import { Behavior } from './ui.interface';

export class UI extends UIBase {
    protected analyzeKey<T>(keyCode: number, pressedCtrl: boolean, pressedShift: boolean): T {
        const behaviors: Behavior[] = [
            { predicate: FormulizeKeyHelper.isReload, doBehavior: FormulizeKeyHelper.doReload },
            { predicate: FormulizeKeyHelper.isSelectAll, doBehavior: FormulizeKeyHelper.doAction(() => this.selectAll()) },
            { predicate: FormulizeKeyHelper.isBackspace, doBehavior: FormulizeKeyHelper.doAction(() => this.removeBefore()) },
            { predicate: FormulizeKeyHelper.isDelete, doBehavior: FormulizeKeyHelper.doAction(() => this.removeAfter()) },
            { predicate: FormulizeKeyHelper.isLeft, doBehavior: FormulizeKeyHelper.doAction(() => this.moveLeftCursor(pressedShift)) },
            { predicate: FormulizeKeyHelper.isUp, doBehavior: FormulizeKeyHelper.doAction(() => this.moveUpCursor()) },
            { predicate: FormulizeKeyHelper.isRight, doBehavior: FormulizeKeyHelper.doAction(() => this.moveRightCursor(pressedShift)) },
            { predicate: FormulizeKeyHelper.isDown, doBehavior: FormulizeKeyHelper.doAction(() => this.moveDownCursor()) },
            { predicate: FormulizeKeyHelper.isHome, doBehavior: FormulizeKeyHelper.doAction(() => this.moveFirstCursor(pressedShift)) },
            { predicate: FormulizeKeyHelper.isEnd, doBehavior: FormulizeKeyHelper.doAction(() => this.moveLastCursor(pressedShift)) }
        ];
        const behavior = behaviors.find(behavior => behavior.predicate(keyCode, pressedCtrl, pressedShift));
        if (behavior)
            return behavior.doBehavior();
    }

    protected attachEvents(): void {
        this.textBox
            .off('blur')
            .on('blur', () => this.blur());

        this.textBox
            .off(`dblclick.${this._options.id}Handler`)
            .on(`dblclick.${this._options.id}Handler`, this.selectAll);

        this.textBox
            .off(`mousedown.${this._options.id}Handler`)
            .on(`mousedown.${this._options.id}Handler`,
                event => this.startDrag({ x: event.offsetX, y: event.offsetY }));

        this.textBox
            .off(`mouseup.${this._options.id}Handler`)
            .on(`mouseup.${this._options.id}Handler`,
                event => this.endDrag({ x: event.offsetX, y: event.offsetY }));

        this.textBox
            .off(`mousemove.${this._options.id}Handler`)
            .on(`mousemove.${this._options.id}Handler`,
                event => this.moveDrag({ x: event.offsetX, y: event.offsetY }));

        this.textBox
            .off(`keydown.${this._options.id}Handler`)
            .on(`keydown.${this._options.id}Handler`,
                (event: any) => {
                    this.hookKeyDown(event);
                });
    }
}
