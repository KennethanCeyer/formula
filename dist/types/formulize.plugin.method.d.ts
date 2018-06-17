import { FormulizePluginMethods } from './formulize.jquery';
import { UI } from './ui/ui';
import { Position } from './ui/ui.interface';
import { Tree } from 'metric-parser/dist/types/tree/simple.tree/type';
export declare function methodBinder(this: JQuery, name: string, ...args: any[]): JQuery;
export declare class MethodBase implements FormulizePluginMethods {
    protected formulize: UI;
    constructor(formulize: UI);
    pick(): void;
    clear(): void;
    blur(): void;
    setData(data: Tree): void;
    getData<T extends Tree>(extractor?: (data: T) => void): T;
    selectRange(start: number, end: number): void;
    selectAll(): void;
    removeDrag(): void;
    insert(obj: string | number | HTMLElement | JQuery, position?: Position): void;
    insertValue(value: string): void;
    insertData(data: string | string[] | any[]): void;
    validate(extractor?: (valid: boolean) => void): boolean;
}
