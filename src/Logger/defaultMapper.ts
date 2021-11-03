import { LogMapper } from './LogMapper'
import { ContextFormatter } from '../Formatters/ContextFormatter'
import { ConsoleTransporter } from '../Transporters/ConsoleTransporter'

export let defaultMapper = new LogMapper(
  [new ContextFormatter()],
  [new ConsoleTransporter()],
)

export function changeDefaultMapper(m: LogMapper) {
  defaultMapper = m
}
