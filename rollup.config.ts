import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default {
  input: [
    './src/NthNumber.ts',
  ],
  output: [
    { 
      dir: './dist',
      format: 'cjs',
      preserveModules: true,
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declarationDir: './dist',
      declaration: true,
    }),
    terser({
      ie8: false,
      module: true,
      compress: {
        passes: 2,
      }
    }),
  ],
}
