import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { UI } from './ui';
import { FormulizeGlobal } from '../formulize.interface';
import { Position } from './ui.interface';
import * as fs from 'fs';
import * as path from 'path';

declare const global: FormulizeGlobal;

describe('test class: UI', () => {
    let elem: HTMLElement;

    beforeEach(() => {
        const style = fs.readFileSync(path.join(__dirname, '../../dist', 'formulize.css')).toString();
        const jsdom = new JSDOM(`<!DOCTYPE HTML><html>
                            <head><style>${style}</style></head>
                            <body></body>
                        </html>`, { url: 'http://localhost' });
        global.window = jsdom.window;
        global.document = jsdom.window.document;
        global.HTMLElement = jsdom.window.HTMLElement;
        global.$ = require('jquery');
        global.jQuery = $;

        elem = document.createElement('div');
        elem.style.width = '300px';
        elem.style.height = '200px';
    });

    describe('test method: new UI()', () => {
        it('should expected to work without exception', () => {
            expect(() => new UI(elem)).to.be.not.throws;
        });
    });

    describe('test method: pick()', () => {
       it('should last item will be picked', () => {
           const ui = new UI(elem);
           const data = {
               operator: '+',
               operand1: {
                   operator: '+',
                   operand1: { value: { type: 'unit', unit: 1 } },
                   operand2:{ value: { type: 'unit', unit: 2 } }
               },
               operand2: { value: { type: 'unit', unit: 3 } }
           };
           const position: Position = {
               x: $(elem).outerWidth(),
               y: $(elem).outerHeight()
           };

           ui.setData(data);
           ui.pick(position);


           const $lastUnit = $(elem).find(`.${ui.options.id}-unit:last`);
           const $cursorPrevUnit = $(elem).find(`.${ui.options.id}-cursor`).prev();

           expect($lastUnit.is($cursorPrevUnit)).to.be.true;
       });
    });
});
