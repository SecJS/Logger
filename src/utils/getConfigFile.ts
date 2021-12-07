import { Env } from '@secjs/env'
import { File, Path } from '@secjs/utils'

export function getConfigFile() {
  const extension = Env('NODE_TS', '') === 'true' ? 'ts' : 'js'

  return require(new File(Path.config(`logging.${extension}`)).path).default
}
