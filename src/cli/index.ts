#!/usr/bin/env node
import interpret from 'interpret'
import v8flags from 'v8flags'
import Liftoff from 'liftoff'
import minimist from 'minimist'
import fsUtil from 'ginlibs-file-util'
import { resolve } from 'path'
import { getTsAst } from '../index'

const processArgv = process.argv.slice(2)
const argv = minimist(processArgv)

const cli = new Liftoff({
  name: 'ginlibs-seibasi',
  extensions: interpret.jsVariants,
  configName: '.seibasi',
  v8flags,
})

const getConfig = (liftEnv) => {
  const configPath = liftEnv.configPath
  if (!configPath) {
    return {}
  }
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const config = require(configPath)
  return config
}

const onPrepare = function (liftEnv) {
  const params = argv._ || []
  // cache.write(JSON.stringify(argv, undefined, 2))
  const config = getConfig(liftEnv)

  globalThis._cliArgv = argv
  globalThis._cliLiftEnv = liftEnv
  globalThis._cliConfig = config

  if (argv.v || argv.version) {
    try {
      const pkg = JSON.parse(fsUtil.read(resolve(__dirname, '../package.json')))
      console.log(pkg.version)
    } catch (e) {}
  }

  const fn: any = getTsAst

  cli.execute(liftEnv, () => {
    return fn()
  })
}

cli.prepare({}, onPrepare)
