import { Log as LogInstance } from '../Log'

export {}

declare global {
  const Log: LogInstance
}

const _global = global as any

_global.Log = LogInstance
