import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import postcssPresetEnv from 'postcss-preset-env'

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
        postcssPresetEnv({stage: 3})
      ]
    }),
    url(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    resolve({
      extensions: ['.js', '.jsx']
    }),
    commonjs()
  ]
}
