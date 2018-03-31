import { getVersion } from './global';
import { expect } from 'chai';

describe('test method: getVersion()', () => {
    it('should return dot-separated string with ', () => {
        it('should return type as string', () => {
            expect(getVersion()).to.a('string');
        });

        it('should return type a dot-separated character', () => {
            expect(getVersion().split('.'))
                .to.have.length(3)
                .and.that.satisfies((array: string[]) => array.every(value => !isNaN(Number(value))));
        });
    });
});
