export {}

declare global {
   Debug(message: any, namespace?: string, context?: string): void
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
