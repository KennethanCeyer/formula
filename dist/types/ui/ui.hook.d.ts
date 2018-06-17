/// <reference types="jquery" />
import { UIManager } from './ui.manager';
export declare abstract class UIHook extends UIManager {
    protected hookKeyDown(event: JQuery.Event<KeyboardEvent>): void;
}
