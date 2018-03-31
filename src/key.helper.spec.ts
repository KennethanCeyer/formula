import { FormulizeKeyHelper } from './key.helper';
import { expect } from 'chai';

describe('test class: FormulizeKeyHelper', () => {
    describe('test method: isReload', () => {
        it('should return true with 116(F5)', () => {
           expect(FormulizeKeyHelper.isReload(116, false)).to.be.true;
        });

        it('should return true with 82(R) and pressedShift', () => {
            expect(FormulizeKeyHelper.isReload(82, true)).to.be.true;
        });

        it('should return true with 82(R) and unPressedShift', () => {
            expect(FormulizeKeyHelper.isReload(82, false)).to.be.false;
        });
    });
});
