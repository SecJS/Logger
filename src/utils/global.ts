import { Log } from '../Logger/Log'
import { Logger } from '../Logger/Logger'
import { LogMapper } from '../Logger/LogMapper'
import { DebugFormatter } from '../Formatters/DebugFormatter'
import { DebugTransporter } from '../Transporters/DebugTransporter'

export {}

declare global {
  function Log(message: any, formatterOpts?: any, transporterOpts?: any): void
  function Debug(message: any, formatterOpts?: any, transporterOpts?: any): void
}

const _global = global as any

_global.Log = Log
_global.Debug = new Logger().debug.bind({
  context: 'Debugger',
  mapper: new LogMapper([new DebugFormatter()], [new DebugTransporter()]),
})
