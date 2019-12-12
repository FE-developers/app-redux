import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

const config = {
  input: 'src/index.js',
  external: [],
  output: {
    format: 'umd',
    file: './dist/index.js',
    name: 'test.js'
  },
  plugins: [
    babel({
      exclude: '**/node_modules/**'
    }),
    commonjs()
  ]
};

export  default config;
