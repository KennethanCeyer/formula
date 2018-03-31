import { FormulizeKeyHelper } from '../key.helper';
import { UIBase } from './ui.base';
import { Behavior } from './ui.interface';

export class UI extends UIBase {
    protected analyzeKey<T>(keyCode: number, pressedCtrl: boolean, pressedShift: boolean): boolean {
        const behaviors: Behavior[] = [
            { predicate: FormulizeKeyHelper.isReload, doBehavior: FormulizeKeyHelper.doReload },
            {
                predicate: FormulizeKeyHelper.isSelectAll,
                doBehavior: FormulizeKeyHelper.doAction(() => this.selectAll())
            },
            {
                predicate: FormulizeKeyHelper.isBackspace,
                doBehavior: FormulizeKeyHelper.doAction(() => this.removeBefore())
            },
            {
                predicate: FormulizeKeyHelper.isDelete,
                doBehavior: FormulizeKeyHelper.doAction(() => this.removeAfter())
            },
            {
                predicate: FormulizeKeyHelper.isLeft,
                doBehavior: FormulizeKeyHelper.doAction(() => this.moveLeftCursor(pressedShift))
            },
            {
                predicate: FormulizeKeyHelper.isUp,
                doBehavior: FormulizeKeyHelper.doAction(() => this.moveUpCursor())
            },
            {
                predicate: FormulizeKeyHelper.isRight,
                doBehavior: FormulizeKeyHelper.doAction(() => this.moveRightCursor(pressedShift))
            },
            {
                predicate: FormulizeKeyHelper.isDown,
                doBehavior: FormulizeKeyHelper.doAction(() => this.moveDownCursor())
            },
            {
                predicate: FormulizeKeyHelper.isHome,
                doBehavior: FormulizeKeyHelper.doAction(() => this.moveFirstCursor(pressedShift))
            },
            {
                predicate: FormulizeKeyHelper.isEnd,
                doBehavior: FormulizeKeyHelper.doAction(() => this.moveLastCursor(pressedShift))
            }
        ];
        const behavior = behaviors.find(behavior => behavior.predicate(keyCode, pressedCtrl, pressedShift));

        if (!behavior)
            return false;

        behavior.doBehavior();
        return true;
    }

    protected attachEvents(): void {
        this.textBox
            .off('blur')
            .on('blur', () => this.blur());

        this.textBox
            .off(`dblclick.${this.options.id}Handler`)
            .on(`dblclick.${this.options.id}Handler`, this.selectAll);

        this.textBox
            .off(`mousedown.${this.options.id}Handler`)
            .on(`mousedown.${this.options.id}Handler`,
                event => this.startDrag({ x: event.offsetX, y: event.offsetY }));

        this.textBox
            .off(`mouseup.${this.options.id}Handler`)
            .on(`mouseup.${this.options.id}Handler`,
                event => this.endDrag({ x: event.offsetX, y: event.offsetY }));

        this.textBox
            .off(`mousemove.${this.options.id}Handler`)
            .on(`mousemove.${this.options.id}Handler`,
                event => this.moveDrag({ x: event.offsetX, y: event.offsetY }));

        this.textBox
            .off(`keydown.${this.options.id}Handler`)
            .on(`keydown.${this.options.id}Handler`,
                (event: any) => {
                    this.hookKeyDown(event);
                });
    }
}
