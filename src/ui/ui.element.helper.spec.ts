import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { UIElementHelper } from './ui.element.helper';

describe('test class: UIElementHelper', () => {
    const id = 'formulize';

    beforeEach(() => {
        const jsdom = new JSDOM(`<body></body>`);
        global.window = jsdom.window;
        global.document = window.document;
        global.$ = require('jquery');
        global.jQuery = $;
    });

    describe('test method: UIElementHelper.getDragElement()', () => {
        it('should return a valid HTMLElement', () => {
            const elem = UIElementHelper.getDragElement(id);
            expect(elem.classList.contains(`${id}-drag`)).to.be.true;
        });
    });

    describe('test method: UIElementHelper.getCursorElement()', () => {
        it('should return a valid HTMLElement', () => {
            const elem = UIElementHelper.getCursorElement(id);
            expect(elem.classList.contains(`${id}-cursor`)).to.be.true;
        });
    });

    describe('test method: UIElementHelper.getUnitElement()', () => {
        it('should return an HTMLElement contained an empty child with empty value', () => {
            const elem = UIElementHelper.getUnitElement(id, undefined);
            expect(elem.classList.contains(`${id}-item`)).to.be.true;
            expect(elem.classList.contains(`${id}-unit`)).to.be.true;
            expect(elem.children.length).to.equal(0);
        });
    });

    describe('test method: UIElementHelper.getUnitElement()', () => {
        it('should return an HTMLElement contained a prefix child child with 1', () => {
            const elem = UIElementHelper.getUnitElement(id, '1');
            expect(elem.classList.contains(`${id}-item`)).to.be.true;
            expect(elem.classList.contains(`${id}-unit`)).to.be.true;
            expect(elem.children.length).to.equal(1);
            expect(elem.children[0].classList.contains(`${id}-prefix`)).to.be.true;
            expect(elem.children[0].classList.contains(`${id}-decimal-highlight`)).to.be.true;
            expect(elem.children[0].textContent).to.equal('1');
        });
    });

    describe('test method: UIElementHelper.getUnitElement()', () => {
        it('should return an HTMLElement contained a prefix child child with 1000', () => {
            const elem = UIElementHelper.getUnitElement(id, '1000');
            expect(elem.classList.contains(`${id}-item`)).to.be.true;
            expect(elem.classList.contains(`${id}-unit`)).to.be.true;
            expect(elem.children.length).to.equal(1);
            expect(elem.children[0].classList.contains(`${id}-prefix`)).to.be.true;
            expect(elem.children[0].classList.contains(`${id}-decimal-highlight`)).to.be.true;
            expect(elem.children[0].textContent).to.equal('1,000');
        });
    });

    describe('test method: UIElementHelper.getUnitElement()', () => {
        it('should return an HTMLElement contained a prefix child child with 1000.1', () => {
            const elem = UIElementHelper.getUnitElement(id, '1000.1');
            expect(elem.classList.contains(`${id}-item`)).to.be.true;
            expect(elem.classList.contains(`${id}-unit`)).to.be.true;
            expect(elem.children.length).to.equal(2);
            expect(elem.children[0].classList.contains(`${id}-prefix`)).to.be.true;
            expect(elem.children[0].classList.contains(`${id}-decimal-highlight`)).to.be.true;
            expect(elem.children[0].textContent).to.equal('1,000');
            expect(elem.children[1].classList.contains(`${id}-suffix`)).to.be.true;
            expect(elem.children[1].classList.contains(`${id}-decimal-highlight`)).to.be.true;
            expect(elem.children[1].textContent).to.equal('.1');
        });
    });
});
