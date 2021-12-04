import { debug } from 'debug'
import { DriverContract } from '../Contracts/DriverContract'

export interface DebugDriverOpts {
  namespace: string
}

export class DebugDriver implements DriverContract {
  transport(message: string, options?: DebugDriverOpts): void {
    options = Object.assign({}, { namespace: 'api:main' }, options)

    debug(options.namespace)(message)
  }
}
