import { OptionExporter, OptionImporter, OptionText } from './option.interface';
import { Tree } from 'metric-parser/dist/types/tree/simple.tree/type';

export interface FormulizeOptions {
    id: string;
    text?: OptionText,
    import?: OptionImporter;
    export?: OptionExporter;
}

export interface FormulizeFunction {
    (options: FormulizeOptions): JQuery;
}
