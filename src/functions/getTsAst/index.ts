import parser from '@babel/parser'
import traverse from '@babel/traverse'
import { LiftoffEnv } from 'liftoff'
import fsUtil from 'ginlibs-file-util'
import cache from 'ginlibs-cache'
import { join } from 'path'

export const getTsAst = () => {
  const liftEnv: LiftoffEnv = globalThis._cliLiftEnv || {}
  const { cwd } = liftEnv
  const code = fsUtil.read(join(cwd, 'index.ts'))
  cache.write(code, 'code')
  const ast = parser.parse(code, {
    plugins: ['typescript'],
  })
  cache.write(ast, 'ast')
}
