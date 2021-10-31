import { LogMapper } from './LogMapper'
import { ContextFormatter } from '../Formatters/ContextFormatter'
import { ConsoleTransporter } from '../Transporters/ConsoleTransporter'

let mapper = new LogMapper(
  [new ContextFormatter('Log')],
  [new ConsoleTransporter('stdout')],
)

export function Log(
  message: any,
  formatterOpts?: any,
  transporterOpts?: any,
): void {
  mapper.resolve(message, formatterOpts, transporterOpts)
}

export function changeLogFnMapper(m: LogMapper) {
  mapper = m
}
