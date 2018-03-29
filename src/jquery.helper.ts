import { Option } from './formulize/option.interface';

namespace Formulize {
    export class JQueryHelper {
        public static doBind() {
            $.fn.formulize = function (option: Option) {
                return this.each((_, element) => new Formulize(element, option));
            }
        }
    }
}
