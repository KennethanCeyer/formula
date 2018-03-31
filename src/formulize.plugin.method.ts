import { FormulizePluginMethods } from './formulize.jquery';
import { UI } from './ui/ui';
import { Position } from './ui/ui.interface';
import { Tree } from 'metric-parser/dist/types/tree/simple.tree/type';

export function methodBinder(this: JQuery, name: string, ...args: any[]): JQuery {
    this
        .toArray()
        .forEach(elem => {
            const instance = $(elem).data('$formulize');
            if (!instance)
                return;

            const base = new MethodBase(<UI>instance);
            Object.getPrototypeOf(base)[name].call(base, ...args);
        });
    return this;
}

export class MethodBase implements FormulizePluginMethods {
    protected formulize: UI;

    constructor(formulize: UI) {
        this.formulize = formulize;
    }

    pick(): void {
        this.formulize.pick();
    }

    clear(): void {
        this.formulize.clear();
    }

    blur(): void {
        this.formulize.blur();
    }

    setData(data: Tree): void {
        this.formulize.setData(data);
    }

    getData<T extends Tree>(extractor?: (data: T) => void): T {
        return this.formulize.getData<T>(extractor);
    }

    selectRange(start: number, end: number): void {
        this.formulize.selectRange(start, end);
    }

    selectAll(): void {
        this.formulize.selectAll();
    }

    removeDrag(): void {
        this.formulize.removeDrag();
    }

    insert(obj: string | number | HTMLElement | JQuery, position?: Position): void {
        this.formulize.insert(obj, position);
    }

    insertValue(value: string): void {
        this.formulize.insertValue(value);
    }

    insertData(data: string | string[] | any[]): void {
        this.formulize.insertData(data);
    }

    validate(extractor?: (valid: boolean) => void): boolean {
        return this.formulize.validate(extractor);
    }
}
