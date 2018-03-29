import { FormulizeKeyHelper } from './formulize.key.helper';
import { FormulizeBase } from './formulize.base';

export namespace Formulize {
    export class Formulize extends FormulizeBase {
        protected analyzeKey<T>(keyCode: number, pressedCtrl: boolean, pressedShift: boolean): T {
            const behaviors = [
                { predicate: FormulizeKeyHelper.isReload, doBehavior: FormulizeKeyHelper.doReload },
                { predicate: FormulizeKeyHelper.isSelectAll, doBehavior: FormulizeKeyHelper.doAction(this.selectAll) },
                { predicate: FormulizeKeyHelper.isBackspace, doBehavior: FormulizeKeyHelper.doAction(this.removeBefore) },
                { predicate: FormulizeKeyHelper.isDelete, doBehavior: FormulizeKeyHelper.doAction(this.removeAfter) },
                { predicate: FormulizeKeyHelper.isLeft, doBehavior: FormulizeKeyHelper.doAction(() => this.moveLeftCursor(pressedShift)) },
                { predicate: FormulizeKeyHelper.isUp, doBehavior: FormulizeKeyHelper.doAction(this.moveUpCursor) },
                { predicate: FormulizeKeyHelper.isRight, doBehavior: FormulizeKeyHelper.doAction(() => this.moveRightCursor(pressedShift)) },
                { predicate: FormulizeKeyHelper.isDown, doBehavior: FormulizeKeyHelper.doAction(this.moveDownCursor) },
                { predicate: FormulizeKeyHelper.isHome, doBehavior: FormulizeKeyHelper.doAction(() => this.moveFirstCursor(pressedShift)) },
                { predicate: FormulizeKeyHelper.isEnd, doBehavior: FormulizeKeyHelper.doAction(() => this.moveLastCursor(pressedShift)) },
            ];
            const behavior = behaviors.find(behavior => behavior.predicate(keyCode, pressedCtrl, pressedShift));
            if (behavior)
                return behavior.doBehavior();
        }

        protected attachEvents(): void {
            this.textBox
                .off('blur').on('blur', this.blur);

            this.textBox
                .off(`dblclick.${this._option.id}Handler`)
                .on(`dblclick.${this._option.id}Handler`, this.selectAll);

            this.textBox
                .off(`mousedown.${this._option.id}Handler`)
                .on(`mousedown.${this._option.id}Handler`,
                    event => this.startDrag({ x: event.offsetX, y: event.offsetY }));

            this.textBox
                .off(`mouseup.${this._option.id}Handler`)
                .on(`mouseup.${this._option.id}Handler`,
                    event => this.endDrag({ x: event.offsetX, y: event.offsetY }));

            this.textBox
                .off(`mousemove.${this._option.id}Handler`)
                .on(`mousemove.${this._option.id}Handler`,
                    event => this.moveDrag({ x: event.offsetX, y: event.offsetY }));

            this.textBox
                .off(`keydown.${this._option.id}Handler`)
                .on(`keydown.${this._option.id}Handler`,
                    event => this.hookKeyDown);
        }
    }
}
