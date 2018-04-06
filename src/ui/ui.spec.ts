import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { UI } from './ui';

describe('test class: UI', () => {
    const id = 'formulize';
    let elem: HTMLElement;

    beforeEach(() => {
        const jsdom = new JSDOM(`<body></body>`);
        global.window = jsdom.window;
        global.document = window.document;
        global.$ = require('jquery');
        global.jQuery = $;

        elem = document.createElement('div');
    });

    describe('test method: new UI()', () => {
        it('should expected to work without exception', () => {
            expect(() => new UI(elem)).to.be.not.throws;
        });
    });
});
