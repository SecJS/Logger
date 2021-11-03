import { Log } from '../Logger/Log'
import { Logger } from '../Logger/Logger'
import { LogMapper } from '../Logger/LogMapper'
import { DebugFormatter } from '../Formatters/DebugFormatter'
import { DebugTransporter } from '../Transporters/DebugTransporter'

export {}

declare global {
  function Debug(message: any, namespace?: string, context?: string): void
  function Log(message: any, formatterOpts?: any, transporterOpts?: any): void
}

const _global = global as any
const debug = new Logger().debug.bind({
  context: 'Debugger',
  mapper: new LogMapper([new DebugFormatter()], [new DebugTransporter()]),
})

_global.Log = Log
_global.Debug = (
  message: any,
  namespace = 'api:main',
  context = 'Debug',
): void => {
  debug(message, { context }, { namespace })
}
