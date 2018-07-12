import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import postcssNested from 'postcss-nested'
import postcssCssnext from 'postcss-nested'

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named'
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named'
    }
  ],
  plugins: [
    external(),
    postcss({
      modules: true,
      plugins: [
        postcssNested(),
        postcssCssnext()
      ]
    }),
    url(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    resolve(),
    commonjs()
  ]
}
