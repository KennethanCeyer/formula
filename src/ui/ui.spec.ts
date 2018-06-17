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

    describe('test method: setData() and getData()', () => {
       it('should returns correct data with 1 + 2 + 3', () => {
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

           ui.setData(data);
           expect(ui.getData()).to.be.deep.equal(data);
       });
    });

    describe('test method: blur()', () => {
        it('should cursor must be removed after blur()', () => {
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

            ui.setData(data);
            ui.pick({
                x: $(elem).width(),
                y: $(elem).height()
            });

            const $cursor = $(elem).find(`.${ui.options.id}-cursor`);
            expect($cursor.length).to.be.equal(1);

            ui.blur();
            const $afterBlurCursor = $(elem).find(`.${ui.options.id}-cursor`);
            expect($afterBlurCursor.length).to.be.equal(0);
        });
    });
});
