import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { UIElementHelper } from './ui.element.helper';
import { FormulizeGlobal } from '../formulize.interface';

declare const global: FormulizeGlobal;

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

        it('should return an HTMLElement contained an child what contained empty child with +', () => {
            const elem = UIElementHelper.getUnitElement(id, '+');
            expect(elem.classList.contains(`${id}-item`)).to.be.true;
            expect(elem.classList.contains(`${id}-unit`)).to.be.true;
            expect(elem.children.length).to.equal(1);
            expect(elem.children[0].classList.contains(`${id}-prefix`)).to.be.true;
            expect(elem.children[0].classList.contains(`${id}-decimal-highlight`)).to.be.true;
            expect(elem.children[0].textContent).to.be.empty;
        });

        it('should return an HTMLElement contained a prefix child child with 1', () => {
            const elem = UIElementHelper.getUnitElement(id, '1');
            expect(elem.classList.contains(`${id}-item`)).to.be.true;
            expect(elem.classList.contains(`${id}-unit`)).to.be.true;
            expect(elem.children.length).to.equal(1);
            expect(elem.children[0].classList.contains(`${id}-prefix`)).to.be.true;
            expect(elem.children[0].classList.contains(`${id}-decimal-highlight`)).to.be.true;
            expect(elem.children[0].textContent).to.equal('1');
        });

        it('should return an HTMLElement contained a prefix child child with 1000', () => {
            const elem = UIElementHelper.getUnitElement(id, '1000');
            expect(elem.classList.contains(`${id}-item`)).to.be.true;
            expect(elem.classList.contains(`${id}-unit`)).to.be.true;
            expect(elem.children.length).to.equal(1);
            expect(elem.children[0].classList.contains(`${id}-prefix`)).to.be.true;
            expect(elem.children[0].classList.contains(`${id}-decimal-highlight`)).to.be.true;
            expect(elem.children[0].textContent).to.equal('1,000');
        });

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

    describe('test method: UIElementHelper.getUnitDecimalElement()', () => {
        it('should return a valid HTMLElement with empty value', () => {
            const elem = UIElementHelper.getUnitDecimalElement(id, 'prefix', undefined);
            expect(elem.classList.contains(`${id}-prefix`)).to.be.true;
            expect(elem.classList.contains(`${id}-decimal-highlight`)).to.be.true;
            expect(elem.textContent).to.empty;
        });

        it('should return a valid HTMLElement with prefix side and value 1', () => {
            const elem = UIElementHelper.getUnitDecimalElement(id, 'prefix', '1');
            expect(elem.classList.contains(`${id}-prefix`)).to.be.true;
            expect(elem.classList.contains(`${id}-decimal-highlight`)).to.be.true;
            expect(elem.textContent).to.equal('1');
        });

        it('should return a valid HTMLElement with suffix side and value 1', () => {
            const elem = UIElementHelper.getUnitDecimalElement(id, 'suffix', '1');
            expect(elem.classList.contains(`${id}-suffix`)).to.be.true;
            expect(elem.classList.contains(`${id}-decimal-highlight`)).to.be.true;
            expect(elem.textContent).to.equal('1');
        });
    });

    describe('test method: UIElementHelper.getOperatorElement()', () => {
        it('should return a valid HTMLElement with undefined', () => {
            const elem = UIElementHelper.getOperatorElement(id, undefined);
            expect(elem.classList.contains(`${id}-item`)).to.be.true;
            expect(elem.classList.contains(`${id}-operator`)).to.be.true;
            expect(elem.textContent).to.empty;
        });

        it('should return a valid HTMLElement with +', () => {
            const elem = UIElementHelper.getOperatorElement(id, '+');
            expect(elem.classList.contains(`${id}-item`)).to.be.true;
            expect(elem.classList.contains(`${id}-operator`)).to.be.true;
            expect(elem.textContent).to.equal('+');
        });
    });

    describe('test method: UIElementHelper.getTextBoxElement()', () => {
        it('should return a valid HTMLElement', () => {
            const elem = UIElementHelper.getTextBoxElement(id);
            expect(elem.id).to.equal(`${id}-text`);
            expect(elem.getAttribute('name')).to.equal(`${id}-text`);
            expect(elem.classList.contains(`${id}-text`)).to.be.true;
            expect(elem.children.length).to.equal(0);
        });
    });

    describe('test method: UIElementHelper.setUnitValue()', () => {
        let elem: HTMLElement;

        beforeEach(() =>{
            elem = document.createElement('div');
        });

        it('should expected to do not anything', () => {
            UIElementHelper.setUnitValue(id, elem, undefined);
            expect(elem.children.length).to.equal(0);
        });

        it('should expected to add HTMLElement contained an child what contained empty child with a', () => {
            UIElementHelper.setUnitValue(id, elem, 'a');
            expect(elem.children.length).to.equal(1);
            expect(elem.children[0].classList.contains(`${id}-prefix`)).to.be.true;
            expect(elem.children[0].classList.contains(`${id}-decimal-highlight`)).to.be.true;
            expect(elem.children[0].textContent).to.be.empty;
        });

        it('should expected to add HTMLElement contained a prefix child child with 100', () => {
            UIElementHelper.setUnitValue(id, elem, '100');
            expect(elem.children.length).to.equal(1);
            expect(elem.children[0].classList.contains(`${id}-prefix`)).to.be.true;
            expect(elem.children[0].classList.contains(`${id}-decimal-highlight`)).to.be.true;
            expect(elem.children[0].textContent).to.equal('100');
        });

        it('should expected to add HTMLElement contained a prefix child child with 6000000', () => {
            UIElementHelper.setUnitValue(id, elem, '6000000');
            expect(elem.children.length).to.equal(1);
            expect(elem.children[0].classList.contains(`${id}-prefix`)).to.be.true;
            expect(elem.children[0].classList.contains(`${id}-decimal-highlight`)).to.be.true;
            expect(elem.children[0].textContent).to.equal('6,000,000');
        });

        it('should expected to add HTMLElement contained a prefix child child with 100000.02140', () => {
            UIElementHelper.setUnitValue(id, elem, '100000.02140');
            expect(elem.children.length).to.equal(2);
            expect(elem.children[0].classList.contains(`${id}-prefix`)).to.be.true;
            expect(elem.children[0].classList.contains(`${id}-decimal-highlight`)).to.be.true;
            expect(elem.children[0].textContent).to.equal('100,000');
            expect(elem.children[1].classList.contains(`${id}-suffix`)).to.be.true;
            expect(elem.children[1].classList.contains(`${id}-decimal-highlight`)).to.be.true;
            expect(elem.children[1].textContent).to.equal('.02140');
        });
    });

    describe('test method: UIElementHelper.isElementType()', () => {
        let elem: HTMLElement;

        beforeEach(() =>{
            elem = document.createElement('div');
        });

        it('should return false with elem undefined', () => {
            expect(UIElementHelper.isElementType(id, 'some-type', undefined))
                .to.be.false;
        });

        it('should return true with matched type apple', () => {
            elem.classList.add(`${id}-apple`);
            expect(UIElementHelper.isElementType(id, 'apple', elem))
                .to.be.true;
        });

        it('should return false with unmatched type apple', () => {
            elem.classList.add(`${id}-banana`);
            expect(UIElementHelper.isElementType(id, 'apple', elem))
                .to.be.false;
        });
    });

    describe('test method: UIElementHelper.isDrag()', () => {
        let elem: HTMLElement;

        beforeEach(() =>{
            elem = document.createElement('div');
        });

        it('should return true with an HTMLElement that has matched class', () => {
            elem.classList.add(`${id}-drag`);
            expect(UIElementHelper.isDrag(id, elem)).to.be.true;
        });

        it('should return false with an HTMLElement that has unmatched class', () => {
            elem.classList.add(`${id}-apple`);
            expect(UIElementHelper.isDrag(id, elem)).to.be.false;
        });
    });

    describe('test method: UIElementHelper.isCursor()', () => {
        let elem: HTMLElement;

        beforeEach(() =>{
            elem = document.createElement('div');
        });

        it('should return true with an HTMLElement that has matched class', () => {
            elem.classList.add(`${id}-cursor`);
            expect(UIElementHelper.isCursor(id, elem)).to.be.true;
        });

        it('should return false with an HTMLElement that has unmatched class', () => {
            elem.classList.add(`${id}-apple`);
            expect(UIElementHelper.isCursor(id, elem)).to.be.false;
        });
    });

    describe('test method: UIElementHelper.isUnit()', () => {
        let elem: HTMLElement;

        beforeEach(() =>{
            elem = document.createElement('div');
        });

        it('should return true with an HTMLElement that has matched class', () => {
            elem.classList.add(`${id}-unit`);
            expect(UIElementHelper.isUnit(id, elem)).to.be.true;
        });

        it('should return false with an HTMLElement that has unmatched class', () => {
            elem.classList.add(`${id}-apple`);
            expect(UIElementHelper.isUnit(id, elem)).to.be.false;
        });
    });

    describe('test method: UIElementHelper.isOperator()', () => {
        let elem: HTMLElement;

        beforeEach(() =>{
            elem = document.createElement('div');
        });

        it('should return true with an HTMLElement that has matched class', () => {
            elem.classList.add(`${id}-operator`);
            expect(UIElementHelper.isOperator(id, elem)).to.be.true;
        });

        it('should return false with an HTMLElement that has unmatched class', () => {
            elem.classList.add(`${id}-apple`);
            expect(UIElementHelper.isOperator(id, elem)).to.be.false;
        });
    });
});
