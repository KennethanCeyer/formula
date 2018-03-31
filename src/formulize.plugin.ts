import { defaultOptions } from './option.value';
import { FormulizeFunction, FormulizeOptions } from './formulize.interface';
import { UI } from './ui/ui';
import { FormulizePlugin } from './formulize.jquery';
import { MethodBase, methodBinder } from './formulize.plugin.method';

export function pluginBinder() {
    const reflectedMethod = new MethodBase(null);
    const reflectedMethodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(reflectedMethod));

    $.fn.formulize = <FormulizePlugin>Object.assign<FormulizeFunction, FormulizeOptions>(
        function (this: JQuery, options: FormulizeOptions): JQuery {
            this
                .toArray()
                .forEach(elem => {
                    $(elem).data('$formulize', new UI(elem, options));
                });
            return this;
        },
        <FormulizeOptions>{ ...defaultOptions }
    );

    reflectedMethodNames
        .filter(name => name !== 'constructor')
        .map(name => ({
            name,
            func: function (...args: any[]) {
                methodBinder.call(this, name, ...args);
            }
        }))
        .forEach(binder => {
            (<any>$.fn)[binder.name] = binder.func;
        });
}
