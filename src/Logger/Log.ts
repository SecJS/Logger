import { LogMapper } from './LogMapper'
import { defaultMapper } from './defaultMapper'

let mapper = defaultMapper

export function Log(
  message: any,
  formatterOpts: any = {},
  transporterOpts: any = {},
): void {
  formatterOpts.context = 'Log'

  mapper.resolve(message, formatterOpts, transporterOpts)
}

export function changeLogFnMapper(m: LogMapper) {
  mapper = m
}
