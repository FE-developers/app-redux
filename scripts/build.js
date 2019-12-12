import config from './base';
import { uglify } from "rollup-plugin-uglify";

config.plugins.push(
  uglify()
);

export default config;
