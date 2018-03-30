import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import camelCase from 'lodash.camelcase';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import scss from 'rollup-plugin-scss';

const pkg = require('./package.json');
const libraryName = 'formulize';

export default {
    input: `src/${libraryName}.ts`,
    output: [
        { file: pkg.main, name: camelCase(libraryName), format: 'umd', sourcemap: true }
    ],
    external: [],
    watch: {
        include: 'src/**',
    },
    plugins: [
        scss({ output: `dist/${libraryName}.css` }),
        json(),
        typescript({
            tsconfigOverride: {
                compilerOptions: {
                    module: 'es2015'
                }
            },
            useTsconfigDeclarationDir: true
        }),
        commonjs(),
        resolve(),
        sourceMaps(),
    ]
};
