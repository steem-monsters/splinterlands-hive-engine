import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

const name = 'engine';

const bundle = (config) => ({
    ...config,
    input: 'src/index.ts',
    external: (id) => !/^[./]/.test(id),
});

export default [
    bundle({
        plugins: [esbuild({ minify: true })],
        output: [
            {
                file: `dist/${name}.js`,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: `dist/${name}.esm.js`,
                format: 'es',
                sourcemap: true,
            },
        ],
    }),
    bundle({
        external: ['buffer'],
        plugins: [esbuild({ minify: true })],
        output: [
            {
                name: 'engine',
                file: `dist/${name}.browser.esm.js`,
                format: 'es',
                sourcemap: true,
            },
            {
                name: 'engine',
                file: `dist/${name}.browser.js`,
                format: 'umd',
                sourcemap: true,
                globals: { axios: 'axios' },
            },
        ],
    }),
    bundle({
        plugins: [dts()],
        output: {
            file: `dist/${name}.d.ts`,
            format: 'es',
        },
    }),
];
