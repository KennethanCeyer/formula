import '../style/formulize.scss';
import { FormulizeOptions } from './formulize/option.interface';
import { FormulizeFunction } from './formulize.interface';
import { defaultOptions } from './formulize/option.value';
import { Formulize } from './formulize/formulize';

export * from './formulize/formulize';

const _MODULE_VERSION_ = '0.0.1';

export function getVersion(): string {
    return _MODULE_VERSION_;
}

$.fn.formulize = Object.assign<FormulizeFunction, FormulizeOptions>(
    function (this: JQuery, options: FormulizeOptions): JQuery {
        this
            .toArray()
            .forEach(elem =>  {
                new Formulize(elem, options)
            });
        return this;
    },
    <FormulizeOptions>{ ...defaultOptions }
);
