import '../style/formulize.scss';
import { FormulizeFunction, FormulizeOptions } from './formulize.interface';
import { defaultOptions } from './option.value';
import { UI } from './ui/ui';

export * from './ui/ui';

const _MODULE_VERSION_ = '0.0.1';

export function getVersion(): string {
    return _MODULE_VERSION_;
}

$.fn.formulize = Object.assign<FormulizeFunction, FormulizeOptions>(
    function (this: JQuery, options: FormulizeOptions): JQuery {
        this
            .toArray()
            .forEach(elem =>  {
                new UI(elem, options)
            });
        return this;
    },
    <FormulizeOptions>{ ...defaultOptions }
);
